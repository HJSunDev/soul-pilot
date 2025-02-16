'use client';

import { useState } from 'react';
import { CardContent } from '@/components/ui/card';

// 模拟情绪数据
const mockEmotionData = [
  { id: 'joy', type: 'joy', name: '喜悦', count: 15, avgIntensity: 75 },
  { id: 'anger', type: 'anger', name: '愤怒', count: 8, avgIntensity: 60 },
  { id: 'sadness', type: 'sadness', name: '悲伤', count: 12, avgIntensity: 45 },
  { id: 'fear', type: 'fear', name: '恐惧', count: 5, avgIntensity: 70 },
  { id: 'disgust', type: 'disgust', name: '厌恶', count: 3, avgIntensity: 40 },
  { id: 'surprise', type: 'surprise', name: '惊讶', count: 7, avgIntensity: 65 }
];

// 定义情绪颜色映射
const emotionColors = {
  joy: '#EAB308',     // yellow-500
  anger: '#EF4444',   // red-500
  sadness: '#3B82F6', // blue-500
  fear: '#A855F7',    // purple-500
  disgust: '#22C55E', // green-500
  surprise: '#EC4899'  // pink-500
} as const;

export function EmotionAnalytics() {
  return (
    <CardContent className="h-full p-3">
      <div className="h-full flex flex-col">
        {/* 标题 */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-900">近期情绪分析</h3>
          <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
            <span className="w-1 h-1 rounded-full bg-rose-400" />
            最近一周
          </div>
        </div>

        {/* 情绪强度分析 */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1.5 custom-scrollbar">
          {mockEmotionData.map(({ id, type, name, count, avgIntensity }) => (
            <div key={id} className="group">
              <div className="flex items-center justify-between mb-0.5">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-medium">{name}</span>
                  <span className="text-[10px] text-gray-500">({count})</span>
                </div>
                <span className="text-[10px] text-gray-500">{avgIntensity}%</span>
              </div>
              <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500 group-hover:scale-x-95"
                  style={{
                    width: `${avgIntensity}%`,
                    backgroundColor: emotionColors[type as keyof typeof emotionColors]
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* 底部提示 */}
        <div className="mt-3 pt-2 border-t border-gray-100">
          <div className="flex items-center justify-between text-[10px] text-gray-500">
            <span>总计: {mockEmotionData.reduce((acc, cur) => acc + cur.count, 0)}次</span>
            <span>平均: {Math.round(mockEmotionData.reduce((acc, cur) => acc + cur.avgIntensity, 0) / mockEmotionData.length)}%</span>
          </div>
        </div>
      </div>
    </CardContent>
  );
} 