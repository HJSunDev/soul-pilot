'use client';

import { useState } from 'react';

// 定义组件的属性接口
interface ScenarioInputProps {
  onSubmit: (scenario: string) => void;  // 场景提交处理函数
}

// ScenarioInput组件:用于用户输入场景描述并提交
export const ScenarioInput = ({ onSubmit }: ScenarioInputProps) => {
  // 场景内容状态管理
  const [scenario, setScenario] = useState('');

  // 处理表单提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (scenario.trim()) {
      onSubmit(scenario);
    }
  };

  return (
    // 主容器
    <div className="bg-white rounded-2xl shadow-lg ring-1 ring-gray-900/5 p-6">
      {/* 标题 */}
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        描述你的场景
      </h3>
      {/* 表单区域 */}
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {/* 场景输入文本框 */}
          <textarea
            className="w-full h-48 p-4 text-sm text-gray-700 bg-white/50 
              border border-gray-200 rounded-lg resize-none
              transition-all duration-200 ease-in-out
              placeholder:text-gray-400
              hover:border-gray-300
              focus:border-indigo-300 
              focus:ring-2 focus:ring-indigo-200/50 
              focus:bg-white
              focus:shadow-[0_2px_12px_rgba(99,102,241,0.12)]"
            placeholder="请详细描述你当前遇到的情况或困扰..."
            value={scenario}
            onChange={(e) => setScenario(e.target.value)}
          />
          {/* 辅助信息区域 */}
          <div className="flex items-center justify-between">
            {/* 提示文本 */}
            <div className="text-sm text-gray-500">
              尽可能详细地描述，这将帮助 AI 更好地理解你的处境
            </div>
            {/* 字数统计 */}
            <div className="text-xs text-gray-400">
              {scenario.length}/1000 字
            </div>
          </div>
          {/* 提交按钮 */}
          <button
            type="submit"
            disabled={!scenario.trim()}
            className={`
              w-full py-3 px-4 rounded-lg text-white font-medium
              transition-all duration-300 relative overflow-hidden
              ${scenario.trim() 
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:shadow-lg hover:shadow-indigo-500/30' 
                : 'bg-gray-300 cursor-not-allowed'
              }
            `}
          >
            {/* 按钮文本 */}
            <span className="relative z-10">获取 AI 建议</span>
            {/* 按钮悬停效果 */}
            {scenario.trim() && (
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-700 opacity-0 hover:opacity-100 transition-opacity duration-300" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}; 