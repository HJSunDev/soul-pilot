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

// 定义情绪类型及其对应的背景色
const emotionColors = {
  joy: 'bg-amber-100 text-amber-500 border-amber-200',
  calm: 'bg-emerald-100 text-emerald-500 border-emerald-200',
  sad: 'bg-purple-100 text-purple-500 border-purple-200',
  anxiety: 'bg-pink-100 text-pink-500 border-pink-200'
} as const;

// 模拟历史数据
const mockHistoryData = [
  {
    id: '1',
    date: '今天',
    time: '14:30',
    emotion: { type: 'joy', name: '愉悦', icon: '😊', intensity: 85 },
    content: '今天的项目演示非常成功，感到很欣慰。',
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
  },
  {
    id: '5',
    date: '4天前',
    time: '18:45',
    emotion: { type: 'joy', name: '愉悦', icon: '😊', intensity: 80 },
    content: '收到了期待已久的礼物，心情大好。',
  }
];

export function EmotionHistory() {
  const [selectedEntry, setSelectedEntry] = useState<string | null>(null);
  
  return (
    <div className="h-full overflow-y-auto custom-scrollbar pr-2">
      {/* 时间线 */}
      <div className="relative pl-6 pb-4">
        {/* 时间线轴 */}
        <div className="absolute left-2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-rose-200 via-rose-100 to-rose-50"></div>
        
        {/* 情绪记录条目 */}
        {mockHistoryData.map((entry, index) => (
          <div 
            key={entry.id}
            className={`relative mb-4 transition-all duration-300 ${
              selectedEntry === entry.id ? 'scale-[1.02]' : ''
            }`}
          >
            {/* 时间线节点 */}
            <div className={`absolute left-[-0.5rem] top-3 w-4 h-4 rounded-full border-2 border-white shadow-sm z-10 ${
              emotionColors[entry.emotion.type as keyof typeof emotionColors].split(' ')[0]
            }`}></div>
            
            {/* 情绪卡片 */}
            <div 
              className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-white/60 overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedEntry(selectedEntry === entry.id ? null : entry.id)}
            >
              {/* 卡片头部 */}
              <div className="flex items-center justify-between p-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{entry.emotion.icon}</span>
                  <div>
                    <div className="text-sm font-medium text-gray-800">{entry.emotion.name}</div>
                    <div className="text-xs text-gray-500">{entry.date} {entry.time}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-300 ${
                        entry.emotion.type === 'joy' ? 'bg-amber-400' :
                        entry.emotion.type === 'calm' ? 'bg-emerald-400' :
                        entry.emotion.type === 'sad' ? 'bg-purple-400' :
                        'bg-pink-400'
                      }`}
                      style={{ width: `${entry.emotion.intensity}%` }}
                    />
                  </div>
                </div>
              </div>
              
              {/* 卡片内容 */}
              <div className={`overflow-hidden transition-all duration-300 ${
                selectedEntry === entry.id ? 'max-h-32' : 'max-h-0'
              }`}>
                <div className="p-3 text-sm text-gray-600 ">
                  {entry.content}
                </div>
              </div>
              
              {/* 卡片预览 - 仅在未展开时显示 */}
              {selectedEntry !== entry.id && (
                <div className="p-2 text-xs text-gray-500 line-clamp-1">
                  {entry.content}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}