"use client";

import Link from "next/link";
import { useState, useCallback, useEffect } from "react";
import { EmotionRecorder } from "../_components/EmotionRecorder";
import { EmotionAIAnalysis } from "../_components/EmotionAIAnalysis";
import { EmotionHistory } from "../_components/EmotionHistory";
import { Navbar } from "@/app/_components/Navbar";
import { SideNav } from "@/app/_components/SideNav";
import { getNavModules } from "@/app/_config/navigation";
import { motion } from "framer-motion";

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

  // 动画状态
  const [showAnimation, setShowAnimation] = useState(true);

  // 初始动画效果
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // 模拟AI分析
  const handleAnalyzeEmotion = async (note: string) => {
    setIsAnalyzing(true);
    setAnalysis(null);

    try {
      // 模拟API调用延迟
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // 模拟分析结果
      setAnalysis({
        emotion: {
          type: "joy",
          name: "愉悦",
          icon: "😊",
          intensity: 85,
        },
        analysis:
          "根据你的描述，我注意到你在面对工作压力时倾向于自我怀疑。这种情绪反应是很自然的，但也显示你可能对自己要求过高。建议你尝试将注意力从'我做得够好吗'转移到'我从这个经历中学到了什么'。",
        suggestions: [
          "尝试每天记录三件做得好的小事，培养积极的自我对话",
          "在感到压力时，给自己5分钟的正念呼吸时间",
          "与信任的同事或朋友分享你的顾虑，获取不同的视角",
        ],
      });
    } catch (error) {
      console.error("分析失败:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-rose-50/30 via-white to-rose-50/20 overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-grid-gray-900/[0.02] -z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-transparent backdrop-blur-[1px] -z-10" />

      {/* 装饰元素 */}
      <div className="absolute top-[10%] left-[5%] w-[20rem] h-[20rem] bg-rose-100/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[5%] w-[15rem] h-[15rem] bg-pink-100/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* 主要内容区域 */}
      <div className="relative flex-1 w-full flex items-center justify-center">
        <div className="flex w-[90%] max-w-[1400px] gap-6 items-stretch">
          {/* 左侧：情绪历史 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-[30%] min-w-[280px] bg-gradient-to-br from-white/95 to-white/75 backdrop-blur-xl shadow-xl rounded-[1.5rem] border border-white/60 overflow-hidden"
          >
            <div className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-rose-100/50 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-rose-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-lg font-medium text-gray-800">情绪历史</h2>
              </div>

              <div className="h-[calc(100vh-220px)]">
                <EmotionHistory />
              </div>
            </div>
          </motion.div>

          {/* 中间：情绪记录 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 flex flex-col bg-gradient-to-br from-white/95 to-white/75 backdrop-blur-xl shadow-xl rounded-[1.5rem] border border-white/60 overflow-hidden"
          >
            {/* 动画区域 */}
            <div className="flex-1 flex items-center justify-center p-8">
              {showAnimation ? (
                <div className="relative w-32 h-32 group">
                  {/* 外层光环 */}
                  <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-rose-200/30 via-rose-300/40 to-rose-200/30 blur-md animate-spin-reverse-slow opacity-75 group-hover:opacity-90 transition-all duration-300" />

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
                        className="relative w-12 h-12 transform transition-all duration-700 animate-float group-hover:rotate-[360deg]"
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
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6">
                  <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">
                      情绪档案
                    </h1>
                    <p className="text-gray-600 max-w-md">
                      记录你的情绪变化，帮助你进行心理分析，引导你找到心理根源，帮助你破解心理障碍。
                    </p>
                  </div>

                  <div className="relative w-32 h-32 group mt-[5rem]">
                    {/* 外层光环 */}
                    <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-rose-200/30 via-rose-300/40 to-rose-200/30 blur-md animate-spin-reverse-slow opacity-75 group-hover:opacity-90 transition-all duration-300" />

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
                          className="relative w-12 h-12 transform transition-all duration-700 animate-float group-hover:rotate-[360deg]"
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
              )}
            </div>

            {/* 输入区域 */}
            <div className="p-6 bg-white/30 backdrop-blur-sm border-t border-white/50">
              <div className="max-w-2xl mx-auto">
                <EmotionRecorder onSubmit={handleAnalyzeEmotion} />
              </div>
            </div>
          </motion.div>

          {/* 右侧：AI分析 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-[30%] min-w-[280px] bg-gradient-to-br from-white/95 to-white/75 backdrop-blur-xl shadow-xl rounded-[1.5rem] border border-white/60 overflow-hidden"
          >
            <div className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-rose-100/50 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-rose-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"
                    />
                  </svg>
                </div>
                <h2 className="text-lg font-medium text-gray-800">AI解读</h2>
              </div>

              <div className="h-[calc(100vh-220px)]">
                <EmotionAIAnalysis
                  isLoading={isAnalyzing}
                  analysis={analysis}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 导航栏 */}
      <Navbar theme="rose" />

      {/* 侧边导航栏 */}
      <SideNav modules={getNavModules("emotion-archive")} theme="rose" />
    </div>
  );
}
