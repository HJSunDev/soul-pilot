'use client'

import { useState, useCallback, useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import { createPortal } from 'react-dom'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Highlight from '@tiptap/extension-highlight'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Heading from '@tiptap/extension-heading'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import ListItem from '@tiptap/extension-list-item'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import { cn } from "@/lib/utils"
import { TiptapToolbar } from './tiptap-toolbar'

interface TiptapProps {
  content?: string;
  onChange?: (content: string) => void;
  className?: string;
  placeholder?: string;
}

export const Tiptap = ({ 
  content = '', 
  onChange, 
  className,
  placeholder = '开始写作...'
}: TiptapProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [mounted, setMounted] = useState(false)

  const editor = useEditor({
    extensions: [
      // 核心扩展
      Document,
      Paragraph,
      Text,
      // 格式化扩展
      Bold,
      Italic,
      Underline,
      Highlight.configure({
        multicolor: true,
      }),
      // 标题扩展
      Heading.configure({
        levels: [2, 3],
        HTMLAttributes: {
          class: ({ level }: { level: 2 | 3 }) => {
            const classes: Record<2 | 3, string> = {
              2: 'text-2xl font-semibold mb-4 text-zinc-900',
              3: 'text-xl font-medium mb-3 text-zinc-800',
            }
            return classes[level]
          }
        }
      }),
      // 列表扩展
      BulletList.configure({
        HTMLAttributes: {
          class: 'list-disc ml-4'
        }
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: 'list-decimal ml-4'
        }
      }),
      ListItem,
      // 对齐扩展
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right'],
        defaultAlignment: 'left',
      }),
      // UI 扩展
      Placeholder.configure({
        placeholder,
        emptyEditorClass: 'before:content-[attr(data-placeholder)] before:absolute before:text-gray-400 before:opacity-60 before:pointer-events-none before:h-full before:leading-relaxed',
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: cn(
          'w-full h-full px-6 py-4',
          'bg-white/50',
          'focus:outline-none',
          '[&_*]:focus:outline-none',
          'transition-colors duration-200',
          'text-zinc-800',
          'prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert',
          'prose-p:text-base prose-p:leading-relaxed prose-p:text-zinc-800',
          'prose-strong:font-medium prose-strong:text-zinc-900',
          'prose-em:text-zinc-800/90 prose-em:italic',
          'prose-ul:my-2 prose-ul:list-none',
          'prose-ol:my-2 prose-ol:list-none',
          'prose-blockquote:border-l-2 prose-blockquote:border-zinc-300/60 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-zinc-700',
          '[&_mark]:bg-yellow-100',
          '[&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mb-4 [&_h2]:text-zinc-900',
          '[&_h3]:text-xl [&_h3]:font-medium [&_h3]:mb-3 [&_h3]:text-zinc-800',
          'relative',
          className
        ),
      },
    },
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML())
    },
  })

  // 处理 ESC 键退出全屏
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape' && isFullscreen) {
      setIsFullscreen(false)
    }
  }, [isFullscreen])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  // 编辑器内容
  const editorContent = (
    <>
      <TiptapToolbar 
        editor={editor} 
        isFullscreen={isFullscreen}
        onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
      />
      <div className="flex-1 overflow-y-auto">
        <div className="min-h-full">
          <EditorContent editor={editor} />
        </div>
      </div>
    </>
  )

  // 默认视图容器
  const defaultContainer = (
    <div className={cn(
      'flex flex-col overflow-hidden',
      'rounded-xl border border-zinc-200/60',
      'bg-white/50 backdrop-blur-sm',
      'focus-within:border-zinc-300/60 focus-within:ring-1 focus-within:ring-zinc-200/60',
      'transition-all duration-200',
      'h-full'
    )}>
      {editorContent}
    </div>
  )

  // 全屏视图容器
  const fullscreenContainer = mounted && createPortal(
    <div className="fixed inset-0 z-[100] bg-white overflow-y-auto">
      {/* 顶部工具栏容器 */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-zinc-200">
        <div className="container mx-auto">
          <TiptapToolbar 
            editor={editor} 
            isFullscreen={isFullscreen}
            onToggleFullscreen={() => setIsFullscreen(false)}
          />
        </div>
      </div>

      {/* 内容区域容器 */}
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <EditorContent editor={editor} />
          </div>
        </div>
      </div>

      {/* 提示信息 */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-zinc-800/90 text-white text-sm rounded-full">
        按 ESC 退出全屏
      </div>
    </div>,
    document.body
  )

  if (!editor) {
    return null
  }

  return isFullscreen ? fullscreenContainer : defaultContainer
}

export default Tiptap 