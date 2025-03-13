'use client';

import { useEffect, useState } from 'react';

/**
 * 实时显示根元素字体大小的组件
 */
export function RemSizeDisplay() {
  const [fontSize, setFontSize] = useState<string>('');
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    // 初始化时获取字体大小
    updateFontSize();
    
    // 设置窗口宽度
    setWindowWidth(window.innerWidth);

    // 监听窗口大小变化
    const handleResize = () => {
      updateFontSize();
      setWindowWidth(window.innerWidth);
    };

    // 添加事件监听
    window.addEventListener('resize', handleResize);
    
    // 清理函数
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 更新字体大小
  const updateFontSize = () => {
    const computedStyle = window.getComputedStyle(document.documentElement);
    const currentFontSize = computedStyle.fontSize;
    setFontSize(currentFontSize);
  };

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-2 rounded-md z-50 text-sm font-mono">
      <div>窗口宽度: {windowWidth}px</div>
      <div>根字体大小: {fontSize}</div>
    </div>
  );
} 