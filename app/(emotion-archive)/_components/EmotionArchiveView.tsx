'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EmotionRecorder } from './EmotionRecorder';
import { EmotionAnalytics } from './EmotionAnalytics';

// 定义标签页配置
const tabs = [
  {
    id: 'record',
    name: '记录',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
      </svg>
    )
  },
  {
    id: 'calendar',
    name: '日历',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    )
  },
  {
    id: 'analytics',
    name: '分析',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    )
  }
];

export function EmotionArchiveView() {
  const [activeTab, setActiveTab] = useState('record');

  return (
    <div className="relative w-full h-[calc(100vh-16rem)] flex flex-col">
      {/* 主内容区域 */}
      <div className="relative flex-1 flex flex-col">
        {/* 背景装饰 */}
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50/30 via-white to-rose-50/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-100/20 via-transparent to-transparent" />
        
        {/* 内容区域 */}
        <div className="relative h-full flex flex-col">
          {/* 标签页导航 */}
          <div className="flex-shrink-0 px-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex items-center justify-center">
                <TabsList className="inline-flex h-11 items-center justify-center rounded-full bg-white/80 p-1 backdrop-blur-sm shadow-sm shadow-rose-100/20 border border-rose-100/10">
                  {tabs.map((tab) => (
                    <TabsTrigger
                      key={tab.id}
                      value={tab.id}
                      className="inline-flex items-center justify-center whitespace-nowrap rounded-full px-6 py-2.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-rose-600 data-[state=active]:shadow-sm"
                    >
                      <span className="flex items-center gap-2">
                        {tab.icon}
                        {tab.name}
                      </span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {/* 标签页内容 */}
              <div className="mt-6 h-[calc(100vh-22rem)]">
                <TabsContent value="record" className="h-full mt-0 rounded-3xl outline-none">
                  <Card className="h-full bg-white/60 backdrop-blur-md border-none shadow-sm overflow-hidden rounded-3xl">
                    <EmotionRecorder />
                  </Card>
                </TabsContent>

                <TabsContent value="calendar" className="h-full mt-0 rounded-3xl outline-none">
                  <Card className="h-full bg-white/60 backdrop-blur-md border-none shadow-sm overflow-hidden rounded-3xl">
                    {/* 日历组件占位 */}
                    <div className="h-full p-8 flex items-center justify-center">
                      <div className="w-full h-full flex items-center justify-center rounded-2xl">
                        <div className="text-center">
                          <div className="relative w-16 h-16 mx-auto">
                            <svg className="absolute inset-0 text-rose-200/70 animate-pulse" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                            </svg>
                          </div>
                          <h3 className="mt-4 text-base font-medium text-gray-900">日历视图开发中</h3>
                          <p className="mt-2 text-sm text-gray-500">我们正在为您打造更好的情绪记录体验</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="analytics" className="h-full mt-0 rounded-3xl outline-none">
                  <Card className="h-full bg-white/60 backdrop-blur-md border-none shadow-sm overflow-hidden rounded-3xl">
                    <EmotionAnalytics />
                  </Card>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
} 