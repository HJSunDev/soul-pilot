'use client'

import { type Viewpoint, type EditStatus } from './AdvisorView'
import { FullScreenPortal } from '@/components/ui/full-screen-portal'
import { Tiptap } from '@/components/ui/tiptap'

interface ViewpointEditorProps {
  viewpoint: Viewpoint
  isOpen: boolean
  onClose: () => void
  onChange: (value: string) => void
  editStatus?: EditStatus
}

export const ViewpointEditor = ({
  viewpoint,
  isOpen,
  onClose,
  onChange,
  editStatus = 'editing'
}: ViewpointEditorProps) => {
  return (
    <FullScreenPortal 
      isOpen={isOpen} 
      onClose={onClose}
    >
      <div className="h-[600px] flex flex-col">
        {/* 头部区域 */}
        <div className="px-8 pt-6 border-b border-zinc-100">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold text-zinc-900">
                {viewpoint.title}
              </h2>
            </div>

            {/* 关闭按钮 */}
            <button
              onClick={onClose}
              className="group -m-1.5 p-1.5 hover:bg-zinc-100/80 rounded-md transition-colors"
            >
              <svg
                className="w-5 h-5 text-zinc-400 group-hover:text-zinc-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* 编辑区域 */}
        <div className="flex-1 px-8 py-5 h-[400px]">
          <div className="relative h-full overflow-hidden rounded-xl bg-gradient-to-b from-white to-zinc-50/50 ring-1 ring-zinc-100/80 transition duration-200">
            {/* 编辑器装饰背景 */}
            <div className="absolute inset-0 bg-grid-zinc-200/50 [mask-image:linear-gradient(0deg,transparent,black)]" />
            
            {/* 编辑器容器 */}
            <div className="relative h-full">
              <Tiptap 
                content={viewpoint.content}
                onChange={onChange}
                placeholder={viewpoint.description}
                className="h-full"
                editStatus={editStatus}
              />
            </div>

            {/* 渐变边框效果 */}
            <div className="absolute inset-0 rounded-xl pointer-events-none ring-1 ring-inset ring-zinc-100/50" />
          </div>
        </div>

        {/* 底部提示区 */}
        <div className="px-8 pb-5 pt-1.5">
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <svg className="w-4 h-4 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              使用工具栏格式化文本，或点击
              <kbd className="mx-1 px-1.5 py-0.5 text-[10px] font-medium bg-zinc-100 text-zinc-500 rounded border border-zinc-200/80">
                全屏
              </kbd>
              获得更好的编辑体验
            </span>
          </div>
        </div>
      </div>
    </FullScreenPortal>
  )
} 