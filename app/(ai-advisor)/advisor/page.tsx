'use client';

import { AdvisorView } from '../_components/AdvisorView';
import Link from 'next/link';

export default function AdvisorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-indigo-50/30">
      <div className="fixed top-6 left-6 z-50">
        <Link
          href="/"
          className="group relative flex items-center gap-2 rounded-full bg-white/90 pl-3 pr-4 py-2 shadow-lg ring-1 ring-gray-900/5 backdrop-blur-md transition-all duration-300 hover:bg-white hover:shadow-indigo-200/50 hover:-translate-y-0.5"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600/10 text-indigo-600 transition-transform duration-300 group-hover:-rotate-12">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </span>
          <span className="text-sm font-medium text-gray-900">
            返回主页
          </span>
          <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-indigo-500/0 via-indigo-500/70 to-indigo-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">AI 心灵导航</span>
            <span className="block text-indigo-600 mt-2">找到属于你的答案</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            通过了解你的三观与当前处境，为你提供量身定制的建议和指导。
          </p>
        </div>

        <AdvisorView />
      </div>
    </div>
  );
} 