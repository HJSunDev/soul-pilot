'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { ViewpointPanel } from './ViewpointPanel';
import { ScenarioInput } from './ScenarioInput';
import { AdviceDisplay } from './AdviceDisplay';
import { useQuery, useMutation, useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { debounce } from 'lodash';
// import { toast } from "sonner";
import { Bot, Sparkles, BrainCircuit } from 'lucide-react';

// 定义编辑状态类型
export type EditStatus = 'editing' | 'saving' | 'saved' | 'error';

// 定义三观数据结构接口
export interface Viewpoint {
  title: string;      // 三观类型标题
  description: string; // 引导性描述
  content: string;    // 用户输入的内容
}

// 定义三观分析结果接口
interface ViewpointAnalysisResult {
  type: '世界观' | '人生观' | '价值观';
  percentage: number;
  explanation: string;
}

// 获取字段名映射
const getFieldName = (type: string): string => {
  switch (type) {
    case '世界观':
      return 'worldview';
    case '人生观':
      return 'lifePhilosophy';
    case '价值观':
      return 'values';
    default:
      return '';
  }
};

export const AdvisorView = () => {
  // 从 Convex 获取用户的三观信息
  const worldviews = useQuery(api.advisor.queries.getUserWorldviews);
  // 获取更新三观的 mutation
  const updateWorldview = useMutation(api.advisor.mutations.updateWorldviews);

  // 获取 AI 建议的 action
  const getAIAdvice = useAction(api.advisor.services.getAdvice);

  // 用户输入的三观内容状态
  const [worldview, setWorldview] = useState<string>('');
  const [lifeview, setLifeview] = useState<string>('');
  const [values, setValues] = useState<string>('');
  // 用户输入的场景和AI建议状态
  const [scenario, setScenario] = useState<string>('');
  const [advice, setAdvice] = useState<string>('');
  // 获取AI建议中-加载状态
  const [isLoading, setIsLoading] = useState(false);
  // 三观模块-编辑状态
  const [editStatus, setEditStatus] = useState<Record<string, EditStatus>>({});
  // 机器人助手对话框状态
  const [showBotHelper, setShowBotHelper] = useState(false);
  
  // 三观分辨助手状态
  const [viewpointInput, setViewpointInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<ViewpointAnalysisResult[] | null>(null);
  const viewpointInputRef = useRef<HTMLTextAreaElement>(null);

  // 当从服务器获取到三观数据时，更新状态
  useEffect(() => {
    if (worldviews) {
      setWorldview(worldviews.worldview || '');
      setLifeview(worldviews.lifePhilosophy || '');
      setValues(worldviews.values || '');
    }
  }, [worldviews]);

  // 防抖保存函数
  const debouncedSave = useCallback(
    debounce(async (type: string, value: string) => {
      try {
        const fieldName = getFieldName(type);
        if (!fieldName) return;

        setEditStatus(prev => ({ ...prev, [type]: 'saving' }));
        
        await updateWorldview({
          [fieldName]: value
        });

        // 设置保存成功状态
        setEditStatus(prev => ({ ...prev, [type]: 'saved' }));
        
        // 2秒后清除状态
        setTimeout(() => {
          setEditStatus(prev => {
            const newStatus = { ...prev };
            delete newStatus[type];
            return newStatus;
          });
        }, 2000);

      } catch (error) {
        console.error('保存失败:', error);
        // 设置错误状态
        setEditStatus(prev => ({ ...prev, [type]: 'error' }));
        
        // 回滚状态
        if (worldviews) {
          switch (type) {
            case '世界观':
              setWorldview(worldviews.worldview || '');
              break;
            case '人生观':
              setLifeview(worldviews.lifePhilosophy || '');
              break;
            case '价值观':
              setValues(worldviews.values || '');
              break;
          }
        }
      }
    }, 1000),
    [updateWorldview, worldviews]
  );

  // 三观配置数据
  const viewpoints: Viewpoint[] = [
    {
      title: '世界观',
      description: '你如何看待这个世界的运行规律和本质？',
      content: worldview,
    },
    {
      title: '人生观', 
      description: '你认为人生的意义和目标是什么？',
      content: lifeview,
    },
    {
      title: '价值观',
      description: '你最看重什么？什么对你来说最重要？',
      content: values,
    },
  ];

  // 处理三观内容变更
  const handleViewpointChange = (type: string, value: string) => {
    // 设置编辑中状态
    setEditStatus(prev => ({ ...prev, [type]: 'editing' }));

    // 乐观更新本地状态
    switch (type) {
      case '世界观':
        setWorldview(value);
        break;
      case '人生观':
        setLifeview(value);
        break;
      case '价值观':
        setValues(value);
        break;
    }

    // 触发防抖保存
    debouncedSave(type, value);
  };

  // 处理场景提交,获取AI建议
  const handleScenarioSubmit = async (scenario: string) => {
    if (!worldview && !lifeview && !values) {
      // toast.error('请先填写您的三观信息');
      return;
    }

    setScenario(scenario);
    setIsLoading(true);
    setAdvice('');  // 清空之前的建议
    
    try {
      // 调用 AI 服务获取建议
      const response = await getAIAdvice({
        worldviews: {
          worldview,
          lifePhilosophy: lifeview,
          values,
        },
        scenario,
      });

      console.log('AI服务返回内容:', response);

      // 检查响应状态
      if (response.status === 'success') {
        // 将结构化的建议内容传递给 AdviceDisplay 组件
        setAdvice(JSON.stringify(response.content));
      } else {
        console.error('AI服务返回错误:', response.error);
        // 设置错误信息作为建议内容
        setAdvice(JSON.stringify({
          analysis: { points: [] },
          actions: { points: [] },
          fullContent: `获取建议失败：${response.error || '未知错误'}`
        }));
        // toast.error('获取建议失败，请重试');
      }
    } catch (error) {
      console.error('获取AI建议失败:', error);
      // 设置错误信息作为建议内容
      setAdvice(JSON.stringify({
        analysis: { points: [] },
        actions: { points: [] },
        fullContent: `获取建议失败：${error instanceof Error ? error.message : '未知错误'}`
      }));
      // toast.error('获取建议失败，请重试');
    } finally {
      setIsLoading(false);
    }
  };

  // 切换机器人助手对话框显示状态
  const toggleBotHelper = () => {
    setShowBotHelper(prev => !prev);
    // 重置分析结果
    if (!showBotHelper) {
      setAnalysisResults(null);
      setViewpointInput('');
      // 聚焦输入框
      setTimeout(() => {
        viewpointInputRef.current?.focus();
      }, 100);
    }
  };
  
  // 处理三观分析提交
  const handleViewpointAnalysis = async () => {
    if (!viewpointInput.trim()) return;
    
    setIsAnalyzing(true);
    
    try {
      // 模拟 AI 分析过程
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 这里应该调用实际的 AI 服务进行分析
      // 目前使用模拟数据
      const mockResults: ViewpointAnalysisResult[] = [
        {
          type: '世界观',
          percentage: Math.floor(Math.random() * 60) + 40, // 40-100%
          explanation: '这个想法主要反映了您对世界本质和规律的理解。'
        },
        {
          type: '人生观',
          percentage: Math.floor(Math.random() * 30) + 5, // 5-35%
          explanation: '略微涉及到您对人生意义的思考。'
        }
      ];
      
      // 按百分比排序
      mockResults.sort((a, b) => b.percentage - a.percentage);
      
      setAnalysisResults(mockResults);
    } catch (error) {
      console.error('分析失败:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* 三观输入区域 */}
      <div className="relative">
        {/* 机器人助手图标 - 位于整体左上角且有倾斜角度 */}
        <div 
          onClick={toggleBotHelper}
          className="absolute -top-3 -left-3 z-10 cursor-pointer group"
        >
          <div className="bg-white p-2 rounded-full shadow-md hover:shadow-lg border border-indigo-100 transition-all duration-300 hover:scale-110">
            <div className="animate-bounce-subtle">
              <Bot 
                size={24} 
                className="text-indigo-500 group-hover:text-indigo-600 transition-colors" 
              />
            </div>
          </div>
          
          {/* 悬浮提示 - 使用绝对定位确保正确显示 */}
          <div className="absolute left-0 top-0 -mt-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20">
            <div className="bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap shadow-lg">
              <div className="flex items-center gap-1.5">
                <BrainCircuit size={12} className="text-indigo-300" />
                <span>让我来帮你分辨三观</span>
              </div>
            </div>
            <div className="w-2 h-2 bg-gray-800 transform rotate-45 absolute -bottom-1 left-3"></div>
          </div>
        </div>
        
        {/* 轻量级背景容器 - 为三观模块提供统一的背景 */}
        <div className="bg-white/30 rounded-lg p-1 border border-indigo-50/30 overflow-hidden">
          {/* 三观面板网格 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {viewpoints.map((viewpoint) => (
              <ViewpointPanel
                key={viewpoint.title}
                viewpoint={viewpoint}
                onChange={(value) => handleViewpointChange(viewpoint.title, value)}
                isLoading={worldviews === undefined}
                editStatus={editStatus[viewpoint.title]}
              />
            ))}
          </div>
        </div>

        {/* 机器人助手对话框 */}
        {showBotHelper && (
          <div className="absolute -top-2 left-8 bg-white rounded-lg shadow-lg border border-gray-200/60 z-20 w-72 animate-fadeIn overflow-hidden">
            {/* 连接线 */}
            <div className="absolute -left-2 top-3 w-2 h-2 bg-white transform rotate-45 border-l border-b border-gray-200/60"></div>
            
            {/* 标题栏 */}
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="text-indigo-500 opacity-90">
                  <BrainCircuit size={16} />
                </div>
                <h3 className="text-sm font-medium text-gray-700">三观分辨助手</h3>
              </div>
              <button 
                onClick={toggleBotHelper}
                className="text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100 p-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            {/* 内容区域 */}
            <div className="p-4">
              {/* 输入区域 */}
              <div className="relative mb-4">
                <textarea 
                  ref={viewpointInputRef}
                  value={viewpointInput}
                  onChange={(e) => setViewpointInput(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg p-3 pr-10 text-gray-700 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400 transition-all resize-none shadow-sm"
                  placeholder="输入您想分析的观念或想法..."
                  rows={3}
                  disabled={isAnalyzing}
                ></textarea>
                <button 
                  onClick={handleViewpointAnalysis}
                  disabled={isAnalyzing || !viewpointInput.trim()}
                  className={`absolute right-3 bottom-3 p-1.5 rounded-full transition-all ${
                    isAnalyzing || !viewpointInput.trim() 
                      ? 'text-gray-300 cursor-not-allowed' 
                      : 'text-indigo-500 hover:text-indigo-600 hover:bg-indigo-50 cursor-pointer'
                  }`}
                >
                  {isAnalyzing ? (
                    <div className="w-4 h-4 border-2 border-gray-200 border-t-indigo-500 rounded-full animate-spin"></div>
                  ) : (
                    <Sparkles size={16} />
                  )}
                </button>
              </div>
              
              {/* 结果显示区域 - 有结果时显示 */}
              {analysisResults && analysisResults.length > 0 && (
                <div className="bg-gray-50/70 rounded-lg p-3 animate-fadeIn">
                  <h4 className="text-xs font-medium text-gray-700 mb-2.5 flex items-center gap-1.5">
                    <div className="text-indigo-500 opacity-80">
                      <BrainCircuit size={12} />
                    </div>
                    分析结果
                  </h4>
                  <div className="space-y-2.5">
                    {/* 结果项 - 动态生成 */}
                    {analysisResults.map((result, index) => (
                      <div 
                        key={result.type}
                        className={`bg-white rounded-md p-2.5 shadow-sm ${
                          index > 0 ? `opacity-${Math.max(60, 100 - index * 15)}` : ''
                        }`}
                      >
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <div className={`w-2 h-2 rounded-full ${
                            result.type === '世界观' ? 'bg-indigo-400' : 
                            result.type === '人生观' ? 'bg-purple-400' : 'bg-amber-400'
                          }`}></div>
                          <span className="text-xs font-medium text-gray-700">{result.type}</span>
                          <div className="flex-1 mx-1.5 h-1 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${
                                result.type === '世界观' ? 'bg-indigo-400' : 
                                result.type === '人生观' ? 'bg-purple-400' : 'bg-amber-400'
                              }`}
                              style={{ width: `${result.percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-[10px] text-gray-500 font-medium">{result.percentage}%</span>
                        </div>
                        <p className="text-[10px] text-gray-600 pl-3.5">
                          {result.explanation}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 场景输入和建议显示 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ScenarioInput onSubmit={handleScenarioSubmit} />
        <AdviceDisplay 
          advice={advice} 
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}; 