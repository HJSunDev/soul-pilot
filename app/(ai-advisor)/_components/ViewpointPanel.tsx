'use client';

import { useState } from 'react';
import type { Viewpoint, EditStatus } from './AdvisorView';
import { ViewpointEditor } from './ViewpointEditor';

// ViewpointPanel组件的属性接口
export interface ViewpointPanelProps {
  viewpoint: Viewpoint;         // 三观数据
  onChange: (value: string) => void;  // 内容变更处理函数
  onFocus?: () => void;         // 获得焦点时的回调
  onBlur?: () => void;          // 失去焦点时的回调
  isActive?: boolean;           // 是否处于激活状态
  isLoading?: boolean;          // 是否处于加载状态
  editStatus?: EditStatus;      // 编辑状态
}

// ViewpointPanel组件:用于展示和编辑单个三观内容
export const ViewpointPanel = ({ 
  viewpoint, 
  onChange,
  isActive,
  isLoading = false,
  editStatus
}: ViewpointPanelProps) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <div
        onClick={() => !isLoading && setIsEditing(true)}
        className={`
          relative group h-[5.5rem]
          bg-white/95 backdrop-blur-sm rounded-xl
          border border-zinc-100/80
          transition-all duration-300 cursor-pointer
          hover:bg-white/98 hover:shadow-lg hover:shadow-indigo-500/5
          hover:border-indigo-100
          overflow-hidden
          ${isActive ? 'ring-1 ring-indigo-500/30' : ''}
          ${isLoading ? 'cursor-wait' : ''}
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

            {/* 加载状态或编辑图标 */}
            <div className="relative -mt-0.5">
              {isLoading ? (
                <svg 
                  className="w-4 h-4 text-indigo-400 animate-spin" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24"
                >
                  <circle 
                    className="opacity-25" 
                    cx="12" 
                    cy="12" 
                    r="10" 
                    stroke="currentColor" 
                    strokeWidth="4"
                  />
                  <path 
                    className="opacity-75" 
                    fill="currentColor" 
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              ) : !viewpoint.content && (
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
              )}
            </div>
          </div>

          {/* 内容状态指示器 */}
          {viewpoint.content && !isLoading && (
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
        editStatus={editStatus}
      />
    </>
  );
}; 