'use client';

import { CardContent } from '@/components/ui/card';

interface EmotionAIAnalysisProps {
  isLoading?: boolean;
  analysis?: {
    analysis: string;
    suggestions: string[];
  } | null;
}

export function EmotionAIAnalysis({ isLoading, analysis }: EmotionAIAnalysisProps) {
  if (isLoading) {
    return (
      <CardContent className="h-full p-4">
        <div className="h-full flex flex-col animate-pulse">
          <div className="h-4 w-32 bg-gray-200 rounded mb-4" />
          <div className="space-y-3">
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-5/6 bg-gray-200 rounded" />
            <div className="h-4 w-4/6 bg-gray-200 rounded" />
          </div>
          <div className="mt-6 space-y-3">
            <div className="h-4 w-24 bg-gray-200 rounded" />
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-5/6 bg-gray-200 rounded" />
            <div className="h-4 w-4/6 bg-gray-200 rounded" />
          </div>
        </div>
      </CardContent>
    );
  }

  if (!analysis) {
    return (
      <CardContent className="h-full p-4">
        <div className="h-full flex flex-col">
          <h3 className="text-base font-medium text-gray-900 mb-3">AI 助手</h3>
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center max-w-sm">
              <div className="relative w-12 h-12 mx-auto">
                <svg className="absolute inset-0 text-rose-200" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
                </svg>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                记录下你的想法，AI 助手将为你提供心理分析和建议
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
        <h3 className="text-base font-medium text-gray-900 mb-3">AI 助手</h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">心理分析</h4>
            <p className="text-sm text-gray-600 leading-relaxed">{analysis.analysis}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">行动建议</h4>
            <ul className="space-y-2">
              {analysis.suggestions.map((suggestion, index) => (
                <li key={index} className="text-sm text-gray-600 leading-relaxed flex items-start gap-2">
                  <span className="text-rose-400 mt-1">•</span>
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </CardContent>
  );
} 