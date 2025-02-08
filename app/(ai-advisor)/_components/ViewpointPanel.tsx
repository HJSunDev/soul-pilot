'use client';

import { useState } from 'react';
import type { Viewpoint } from './AdvisorView';

// ViewpointPanel组件的属性接口
export interface ViewpointPanelProps {
  viewpoint: Viewpoint;         // 三观数据
  onChange: (value: string) => void;  // 内容变更处理函数
  onFocus?: () => void;         // 获得焦点时的回调
  onBlur?: () => void;          // 失去焦点时的回调
  isActive?: boolean;           // 是否处于激活状态
}

// ViewpointPanel组件:用于展示和编辑单个三观内容
export const ViewpointPanel = ({ 
  viewpoint, 
  onChange,
  onFocus,
  onBlur,
  isActive 
}: ViewpointPanelProps) => {
  // 控制面板展开/收起状态
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className={`
        bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6
        transition-all duration-300
        ${isActive ? 'ring-2 ring-indigo-500/50 shadow-indigo-100' : ''}
      `}
    >
      {/* 标题栏区域 */}
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-lg font-semibold text-gray-900">
          {viewpoint.title}
        </h3>
        {/* 展开/收起按钮 */}
        <button
          className={`
            w-6 h-6 flex items-center justify-center rounded-full
            text-gray-400 hover:text-gray-600
            transition-transform duration-300
            ${isExpanded ? 'rotate-180' : ''}
          `}
        >
          <svg 
            className="w-4 h-4" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 9l-7 7-7-7" 
            />
          </svg>
        </button>
      </div>
      {/* 描述文本 */}
      <p className="text-sm text-gray-600 mt-2">
        {viewpoint.description}
      </p>
      {/* 可展开的文本输入区域 */}
      <div className={`
        overflow-hidden transition-all duration-300
        ${isExpanded ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'}
      `}>
        <textarea
          value={viewpoint.content}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder="请输入你的想法..."
          className="w-full h-32 p-3 text-sm text-gray-700 bg-white/50 
            border border-gray-200 rounded-lg resize-none
            transition-all duration-200 ease-in-out
            placeholder:text-gray-400
            hover:border-gray-300
            focus:border-indigo-300 
            focus:ring-2 focus:ring-indigo-200/50 
            focus:bg-white
            focus:shadow-[0_2px_12px_rgba(99,102,241,0.12)]"
        />
      </div>
    </div>
  );
}; 