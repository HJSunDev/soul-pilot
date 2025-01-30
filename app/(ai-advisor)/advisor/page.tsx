'use client';

import { AdvisorView } from '../_components/AdvisorView';
import Link from 'next/link';
import { useState, useCallback } from 'react';

// 定义功能模块数据
const modules = [
  {
    id: 'ai-advisor',
    name: 'AI 导航',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
      </svg>
    ),
    href: '/advisor',
    active: true
  },
  {
    id: 'emotion-archive',
    name: '情绪档案',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
    ),
    href: '/emotion-archive'
  }
];

export default function AdvisorPage() {
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  // 使用 useCallback 优化性能
  const handleMouseEnter = useCallback(() => {
    setIsNavExpanded(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsNavExpanded(false);
  }, []);

  return (
    // 页面容器，设置背景渐变
    <div className="min-h-screen bg-gradient-to-b from-white to-indigo-50/30">
      {/* 返回主页按钮 */}
      <div className="fixed top-6 left-6 z-50">
        <Link
          href="/"
          // 按钮样式，包含背景、阴影、过渡效果等
          className="group relative flex items-center gap-2 rounded-full bg-white/90 pl-3 pr-4 py-2 shadow-lg ring-1 ring-gray-900/5 backdrop-blur-md transition-all duration-300 hover:bg-white hover:shadow-indigo-200/50 hover:-translate-y-0.5"
        >
          <span
            // 图标容器，包含旋转效果
            className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600/10 text-indigo-600 transition-transform duration-300 group-hover:-rotate-12"
          >
            <svg
              // SVG 图标，表示返回箭头
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
          </span>
          <span
            // 按钮文本
            className="text-sm font-medium text-gray-900"
          >
            返回主页
          </span>
          <div
            // 按钮底部的渐变线条，悬停时可见
            className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-indigo-500/0 via-indigo-500/70 to-indigo-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        </Link>
      </div>

      {/* 侧边导航栏 */}
      <nav 
        className={`fixed left-6 top-1/2 -translate-y-1/2 z-40 transition-all duration-300 ease-in-out ${isNavExpanded ? 'w-48' : 'w-14 hover:w-48'}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg ring-1 ring-gray-900/5 p-2">
          {/* 导航链接 */}
          <div className="space-y-1">
            {modules.map((module) => (
              <Link
                key={module.id}
                href={module.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group
                  ${module.active
                    ? 'text-indigo-600 bg-indigo-50'
                    : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50/50'
                  }
                `}
              >
                <span className="flex-shrink-0 transition-transform duration-200 group-hover:scale-110">
                  {module.icon}
                </span>
                <span className={`text-sm font-medium truncate transition-opacity duration-200 ${isNavExpanded ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                  {module.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <div
        // 内容容器，设置最大宽度和内边距
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div
          // 文本中心对齐，包含标题和描述
          className="text-center mb-16"
        >
          <h1
            // 主标题，包含不同屏幕尺寸的字体大小
            className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl"
          >
            <span className="block">AI 心灵导航</span>
            <span className="block text-indigo-600 mt-2">找到属于你的答案</span>
          </h1>
          <p
            // 描述文本，包含不同屏幕尺寸的字体大小
            className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
          >
            通过了解你的三观与当前处境，为你提供量身定制的建议和指导。
          </p>
        </div>

        {/* 引入 AdvisorView 组件 */}
        <AdvisorView />
      </div>
    </div>
  );
} 