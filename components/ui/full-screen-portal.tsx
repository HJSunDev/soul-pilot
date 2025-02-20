'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/utils'

interface FullScreenPortalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
}

export const FullScreenPortal = ({
  isOpen,
  onClose,
  children,
  className
}: FullScreenPortalProps) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!mounted || !isOpen) {
    return null
  }

  return createPortal(
    <div className="fixed inset-0 z-50">
      {/* 遮罩层 */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* 内容容器 */}
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <div 
          className={cn(
            "w-[900px] bg-white/95 backdrop-blur-xl rounded-xl",
            "shadow-[0_0_1px_1px_rgba(0,0,0,0.1),0_8px_24px_-4px_rgba(0,0,0,0.1)]",
            "transition-all duration-200 ease-out",
            "animate-in zoom-in-95",
            className
          )}
        >
          {children}
        </div>
      </div>
    </div>,
    document.body
  )
} 