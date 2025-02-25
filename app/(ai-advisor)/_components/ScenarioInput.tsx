'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

// 定义组件的属性接口
interface ScenarioInputProps {
  onSubmit: (scenario: string) => void;  // 场景提交处理函数
}


// ScenarioInput组件:用于用户输入场景描述并提交
export const ScenarioInput = ({ onSubmit }: ScenarioInputProps) => {
  // 场景内容状态管理
  const [scenario, setScenario] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // 处理表单提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (scenario.trim()) {
      onSubmit(scenario);
    }
  };

  return (
    // 主容器：设计成画板风格
    <div className="bg-gradient-to-br from-white/95 to-indigo-50/30 backdrop-blur-sm rounded-xl 
      border border-indigo-100/30 
      transition-all duration-300
      hover:shadow-lg hover:shadow-indigo-500/10
      p-6 h-[23rem] flex flex-col
      relative overflow-hidden">
      
      {/* 引导语：优雅的提示文字 */}
      <div className="mb-3">
        <p className="text-lg text-gray-700/90 font-serif italic">
          在这里描绘你的故事，让思绪流淌...
        </p>
      </div>

      {/* 表单区域：融入背景的设计 */}
      <form onSubmit={handleSubmit} className="flex flex-col flex-1 space-y-4">
        {/* 文本输入区：设计成画布风格 */}
        <div 
          className={`flex-1 relative rounded-lg overflow-hidden
            transition-all duration-500
            ${isFocused ? 'shadow-[0_0_25px_rgba(99,102,241,0.15)]' : 'shadow-inner'}
          `}
        >
          {/* 背景装饰 */}
          <div className="absolute inset-0 bg-white/40 backdrop-blur-sm"></div>
          
          {/* 输入框 */}
          <textarea
            className="relative w-full h-full p-5 text-[15px] leading-relaxed text-gray-700 
              bg-transparent
              border-none
              transition-all duration-300
              placeholder:text-gray-400/80 
              focus:outline-none focus:ring-0
              resize-none z-10"
            placeholder="你可以分享你最近遇到的困惑、挑战..."
            value={scenario}
            onChange={(e) => setScenario(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          
          {/* 字数统计：设计成标签风格 */}
          <div className="absolute bottom-3 right-3 z-10">
            <div className={`
              px-2 py-1 rounded-full text-xs
              transition-all duration-300
              ${scenario.length > 0 
                ? 'bg-indigo-100/80 text-indigo-600' 
                : 'bg-gray-100/80 text-gray-500'}
            `}>
              {scenario.length}/1000
            </div>
          </div>
        </div>

        {/* 提交区域：优雅的设计 */}
        <div className="flex items-center justify-between">
          {/* 辅助提示 */}
          <p className="text-sm text-gray-500/90">
            细节越丰富，回应越贴切
          </p>
          
          {/* 发送按钮：设计成优雅的图标按钮 */}
          <motion.button
            type="submit"
            disabled={!scenario.trim()}
            whileHover={scenario.trim() ? { scale: 1.05 } : {}}
            whileTap={scenario.trim() ? { scale: 0.95 } : {}}
            className={`
              w-12 h-12 rounded-full flex items-center justify-center
              transition-all duration-300
              ${scenario.trim() 
                ? 'bg-gradient-to-br from-indigo-500 to-purple-500 text-white ' +
                  'shadow-md hover:shadow-lg hover:shadow-indigo-500/20'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'}
            `}
          >
            <svg 
              className="w-5 h-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M14 5l7 7m0 0l-7 7m7-7H3" 
              />
            </svg>
          </motion.button>
        </div>
      </form>
    </div>
  );
}; 