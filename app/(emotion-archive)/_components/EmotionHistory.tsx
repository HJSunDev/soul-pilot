'use client';

import { useState } from 'react';
import { CardContent } from '@/components/ui/card';

// 模拟历史数据
const mockHistoryData = [
  {
    id: '1',
    date: '2024-03-10',
    time: '14:30',
    emotion: { type: 'joy', name: '喜悦', icon: '😊' },
    intensity: 85,
    content: '今天的项目演示非常成功，团队的努力得到了认可，感到很欣慰。主管的积极反馈让我对未来更有信心。',
    analysis: '情绪积极，展现出良好的团队协作能力和职业成就感。建议继续保持这种积极的工作态度。',
  },
  {
    id: '2',
    date: '2024-03-09',
    time: '20:15',
    emotion: { type: 'sadness', name: '悲伤', icon: '😢' },
    intensity: 60,
    content: '和好友谈心，聊到一些过去的遗憾。虽然有些感伤，但也让我更清楚地认识到自己想要的是什么。',
    analysis: '通过情感交流进行自我反思，这是个健康的过程。建议将这些思考转化为具体的行动计划。',
  },
  {
    id: '3',
    date: '2024-03-08',
    time: '09:45',
    emotion: { type: 'anger', name: '愤怒', icon: '😠' },
    intensity: 75,
    content: '早会上的分歧让我很烦躁，感觉自己的观点没有得到充分理解。需要学会更好地表达和沟通。',
    analysis: '工作中的冲突常见，关键是要保持理性和建设性的态度。建议学习一些有效的沟通技巧。',
  }
];

export function EmotionHistory() {
  const [selectedEntry, setSelectedEntry] = useState<string | null>(null);

  return (
    <CardContent className="h-full p-4">
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-medium text-gray-900">情绪记录</h3>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            最近更新
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-3">
          {mockHistoryData.map((entry) => (
            <div
              key={entry.id}
              className={`
                group rounded-xl border transition-all duration-300 cursor-pointer
                ${selectedEntry === entry.id
                  ? 'border-rose-200 bg-rose-50/50'
                  : 'border-gray-100 hover:border-rose-200/50 hover:bg-rose-50/30'
                }
              `}
              onClick={() => setSelectedEntry(entry.id)}
            >
              <div className="p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{entry.emotion.icon}</span>
                    <span className="text-sm font-medium text-gray-900">{entry.emotion.name}</span>
                    <span className="text-xs text-gray-500">强度 {entry.intensity}%</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    <div>{entry.date}</div>
                    <div className="text-right">{entry.time}</div>
                  </div>
                </div>
                
                <div className="text-sm text-gray-600 line-clamp-2">
                  {entry.content}
                </div>

                {selectedEntry === entry.id && (
                  <div className="mt-3 pt-3 border-t border-rose-100/50">
                    <div className="text-sm text-gray-600">
                      <span className="text-rose-500">AI分析：</span>
                      {entry.analysis}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </CardContent>
  );
} 