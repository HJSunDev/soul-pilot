'use client';

import { useEffect } from 'react';
import { initResponsive } from '@/lib/responsive';

interface ResponsiveProviderProps {
  children: React.ReactNode;
}

/**
 * 响应式布局 Provider 组件
 * 负责初始化和管理响应式布局的生命周期
 */
export function ResponsiveProvider({ children }: ResponsiveProviderProps) {
  useEffect(() => {
    // 初始化响应式布局并获取清理函数
    const cleanup = initResponsive();
    // 组件卸载时执行清理
    return cleanup;
  }, []);

  return <>{children}</>;
} 