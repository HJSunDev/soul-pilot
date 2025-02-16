'use client';

import Link from 'next/link';
import { useState, useCallback } from 'react';
import { EmotionRecorder } from '../_components/EmotionRecorder';
import { EmotionAnalytics } from '../_components/EmotionAnalytics';
import { EmotionAIAnalysis } from '../_components/EmotionAIAnalysis';
import { EmotionHistory } from '../_components/EmotionHistory';

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
      <div className="h-full w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="h-full grid grid-cols-12 gap-4">
          {/* 左侧：情绪记录和AI分析 */}
          <div className="col-span-7 h-full grid grid-rows-2 gap-4">
            {/* 情绪记录区域 */}
            <div className="row-span-1 bg-white/60 backdrop-blur-md shadow-sm rounded-3xl border-none overflow-hidden">
              <EmotionRecorder />
            </div>
            {/* AI分析区域 */}
            <div className="row-span-1 bg-white/60 backdrop-blur-md shadow-sm rounded-3xl border-none overflow-hidden">
              <EmotionAIAnalysis />
            </div>
          </div>

          {/* 右侧：日历和历史记录 */}
          <div className="col-span-5 h-full grid grid-rows-6 gap-4">
            {/* 日历区域 */}
            <div className="row-span-1 bg-white/60 backdrop-blur-md shadow-sm rounded-3xl border-none overflow-hidden">
              {/* 日历组件占位 */}
              <div className="h-full p-3 flex items-center justify-center">
                <div className="text-center">
                  <div className="relative w-8 h-8 mx-auto">
                    <svg className="absolute inset-0 text-rose-200 animate-pulse" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                    </svg>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">日历视图开发中</p>
                </div>
              </div>
            </div>

            {/* 历史记录区域 */}
            <div className="row-span-5 bg-white/60 backdrop-blur-md shadow-sm rounded-3xl border-none overflow-hidden">
              <EmotionHistory />
            </div>
          </div>
        </div>
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