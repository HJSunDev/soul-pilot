'use client';

import { useState, useEffect, useCallback } from 'react';
import { ViewpointPanel } from './ViewpointPanel';
import { ScenarioInput } from './ScenarioInput';
import { AdviceDisplay } from './AdviceDisplay';
import { useQuery, useMutation, useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { debounce } from 'lodash';
// import { toast } from "sonner";

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

  return (
    <div className="space-y-4">
      {/* 三观输入区域 */}
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