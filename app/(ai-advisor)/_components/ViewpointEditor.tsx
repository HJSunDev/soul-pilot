'use client'

import { type Viewpoint } from './AdvisorView'
import { FullScreenPortal } from '@/components/ui/full-screen-portal'
import { Tiptap } from '@/components/ui/tiptap'

interface ViewpointEditorProps {
  viewpoint: Viewpoint
  isOpen: boolean
  onClose: () => void
  onChange: (value: string) => void
}

export const ViewpointEditor = ({
  viewpoint,
  isOpen,
  onClose,
  onChange,
}: ViewpointEditorProps) => {
  return (
    <FullScreenPortal 
      isOpen={isOpen} 
      onClose={onClose}
    >
      <div className="h-[600px] p-8 flex flex-col">
        {/* 头部 */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              {viewpoint.title}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {viewpoint.description}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* 编辑区 */}
        <div className="flex-1 mt-6">
          <Tiptap 
            content={viewpoint.content}
            onChange={onChange}
            placeholder={`请详细描述你的${viewpoint.title}...`}
            className="h-full"
          />
        </div>
      </div>
    </FullScreenPortal>
  )
} 