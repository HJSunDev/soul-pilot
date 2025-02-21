'use client'

import { type Editor } from '@tiptap/react'
import { cn } from '@/lib/utils'
import { Expand, Shrink } from 'lucide-react'
import type { EditStatus } from '@/app/(ai-advisor)/_components/AdvisorView'

// 状态配置
const statusConfig = {
  editing: {
    text: '编辑中',
    color: 'text-indigo-600/90',
    bg: 'bg-indigo-50/80'
  },
  saving: {
    text: '保存中',
    color: 'text-amber-600/90',
    bg: 'bg-amber-50/80'
  },
  saved: {
    text: '已保存',
    color: 'text-emerald-600/90',
    bg: 'bg-emerald-50/80'
  },
  error: {
    text: '保存失败',
    color: 'text-rose-600/90',
    bg: 'bg-rose-50/80'
  }
} as const;

interface ToolbarButtonProps {
  onClick: () => void
  isActive?: boolean
  disabled?: boolean
  children: React.ReactNode
  title?: string
  className?: string
}

const ToolbarButton = ({
  onClick,
  isActive,
  disabled,
  children,
  title,
  className
}: ToolbarButtonProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    title={title}
    className={cn(
      'p-1.5 rounded-lg text-sm transition-colors cursor-pointer',
      'hover:bg-zinc-100 active:bg-zinc-200',
      'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent',
      isActive && 'bg-zinc-100 text-indigo-600',
      className
    )}
  >
    {children}
  </button>
)

interface TiptapToolbarProps {
  editor: Editor | null
  isFullscreen?: boolean
  onToggleFullscreen?: () => void
  editStatus?: EditStatus
}

export function TiptapToolbar({ 
  editor, 
  isFullscreen, 
  onToggleFullscreen,
  editStatus = 'editing'
}: TiptapToolbarProps) {
  if (!editor) return null

  const status = statusConfig[editStatus];

  return (
    <div className="border-b border-zinc-200 p-2 flex justify-between items-center">
      <div className="flex flex-wrap gap-1">
        <div className="flex items-center gap-1 mr-2">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            isActive={editor.isActive('heading', { level: 2 })}
            title="二级标题"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h7"/>
            </svg>
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            isActive={editor.isActive('heading', { level: 3 })}
            title="三级标题"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h10M4 18h7"/>
            </svg>
          </ToolbarButton>
        </div>

        <div className="flex items-center gap-1 mr-2">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive('bold')}
            title="加粗"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/>
              <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/>
            </svg>
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive('italic')}
            title="斜体"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="19" y1="4" x2="10" y2="4"/>
              <line x1="14" y1="20" x2="5" y2="20"/>
              <line x1="15" y1="4" x2="9" y2="20"/>
            </svg>
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            isActive={editor.isActive('underline')}
            title="下划线"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"/>
              <line x1="4" y1="21" x2="20" y2="21"/>
            </svg>
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            isActive={editor.isActive('highlight')}
            title="高亮"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
            </svg>
          </ToolbarButton>
        </div>

        <div className="flex items-center gap-1 mr-2">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive('bulletList')}
            title="无序列表"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="9" y1="6" x2="20" y2="6"/>
              <line x1="9" y1="12" x2="20" y2="12"/>
              <line x1="9" y1="18" x2="20" y2="18"/>
              <circle cx="5" cy="6" r="1"/>
              <circle cx="5" cy="12" r="1"/>
              <circle cx="5" cy="18" r="1"/>
            </svg>
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive('orderedList')}
            title="有序列表"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="10" y1="6" x2="20" y2="6"/>
              <line x1="10" y1="12" x2="20" y2="12"/>
              <line x1="10" y1="18" x2="20" y2="18"/>
              <path d="M4 6h1v4"/>
              <path d="M4 10h2"/>
              <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/>
            </svg>
          </ToolbarButton>
        </div>

        <div className="flex items-center gap-1">
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            isActive={editor.isActive({ textAlign: 'left' })}
            title="左对齐"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="15" y2="12"/>
              <line x1="3" y1="18" x2="18" y2="18"/>
            </svg>
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            isActive={editor.isActive({ textAlign: 'center' })}
            title="居中对齐"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="6" y1="12" x2="18" y2="12"/>
              <line x1="4" y1="18" x2="20" y2="18"/>
            </svg>
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            isActive={editor.isActive({ textAlign: 'right' })}
            title="右对齐"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="9" y1="12" x2="21" y2="12"/>
              <line x1="6" y1="18" x2="21" y2="18"/>
            </svg>
          </ToolbarButton>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span 
          className={cn(
            'px-2 py-0.5 text-xs font-medium rounded-full transition-all duration-300',
            status.color,
            status.bg,
            isFullscreen && 'scale-105'
          )}
        >
          {status.text}
        </span>

        <ToolbarButton
          onClick={() => onToggleFullscreen?.()}
          title={isFullscreen ? "退出全屏" : "全屏编辑"}
          className="ml-1"
        >
          {isFullscreen ? (
            <Shrink className="w-4 h-4" />
          ) : (
            <Expand className="w-4 h-4" />
          )}
        </ToolbarButton>
      </div>
    </div>
  )
} 