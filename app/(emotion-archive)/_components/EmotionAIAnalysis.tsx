'use client';

import { CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface EmotionAIAnalysisProps {
  isLoading?: boolean;
  analysis?: {
    emotion: {
      type: string;
      name: string;
      icon: string;
      intensity: number;
    };
    analysis: string;
    suggestions: string[];
  } | null;
}

// 定义情绪类型及其对应的颜色
const emotionColors = {
  joy: 'text-amber-500 bg-amber-100',
  calm: 'text-emerald-500 bg-emerald-100',
  sad: 'text-purple-500 bg-purple-100',
  anxiety: 'text-pink-500 bg-pink-100'
} as const;

export function EmotionAIAnalysis({ isLoading, analysis }: EmotionAIAnalysisProps) {
  if (isLoading) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6">
        <div className="relative w-16 h-16 mb-6">
          <div className="absolute inset-0 rounded-full border-2 border-rose-200 opacity-20"></div>
          <div className="absolute inset-0 rounded-full border-t-2 border-rose-400 animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-6 h-6 text-rose-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
            </svg>
          </div>
        </div>
        <p className="text-sm text-gray-500 text-center animate-pulse">正在解读你的心情...</p>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6">
        <div className="text-center max-w-[240px]">
          <div className="relative w-16 h-16 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full bg-rose-50 flex items-center justify-center">
              <svg className="w-8 h-8 text-rose-300" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
              </svg>
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-2">
            等待你的情绪输入
          </p>
          <p className="text-xs text-gray-400">
            记录下你的想法，让我来解读你的心情
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto custom-scrollbar pr-2">
      {/* 情绪类型和强度 */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-white/60 p-4 mb-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
              emotionColors[analysis.emotion.type as keyof typeof emotionColors]
            }`}>
              {analysis.emotion.icon}
            </div>
            <div>
              <div className="text-base font-medium text-gray-900">{analysis.emotion.name}</div>
              <div className="text-xs text-gray-500">情绪强度</div>
            </div>
          </div>
          <div className="relative w-16 h-16">
            <svg className="w-full h-full transform " viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#f1f1f1"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke={
                  analysis.emotion.type === 'joy' ? '#fbbf24' :
                  analysis.emotion.type === 'calm' ? '#34d399' :
                  analysis.emotion.type === 'sad' ? '#a78bfa' :
                  '#f472b6'
                }
                strokeWidth="8"
                strokeDasharray={`${analysis.emotion.intensity * 2.51} 251`}
                strokeLinecap="round"
              />
              <text
                x="50"
                y="55"
                textAnchor="middle"
                fontSize="16"
                fontWeight="bold"
                fill="#666"
              >
                {analysis.emotion.intensity}%
              </text>
            </svg>
          </div>
        </div>
      </motion.div>

      {/* 分析内容 */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-white/60 p-4 mb-4"
      >
        <div className="flex items-center gap-2 mb-3">
          <svg className="w-4 h-4 text-rose-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
          </svg>
          <h3 className="text-sm font-medium text-gray-800">情绪分析</h3>
        </div>
        <div className="relative pl-4">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-rose-300 to-rose-100 rounded-full" />
          <p className="text-sm text-gray-600 leading-relaxed">
            {analysis.analysis}
          </p>
        </div>
      </motion.div>

      {/* 建议 */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-white/60 p-4"
      >
        <div className="flex items-center gap-2 mb-3">
          <svg className="w-4 h-4 text-rose-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
          </svg>
          <h3 className="text-sm font-medium text-gray-800">改善建议</h3>
        </div>
        <div className="space-y-3">
          {analysis.suggestions.map((suggestion, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
              className="relative pl-8 pr-2 py-2 bg-rose-50/50 rounded-xl"
            >
              <div className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center">
                <span className="text-rose-400 text-xs">#{index + 1}</span>
              </div>
              <p className="text-sm text-gray-600">{suggestion}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}