import Link from 'next/link';
import { useState, useCallback } from 'react';

// 定义导航模块的类型
export interface NavModule {
  id: string;
  name: string;
  icon: React.ReactNode;
  href: string;
  active?: boolean;
}

interface SideNavProps {
  // 导航模块数据
  modules: NavModule[];
  // 主题色，用于定制不同页面的颜色风格
  theme?: 'rose' | 'indigo' | 'emerald' | 'default';
  // 自定义类名，用于覆盖默认样式
  className?: string;
}

export function SideNav({ 
  modules,
  theme = 'default',
  className = ''
}: SideNavProps) {
  // 控制导航栏的展开状态
  const [isExpanded, setIsExpanded] = useState(false);

  // 优化性能：使用 useCallback 缓存事件处理函数
  const handleMouseEnter = useCallback(() => {
    setIsExpanded(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsExpanded(false);
  }, []);

  // 主题颜色配置
  const themeColors = {
    rose: {
      activeText: 'text-rose-600',
      activeBg: 'bg-rose-50',
      hoverText: 'hover:text-rose-600',
      hoverBg: 'hover:bg-rose-50/50'
    },
    indigo: {
      activeText: 'text-indigo-600',
      activeBg: 'bg-indigo-50',
      hoverText: 'hover:text-indigo-600',
      hoverBg: 'hover:bg-indigo-50/50'
    },
    emerald: {
      activeText: 'text-emerald-600',
      activeBg: 'bg-emerald-50',
      hoverText: 'hover:text-emerald-600',
      hoverBg: 'hover:bg-emerald-50/50'
    },
    default: {
      activeText: 'text-gray-900',
      activeBg: 'bg-gray-50',
      hoverText: 'hover:text-gray-900',
      hoverBg: 'hover:bg-gray-50/50'
    }
  };

  const colors = themeColors[theme];

  return (
    <nav 
      className={`fixed left-5 top-1/2 -translate-y-1/2 z-40 transition-all duration-300 ease-in-out ${isExpanded ? 'w-40' : 'w-12'} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-md ring-1 ring-gray-900/5 p-1.5 transition-all duration-300 hover:shadow-lg hover:bg-white/95">
        <div className="space-y-1">
          {modules.map((module) => (
            <Link
              key={module.id}
              href={module.href}
              className={`flex items-center gap-2.5 px-2.5 py-2 rounded-xl transition-all duration-200 group relative ${
                module.active
                  ? `text-gray-600 ${colors.activeText} ${colors.activeBg}`
                  : `text-gray-600 ${colors.hoverText} ${colors.hoverBg}`
              }`}
            >
              <span className="flex-shrink-0 transition-all duration-200 group-hover:scale-110 group-active:scale-95">
                {module.icon}
              </span>
              <span 
                className={`text-sm font-medium truncate transition-all duration-200 ${
                  isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                }`}
              >
                {module.name}
              </span>
              {module.active && (
                <div className={`absolute inset-y-1 left-0 w-0.5 ${colors.activeBg} rounded-full transition-all duration-200`} />
              )}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
} 