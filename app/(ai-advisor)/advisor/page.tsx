'use client';

import { AdvisorView } from '../_components/AdvisorView';
import { Navbar } from '@/app/_components/Navbar';
import { SideNav } from '@/app/_components/SideNav';
import { getNavModules } from '@/app/_config/navigation';

export default function AdvisorPage() {
  return (
    <div className="flex flex-col h-screen bg-linear-to-b from-white to-indigo-50/30">
      {/* 导航栏 */}
      <Navbar theme="indigo" />
      
      {/* 主要内容区域 */}
      <div className="h-full w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col justify-center">
        {/* 页面标题和描述 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-4xl">
            <span className="block">心灵导航</span>
            <span className="block text-indigo-600 mt-2">找到属于你的答案</span>
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-base text-gray-500 sm:text-lg md:mt-4">
            通过了解你的三观与当前处境，为你提供量身定制的建议和指导。
          </p>
        </div>

        {/* 核心功能组件 */}
        <AdvisorView />
      </div>

      {/* 侧边导航栏 */}
      <SideNav modules={getNavModules('value-compass')} theme="indigo" />
    </div>
  );
} 