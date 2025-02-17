import Link from 'next/link';

interface BackHomeButtonProps {
  // 主题色，用于定制不同页面的颜色风格
  theme?: 'rose' | 'indigo' | 'default';
  // 自定义类名，用于覆盖默认样式
  className?: string;
}

export function BackHomeButton({ 
  theme = 'default',
  className = ''
}: BackHomeButtonProps) {
  // 根据主题获取对应的颜色配置
  const themeColors = {
    rose: {
      accent: 'rose',
      shadow: 'shadow-rose-200/50',
      iconBg: 'bg-rose-500/[0.12]',
      iconText: 'text-rose-500',
      gradient: 'from-rose-500/0 via-rose-500/70 to-rose-500/0'
    },
    indigo: {
      accent: 'indigo',
      shadow: 'shadow-indigo-200/50',
      iconBg: 'bg-indigo-500/[0.12]',
      iconText: 'text-indigo-500',
      gradient: 'from-indigo-500/0 via-indigo-500/70 to-indigo-500/0'
    },
    default: {
      accent: 'gray',
      shadow: 'shadow-gray-200/50',
      iconBg: 'bg-gray-500/[0.12]',
      iconText: 'text-gray-500',
      gradient: 'from-gray-500/0 via-gray-500/70 to-gray-500/0'
    }
  };

  const colors = themeColors[theme];

  return (
    <div className={`fixed top-5 left-5 z-50 ${className}`}>
      <Link
        href="/"
        className={`group relative flex items-center gap-2 rounded-full bg-white/90 pl-2.5 pr-3.5 py-1.5 shadow-md ring-1 ring-gray-900/5 backdrop-blur-md transition-all duration-300 hover:bg-white hover:${colors.shadow} hover:-translate-y-0.5 active:translate-y-0 active:shadow-lg`}
      >
        <span className={`flex h-6 w-6 items-center justify-center rounded-full ${colors.iconBg} ${colors.iconText} transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110 group-active:scale-95`}>
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </span>
        <span className="text-sm font-medium text-gray-900">返回主页</span>
        <div className={`absolute inset-x-0 -bottom-px h-px bg-gradient-to-r ${colors.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />
      </Link>
    </div>
  );
} 