'use client';

import { CardContent } from '@/components/ui/card';

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

export function EmotionAIAnalysis({ isLoading, analysis }: EmotionAIAnalysisProps) {
  if (isLoading) {
    return (
      <CardContent className="h-full p-4">
        <div className="h-full flex flex-col">
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="relative w-12 h-12 mx-auto">
                <svg className="absolute inset-0 text-rose-200 animate-spin" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
                </svg>
              </div>
              <p className="mt-4 text-sm text-gray-500">正在解读你的心情...</p>
            </div>
          </div>
        </div>
      </CardContent>
    );
  }

  if (!analysis) {
    return (
      <CardContent className="h-full p-4">
        <div className="h-full flex flex-col">
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center max-w-[240px]">
              <div className="relative w-12 h-12 mx-auto">
                <svg className="absolute inset-0 text-rose-200" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
                </svg>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                记录下你的想法，让我来解读你的心情
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    );
  }

  return (
    <CardContent className="h-full p-4">
      <div className="h-full flex flex-col">
        {/* 情绪类型和强度 */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{analysis.emotion.icon}</span>
            <div>
              <div className="text-base font-medium text-gray-900">{analysis.emotion.name}</div>
              <div className="text-xs text-gray-500">情绪强度 {analysis.emotion.intensity}%</div>
            </div>
          </div>
          <div className="relative w-16 h-16">
            <svg className="absolute inset-0 text-rose-200" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="10"
                strokeDasharray={`${analysis.emotion.intensity * 2.83} 283`}
                transform="rotate(-90 50 50)"
              />
            </svg>
          </div>
        </div>

        {/* 分析内容 */}
        <div className="flex-1 space-y-6">
          <div className="relative">
            <div className="absolute -left-3 top-1 w-1.5 h-[calc(100%-8px)] bg-gradient-to-b from-rose-300 to-rose-100 rounded-full" />
            <p className="text-sm text-gray-600 leading-relaxed pl-2">
              {analysis.analysis}
            </p>
          </div>

          <div className="space-y-3">
            {analysis.suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="relative pl-8 pr-2 py-2 bg-rose-50/50 rounded-xl"
              >
                <div className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center">
                  <span className="text-rose-400 text-xs">#{index + 1}</span>
                </div>
                <p className="text-sm text-gray-600">{suggestion}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </CardContent>
  );
} 