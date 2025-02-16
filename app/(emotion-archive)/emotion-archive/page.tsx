'use client';

import Link from 'next/link';
import { useState, useCallback } from 'react';
import { EmotionArchiveView } from '../_components/EmotionArchiveView';

// 定义导航模块数据
const modules = [
  {
    id: 'value-compass',
    name: '心灵导航',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
      </svg>
    ),
    href: '/advisor'
  },
  {
    id: 'emotion-archive',
    name: '情绪档案',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
    ),
    href: '/emotion-archive',
    active: true
  },
  {
    id: 'personality-modeling',
    name: '人格建模',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
    ),
    href: '/personality-modeling'
  }
];

export default function EmotionArchivePage() {
  // 控制侧边导航栏的展开状态
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setIsNavExpanded(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsNavExpanded(false);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-white to-rose-50/30">
      {/* 主要内容区域 */}
      <div className="h-full w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col justify-center">
        {/* 页面标题和描述 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-4xl">
            <span className="block">情绪档案</span>
            <span className="block text-rose-600 mt-2">记录你的心路历程</span>
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-base text-gray-500 sm:text-lg md:mt-4">
            通过记录和分析你的情绪变化，帮助你更好地理解自己，实现情绪的良性循环。
          </p>
        </div>

        {/* 核心功能组件 */}
        <EmotionArchiveView />
      </div>

      {/* 返回主页按钮 */}
      <div className="fixed top-5 left-5 z-50">
        <Link
          href="/"
          className="group relative flex items-center gap-2 rounded-full bg-white/90 pl-2.5 pr-3.5 py-1.5 shadow-md ring-1 ring-gray-900/5 backdrop-blur-md transition-all duration-300 hover:bg-white hover:shadow-rose-200/50 hover:-translate-y-0.5"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-600/10 text-rose-600 transition-transform duration-300 group-hover:-rotate-12">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </span>
          <span className="text-sm font-medium text-gray-900">返回主页</span>
          <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-rose-500/0 via-rose-500/70 to-rose-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </Link>
      </div>

      {/* 侧边导航栏 */}
      <nav 
        className={`fixed left-5 top-1/2 -translate-y-1/2 z-40 transition-all duration-300 ease-in-out ${isNavExpanded ? 'w-40' : 'w-12'}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-md ring-1 ring-gray-900/5 p-1.5">
          <div className="space-y-1">
            {modules.map((module) => (
              <Link
                key={module.id}
                href={module.href}
                className={`flex items-center gap-2.5 px-2.5 py-2 rounded-xl transition-all duration-200 group
                  ${module.active
                    ? 'text-rose-600 bg-rose-50'
                    : 'text-gray-600 hover:text-rose-600 hover:bg-rose-50/50'
                  }
                `}
              >
                <span className="flex-shrink-0 transition-transform duration-200 group-hover:scale-110">
                  {module.icon}
                </span>
                <span className={`text-sm font-medium truncate transition-opacity duration-200 ${isNavExpanded ? 'opacity-100' : 'opacity-0'}`}>
                  {module.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
} 