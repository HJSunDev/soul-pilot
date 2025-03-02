'use client';

import Link from 'next/link';
import { useState, useCallback } from 'react';
import { EmotionRecorder } from '../_components/EmotionRecorder';
import { EmotionAIAnalysis } from '../_components/EmotionAIAnalysis';
import { EmotionHistory } from '../_components/EmotionHistory';
import { Navbar } from '@/app/_components/Navbar';
import { SideNav } from '@/app/_components/SideNav';
import { getNavModules } from '@/app/_config/navigation';

export default function EmotionArchivePage() {
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

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-rose-50/30 via-white to-rose-50/20">
      {/* 主要内容区域 */}
      <div className="relative flex-1 w-full">
        {/* 背景装饰 */}
        <div className="absolute inset-0 bg-grid-gray-900/[0.02] -z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-transparent backdrop-blur-[1px] -z-10" />

        {/* 主要区域（情绪记录），通过绝对定位水平居中并垂直居中 */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[clamp(35rem,42vw,48rem)] min-h-[35rem] max-h-[88vh] flex flex-col bg-gradient-to-br from-white/95 to-white/75 backdrop-blur-2xl shadow-xl rounded-[2rem] border border-white/60 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:border-white/70">
          {/* 动画区域占位 */}
          <div className="flex items-center justify-center px-5 py-8">
            <div className="relative w-24 h-24 group">
              {/* 外层光环 */}
              <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-rose-200/30 via-rose-300/40 to-rose-200/30 blur-md animate-spin-reverse-slow opacity-75 group-hover:opacity-90 transition-all duration-300" />
              
              {/* 能量流动效果 - 主层 */}
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-conic from-rose-200/50 via-rose-300/60 to-rose-200/50 animate-spin-slow group-hover:animate-spin-slower transition-all duration-300" />
                <div className="absolute inset-0 bg-gradient-conic from-white/50 via-transparent to-white/50 animate-spin-slower mix-blend-overlay" />
                <div className="absolute inset-1 rounded-full bg-gradient-to-br from-white/95 to-white/80 backdrop-blur-sm group-hover:from-white/90 transition-all duration-300" />
              </div>

              {/* 内部光效 */}
              <div className="absolute inset-1 rounded-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-conic from-rose-100/30 via-transparent to-rose-100/30 animate-spin-reverse-slower" />
                <div className="absolute inset-0 bg-gradient-radial from-rose-100/20 via-transparent to-transparent animate-pulse-slow" />
              </div>

              {/* 主图标容器 */}
              <div className="absolute inset-0 rounded-full flex items-center justify-center">
                <div className="relative flex items-center justify-center text-rose-400/80 transition-all duration-500 group-hover:scale-110 group-hover:text-rose-400">
                  <div className="absolute inset-0 bg-gradient-radial from-rose-100/40 via-transparent to-transparent animate-pulse-slow" />
                  <svg 
                    className="relative w-8 h-8 transform transition-all duration-700 animate-float group-hover:rotate-[360deg]" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={1.2} 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" 
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* 情绪轨迹区域 */}
          <div className="px-5 pb-4 flex-1">
            <div className="h-full bg-gradient-to-br from-white/90 to-white/50 backdrop-blur-xl shadow-lg rounded-2xl border border-white/60 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-white/70 hover:from-white/95">
              <EmotionHistory />
            </div>
          </div>

          {/* 输入区域 */}
          <div className="px-5 pb-5">
            <EmotionRecorder onSubmit={handleAnalyzeEmotion} />
          </div>
        </div>

        {/* AI解读区域，绝对定位在主要区域右侧 */}
        <div className="absolute top-1/2 transform -translate-y-1/2 left-[calc(50%+min(22vw,24.5rem))] w-[clamp(16rem,26vw,20rem)] min-h-[35rem] max-h-[88vh] bg-gradient-to-br from-white/95 to-white/75 backdrop-blur-2xl shadow-xl rounded-[2rem] border border-white/60 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:border-white/70">
          <EmotionAIAnalysis isLoading={isAnalyzing} analysis={analysis} />
        </div>
      </div>

      {/* 导航栏 */}
      <Navbar theme="rose" />

      {/* 侧边导航栏 */}
      <SideNav modules={getNavModules('emotion-archive')} theme="rose" />
    </div>
  );
} 