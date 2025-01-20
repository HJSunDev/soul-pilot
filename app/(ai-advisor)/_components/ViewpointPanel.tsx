'use client';

import { useState } from 'react';
import type { Viewpoint } from './AdvisorView';

interface ViewpointPanelProps {
  viewpoint: Viewpoint;
  onChange: (value: string) => void;
}

export const ViewpointPanel = ({ viewpoint, onChange }: ViewpointPanelProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative group">
      <div 
        className={`
          bg-white rounded-2xl shadow-lg ring-1 ring-gray-900/5 p-6 transition-all duration-300
          ${isExpanded ? 'scale-[1.02] shadow-xl' : 'hover:scale-[1.01] hover:shadow-lg'}
        `}
      >
        {/* 标题和描述 */}
        <div 
          className="cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              {viewpoint.title}
            </h3>
            <button
              className={`
                w-6 h-6 flex items-center justify-center rounded-full
                text-gray-400 hover:text-gray-600 transition-transform duration-300
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
          <p className="mt-2 text-sm text-gray-500">
            {viewpoint.description}
          </p>
        </div>

        {/* 输入区域 */}
        <div 
          className={`
            mt-4 overflow-hidden transition-all duration-300
            ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
          `}
        >
          <textarea
            className="w-full h-32 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
            placeholder={`请输入你的${viewpoint.title}...`}
            value={viewpoint.content}
            onChange={(e) => onChange(e.target.value)}
          />
          <div className="mt-2 text-xs text-gray-400 text-right">
            {viewpoint.content.length}/500 字
          </div>
        </div>
      </div>

      {/* 装饰效果 */}
      <div className="absolute -inset-px bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10" />
    </div>
  );
}; 