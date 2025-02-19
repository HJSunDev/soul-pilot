'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { cn } from "@/lib/utils"

interface TiptapProps {
  content?: string;
  onChange?: (content: string) => void;
  className?: string;
}

const Tiptap = ({ content = '<p>开始写作...</p>', onChange, className }: TiptapProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content,
    editorProps: {
      attributes: {
        class: cn(
          'w-full min-h-[200px] p-6 rounded-xl',
          'bg-white/50 backdrop-blur-sm',
          'border border-zinc-200/60',
          '[&:focus]:outline-none',
          '[&_*]:focus:outline-none',
          'focus-within:border-zinc-300/60 focus-within:ring-1 focus-within:ring-zinc-200/60',
          'transition-all duration-200',
          'text-zinc-800',
          'prose-headings:font-medium prose-headings:text-zinc-900',
          'prose-p:text-base prose-p:leading-relaxed prose-p:text-zinc-800',
          'prose-strong:font-medium prose-strong:text-zinc-900',
          'prose-em:text-zinc-800/90 prose-em:italic',
          'prose-ul:list-disc prose-ul:pl-6 prose-ul:my-2',
          'prose-ol:list-decimal prose-ol:pl-6 prose-ol:my-2',
          'prose-blockquote:border-l-2 prose-blockquote:border-zinc-300/60 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-zinc-700',
          'prose-code:bg-zinc-100/80 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm',
          'prose-pre:bg-zinc-100/80 prose-pre:p-4 prose-pre:rounded-lg',
          className
        ),
      },
    },
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML())
    },
  })

  return (
    <div className="w-full">
      <EditorContent editor={editor} />
    </div>
  )
}

export default Tiptap 