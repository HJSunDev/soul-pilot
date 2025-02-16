'use client';

import { useState } from 'react';
import { CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// 定义时间范围选项
const timeRanges = [
  { id: 'week', name: '近一周', description: '查看本周的情绪变化' },
  { id: 'month', name: '近一月', description: '查看本月的情绪变化' },
  { id: 'year', name: '近一年', description: '查看年度情绪趋势' }
];

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
  const [timeRange, setTimeRange] = useState('week');

  // 获取当前时间范围的描述
  const currentRangeDescription = timeRanges.find(range => range.id === timeRange)?.description;

  return (
    <CardContent className="h-full p-6">
      <div className="h-full flex flex-col">
        {/* 时间范围选择 */}
        <div className="flex-shrink-0">
          <Tabs value={timeRange} onValueChange={setTimeRange} className="w-full">
            <div className="flex items-center justify-between mb-6">
              <TabsList className="w-auto bg-gray-100/80 p-1 rounded-lg">
                {timeRanges.map((range) => (
                  <TabsTrigger
                    key={range.id}
                    value={range.id}
                    className="relative px-4 py-2 rounded-md data-[state=active]:bg-white data-[state=active]:text-rose-600 transition-all duration-300"
                  >
                    {range.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              <span className="text-sm text-gray-500 animate-in fade-in slide-in-from-right-5">
                {currentRangeDescription}
              </span>
            </div>
          </Tabs>
        </div>

        {/* 数据可视化区域 */}
        <div className="flex-1 min-h-0 grid gap-6 md:grid-cols-2">
          {/* 左侧：趋势图和分布图 */}
          <div className="space-y-6">
            {/* 情绪趋势图占位 */}
            <div className="h-[calc(50%-1rem)] bg-gradient-to-br from-rose-50/50 to-white rounded-2xl border border-rose-100/20 p-4">
              <div className="h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-gray-900">情绪变化趋势</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="w-2 h-2 rounded-full bg-rose-400" />
                    趋势变化
                  </div>
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="relative w-12 h-12 mx-auto">
                      <svg className="absolute inset-0 text-rose-200 animate-pulse" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                      </svg>
                    </div>
                    <p className="mt-4 text-sm text-gray-500">趋势图表开发中</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 情绪分布占位 */}
            <div className="h-[calc(50%-1rem)] bg-gradient-to-br from-rose-50/50 to-white rounded-2xl border border-rose-100/20 p-4">
              <div className="h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-gray-900">情绪分布</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="w-2 h-2 rounded-full bg-rose-400" />
                    占比分析
                  </div>
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="relative w-12 h-12 mx-auto">
                      <svg className="absolute inset-0 text-rose-200 animate-pulse" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="mt-4 text-sm text-gray-500">分布图表开发中</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧：情绪强度分析 */}
          <div className="bg-gradient-to-br from-rose-50/50 to-white rounded-2xl border border-rose-100/20 p-4">
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-medium text-gray-900">情绪强度分析</h3>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span className="w-2 h-2 rounded-full bg-rose-400" />
                  平均强度
                </div>
              </div>
              <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                {mockEmotionData.map(({ id, type, name, avgIntensity }) => (
                  <div key={id} className="group">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{name}</span>
                        <span className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          平均强度
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">{avgIntensity}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
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
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  );
} 