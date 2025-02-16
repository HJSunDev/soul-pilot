'use client';

import { useState } from 'react';
import { CardContent } from '@/components/ui/card';

// 定义情绪类型及其对应的渐变色
const emotionGradients = {
  joy: 'from-amber-100 via-amber-50 to-transparent',
  calm: 'from-emerald-100 via-emerald-50 to-transparent',
  sad: 'from-purple-100 via-purple-50 to-transparent',
  anxiety: 'from-pink-100 via-pink-50 to-transparent'
} as const;

// 模拟历史数据
const mockHistoryData = [
  {
    id: '1',
    date: '今天',
    time: '14:30',
    emotion: { type: 'joy', name: '愉悦', icon: '😊', intensity: 85 },
    content: '今天的项目演示非常成功，团队的努力得到了认可，感到很欣慰。',
  },
  {
    id: '2',
    date: '昨天',
    time: '20:15',
    emotion: { type: 'sad', name: '低落', icon: '😢', intensity: 60 },
    content: '和好友谈心，聊到一些过去的遗憾。',
  },
  {
    id: '3',
    date: '前天',
    time: '09:45',
    emotion: { type: 'anxiety', name: '焦虑', icon: '😰', intensity: 75 },
    content: '早会上的分歧让我很烦躁。',
  },
  {
    id: '4',
    date: '3天前',
    time: '15:20',
    emotion: { type: 'calm', name: '平静', icon: '😌', intensity: 90 },
    content: '午后的阳光很温暖。',
  }
];

export function EmotionHistory() {
  return (
    <CardContent className="h-full p-3">
      <div className="h-full flex flex-col">
        {/* 标题 */}
        <div className="flex items-center gap-2 mb-3">
          <svg className="w-4 h-4 text-rose-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm font-medium text-gray-900">情绪轨迹</span>
        </div>

        {/* 情绪记录 */}
        <div className="flex-1 flex items-center">
          <div className="w-full flex gap-2 overflow-x-auto custom-scrollbar pb-1">
            {mockHistoryData.map((entry) => (
              <div
                key={entry.id}
                className="flex-shrink-0 w-28 group"
              >
                <div className="relative rounded-xl transition-all duration-300 hover:scale-105">
                  <div className={`
                    absolute inset-0 rounded-xl bg-gradient-to-r opacity-50 transition-opacity duration-300 group-hover:opacity-75
                    ${emotionGradients[entry.emotion.type as keyof typeof emotionGradients]}
                  `} />
                  
                  <div className="relative p-2.5 rounded-xl bg-white/80 backdrop-blur-sm border border-white/50 shadow-sm">
                    {/* 头部信息 */}
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-lg">{entry.emotion.icon}</span>
                      <div className="w-8 h-1 rounded-full bg-gray-100 overflow-hidden">
                        <div 
                          className="h-full rounded-full bg-rose-400 transition-all duration-300"
                          style={{ width: `${entry.emotion.intensity}%` }}
                        />
                      </div>
                    </div>
                    
                    {/* 时间 */}
                    <div className="mb-1.5">
                      <div className="text-xs font-medium text-gray-900">{entry.date}</div>
                      <div className="text-[10px] text-gray-500">{entry.time}</div>
                    </div>

                    {/* 内容 */}
                    <div className="text-[10px] leading-normal text-gray-600 line-clamp-3">
                      {entry.content}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </CardContent>
  );
} 