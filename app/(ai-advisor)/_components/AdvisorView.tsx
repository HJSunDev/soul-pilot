'use client';

import { useState, useEffect, useCallback } from 'react';
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
          <div className="absolute top-full left-0 mt-3 p-4 bg-white rounded-lg shadow-lg border border-indigo-100 z-20 w-full md:w-80 animate-fadeIn">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-1.5">
                <div className="bg-indigo-100 p-1 rounded-full">
                  <Bot size={16} className="text-indigo-600" />
                </div>
                <h3 className="text-base font-medium text-gray-900">三观分辨助手</h3>
              </div>
              <button 
                onClick={toggleBotHelper}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <div className="bg-indigo-50/50 p-2.5 rounded-lg mb-3 border border-indigo-100/50">
              <p className="text-gray-700 text-xs">
                <span className="font-medium">提示：</span> 输入您的观念或想法，我将帮助您分析它属于世界观、人生观还是价值观。
              </p>
            </div>
            
            <div className="relative">
              <textarea 
                className="w-full border border-gray-200 rounded-lg p-2.5 pr-9 text-gray-700 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all resize-none"
                placeholder="输入您想分析的观念或想法..."
                rows={2}
              ></textarea>
              <button className="absolute right-2.5 bottom-2.5 text-indigo-500 hover:text-indigo-600 transition-colors">
                <Sparkles size={16} />
              </button>
            </div>
            
            <div className="mt-2 text-[10px] text-gray-500 flex items-center justify-between">
              <span>目前处于开发阶段...</span>
              <span className="text-indigo-500">由 AI 提供支持</span>
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