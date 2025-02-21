'use client';

import { useState, useEffect } from 'react';
import { ViewpointPanel } from './ViewpointPanel';
import { ScenarioInput } from './ScenarioInput';
import { AdviceDisplay } from './AdviceDisplay';
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

// 定义三观数据结构接口
export interface Viewpoint {
  title: string;      // 三观类型标题
  description: string; // 引导性描述
  content: string;    // 用户输入的内容
}

export const AdvisorView = () => {
  // 从 Convex 获取用户的三观信息
  const worldviews = useQuery(api.advisor.queries.getUserWorldviews);

  // 用户输入的三观内容状态
  const [worldview, setWorldview] = useState<string>('');
  const [lifeview, setLifeview] = useState<string>('');
  const [values, setValues] = useState<string>('');
  // 用户输入的场景和AI建议状态
  const [scenario, setScenario] = useState<string>('');
  const [advice, setAdvice] = useState<string>('');
  // 加载状态
  const [isLoading, setIsLoading] = useState(false);

  // 当从服务器获取到三观数据时，更新状态
  useEffect(() => {
    if (worldviews) {
      setWorldview(worldviews.worldview || '');
      setLifeview(worldviews.lifePhilosophy || '');
      setValues(worldviews.values || '');
    }
  }, [worldviews]);

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
  };

  // 处理场景提交,获取AI建议
  const handleScenarioSubmit = async (scenario: string) => {
    if (!worldview && !lifeview && !values) {
      // TODO: 添加提示，建议用户先填写三观信息
      return;
    }

    setScenario(scenario);
    setIsLoading(true);
    
    try {
      // TODO: 调用 AI API 获取建议
      // 这里模拟 API 调用
      setTimeout(() => {
        setAdvice('基于您的输入，我的建议是...');
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.error('获取AI建议失败:', error);
      setIsLoading(false);
      // TODO: 添加错误提示
    }
  };

  return (
    <div className="space-y-8">
      {/* 三观输入区域 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {viewpoints.map((viewpoint) => (
          <ViewpointPanel
            key={viewpoint.title}
            viewpoint={viewpoint}
            onChange={(value) => handleViewpointChange(viewpoint.title, value)}
            isLoading={worldviews === undefined}
          />
        ))}
      </div>

      {/* 场景输入和建议显示 */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ScenarioInput onSubmit={handleScenarioSubmit} />
        <AdviceDisplay 
          advice={advice} 
          isLoading={isLoading}
          worldview={worldview}
          lifeview={lifeview}
          values={values}
          scenario={scenario}
        />
      </div>
    </div>
  );
}; 