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
    // 主容器：采用渐变背景和精致的阴影效果
    <div className="bg-linear-to-br from-white to-gray-50/80 rounded-2xl 
      shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] ring-1 ring-gray-900/5 
      p-6 h-[23rem] flex flex-col">
      {/* 标题区域：添加优雅的装饰元素 */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-1.5 h-6 bg-linear-to-b from-indigo-500 to-purple-500 rounded-full"/>
        <h3 className="text-xl font-semibold bg-linear-to-r from-gray-800 to-gray-600 
          bg-clip-text text-transparent">
          描述你的场景
        </h3>
      </div>

      {/* 表单区域：优化间距和布局 */}
      <form onSubmit={handleSubmit} className="flex flex-col flex-1 space-y-4">
        {/* 文本框容器：增加高度和优化视觉效果 */}
        <div className="flex-1">
          <textarea
            className="w-full h-full p-4 text-[15px] leading-relaxed text-gray-700 
              bg-white/70 backdrop-blur-xs
              border border-gray-200/80 rounded-xl
              transition-all duration-300 ease-out
              placeholder:text-gray-400/90
              hover:border-gray-300/80 hover:bg-white/90
              focus:border-indigo-300/80 
              focus:ring-[3px] focus:ring-indigo-200/30 
              focus:bg-white
              focus:shadow-[0_2px_20px_rgba(99,102,241,0.15)]"
            placeholder="请详细描述你当前遇到的情况或困扰..."
            value={scenario}
            onChange={(e) => setScenario(e.target.value)}
          />
        </div>

        {/* 辅助信息和按钮区域：优化布局和视觉层次 */}
        <div className="flex flex-col space-y-3">
          {/* 辅助信息行：改进文字样式和布局 */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500/90 font-medium">
              详细描述将帮助 AI 更好地理解你的处境
            </span>
            <span className="text-xs px-2 py-1 rounded-md bg-gray-100/80 text-gray-500">
              {scenario.length}/1000
            </span>
          </div>

          {/* 提交按钮：优化按钮设计 */}
          <button
            type="submit"
            disabled={!scenario.trim()}
            className={`
              h-11 w-full rounded-xl font-medium text-[15px]
              transition-all duration-300 transform
              ${scenario.trim() 
                ? 'bg-linear-to-r from-indigo-500 to-purple-500 text-white ' +
                  'hover:shadow-lg hover:shadow-indigo-500/25 hover:scale-[1.02] ' +
                  'active:scale-[0.98]'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            <span className="relative z-10 flex items-center justify-center space-x-2">
              <span>获取 AI 建议</span>
              {scenario.trim() && (
                <svg 
                  className="w-4 h-4 transition-transform group-hover:translate-x-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M13 7l5 5m0 0l-5 5m5-5H6" 
                  />
                </svg>
              )}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}; 