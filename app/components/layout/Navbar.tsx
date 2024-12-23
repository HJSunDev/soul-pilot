'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

// 导航栏组件
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // 监听滚动事件
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo 部分 */}
          <div className="flex-shrink-0 flex items-center">
            <Link 
              href="/" 
              className="group flex items-center space-x-2"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:shadow-indigo-500/30 transition-shadow duration-300">
                SP
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Soul Pilot
              </span>
            </Link>
          </div>

          {/* 导航链接 */}
          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            <Link
              href="/"
              className="relative text-sm font-medium text-gray-900 transition-colors duration-300 hover:text-indigo-600 px-1 group"
            >
              <span className="relative z-10">首页</span>
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-indigo-100 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
            <Link
              href="/features"
              className="relative text-sm font-medium text-gray-600 transition-colors duration-300 hover:text-indigo-600 px-1 group"
            >
              <span className="relative z-10">特性</span>
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-indigo-100 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
            <Link
              href="/about"
              className="relative text-sm font-medium text-gray-600 transition-colors duration-300 hover:text-indigo-600 px-1 group"
            >
              <span className="relative z-10">关于</span>
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-indigo-100 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          </div>

          {/* 用户操作区 */}
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            <button className="relative inline-flex h-9 items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-all duration-300 hover:bg-gray-50 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2">
              登录
            </button>
            <button className="relative inline-flex h-9 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/30 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2">
              开始使用
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 