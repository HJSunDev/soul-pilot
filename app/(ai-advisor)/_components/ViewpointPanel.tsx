'use client';

import { useState } from 'react';
import type { Viewpoint } from './AdvisorView';
import { ViewpointEditor } from './ViewpointEditor';

// 为不同三观类型定义引导性的空状态文案
const emptyStateText = {
  '世界观': '探索你眼中的世界...',
  '人生观': '思考人生的意义...',
  '价值观': '发现内心的指南针...'
};

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
  const [isEditing, setIsEditing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsEditing(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          relative group h-[5.5rem]
          bg-white/95 backdrop-blur-sm rounded-xl
          border border-zinc-100/80
          transition-all duration-300 cursor-pointer
          hover:bg-white/98 hover:shadow-lg hover:shadow-indigo-500/5
          hover:border-indigo-100
          overflow-hidden
          ${isActive ? 'ring-1 ring-indigo-500/30' : ''}
        `}
      >
        <div className="p-4 h-full flex flex-col">
          {/* 标题和描述区域 */}
          <div className="flex justify-between items-start">
            <div>
              {/* 三观名称 - 最大视觉权重 */}
              <h3 className="text-base font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">
                {viewpoint.title}
              </h3>
              {/* 描述信息 - 次要信息 */}
              <p className="text-[0.8125rem] text-gray-400 mt-0.5 leading-relaxed">
                {viewpoint.description}
              </p>
            </div>

            {/* 无内容状态下的编辑图标 */}
            {!viewpoint.content && (
              <div className="relative -mt-0.5">
                <svg 
                  className="w-4 h-4 text-gray-300 group-hover:text-indigo-400 
                    transition-all duration-300 group-hover:scale-105" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" 
                  />
                </svg>
              </div>
            )}
          </div>

          {/* 内容状态指示器 */}
          {viewpoint.content && (
            <div className="absolute right-4 bottom-4 flex items-center gap-[2px]">
              <span className="w-[3px] h-[3px] rounded-full bg-gray-300" />
              <span className="w-[3px] h-[3px] rounded-full bg-gray-300" />
              <span className="w-[3px] h-[3px] rounded-full bg-gray-300" />
            </div>
          )}
        </div>

        {/* 悬浮渐变效果 */}
        <div className={`
          absolute inset-0
          bg-gradient-to-br from-indigo-50/30 via-transparent to-purple-50/30
          opacity-0 group-hover:opacity-100
          transition-opacity duration-500
          pointer-events-none
        `} />
      </div>

      <ViewpointEditor
        viewpoint={viewpoint}
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        onChange={onChange}
      />
    </>
  );
}; 