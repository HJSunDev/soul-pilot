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
  // AI分析状态
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<{
    emotion: {
      type: string;
      name: string;
      icon: string;
      intensity: number;
    };
    analysis: string;
    suggestions: string[];
  } | null>(null);

  // 模拟AI分析
  const handleAnalyzeEmotion = async (note: string) => {
    setIsAnalyzing(true);
    setAnalysis(null);

    try {
      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 1500));

      // 模拟分析结果
      setAnalysis({
        emotion: {
          type: 'joy',
          name: '愉悦',
          icon: '😊',
          intensity: 85
        },
        analysis: "根据你的描述，我注意到你在面对工作压力时倾向于自我怀疑。这种情绪反应是很自然的，但也显示你可能对自己要求过高。建议你尝试将注意力从'我做得够好吗'转移到'我从这个经历中学到了什么'。",
        suggestions: [
          "尝试每天记录三件做得好的小事，培养积极的自我对话",
          "在感到压力时，给自己5分钟的正念呼吸时间",
          "与信任的同事或朋友分享你的顾虑，获取不同的视角"
        ]
      });
    } catch (error) {
      console.error('分析失败:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleMouseEnter = useCallback(() => {
    setIsNavExpanded(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsNavExpanded(false);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-rose-50/30 via-white to-rose-50/20">
      {/* 主要内容区域 */}
      <div className="relative flex-1 w-full">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex gap-6 h-[40rem] max-h-[85vh] px-6">
            {/* 主要区域（情绪记录） */}
            <div className="w-[40rem] flex flex-col bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-md shadow-sm rounded-3xl border border-white/50 overflow-hidden">
              {/* 标题 */}
              <div className="text-center py-6">
                <p className="text-base text-gray-500">记录下你的想法，让我来感知你的情绪</p>
              </div>

              {/* 动画区域占位 */}
              <div className="flex items-center justify-center px-6 pb-4">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-rose-100/50 to-transparent flex items-center justify-center text-rose-300/50">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
                  </svg>
                </div>
              </div>

              {/* 情绪轨迹区域 */}
              <div className="px-6 pb-4 flex-1">
                <div className="h-full bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-md shadow-sm rounded-2xl border border-white/50 overflow-hidden">
                  <EmotionHistory />
                </div>
              </div>

              {/* 输入区域 */}
              <div className="px-6 pb-6">
                <EmotionRecorder onSubmit={handleAnalyzeEmotion} />
              </div>
            </div>

            {/* AI解读区域 */}
            <div className="w-[20rem] h-full bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-md shadow-sm rounded-3xl border border-white/50 overflow-hidden">
              <EmotionAIAnalysis isLoading={isAnalyzing} analysis={analysis} />
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