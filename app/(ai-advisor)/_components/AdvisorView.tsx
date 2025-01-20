'use client';

import { useState } from 'react';
import { ViewpointPanel } from './ViewpointPanel';
import { ScenarioInput } from './ScenarioInput';
import { AdviceDisplay } from './AdviceDisplay';

export interface Viewpoint {
  title: string;
  description: string;
  content: string;
}

export const AdvisorView = () => {
  const [worldview, setWorldview] = useState<string>('');
  const [lifeview, setLifeview] = useState<string>('');
  const [values, setValues] = useState<string>('');
  const [scenario, setScenario] = useState<string>('');
  const [advice, setAdvice] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

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

  const handleScenarioSubmit = async (scenario: string) => {
    setScenario(scenario);
    setIsLoading(true);
    
    // TODO: 调用 AI API 获取建议
    // 这里模拟 API 调用
    setTimeout(() => {
      setAdvice('基于您的输入，我的建议是...');
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="space-y-8">
      {/* 三观输入区域 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {viewpoints.map((viewpoint) => (
          <ViewpointPanel
            key={viewpoint.title}
            viewpoint={viewpoint}
            onChange={(value) => handleViewpointChange(viewpoint.title, value)}
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