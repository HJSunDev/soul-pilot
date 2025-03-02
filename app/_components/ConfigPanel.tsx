import { useState, useRef, useEffect } from 'react';

interface ConfigPanelProps {
  theme?: 'rose' | 'indigo' | 'default';
  onConfigChange?: (configType: string, value: any) => void;
}

export function ConfigPanel({
  theme = 'default',
  onConfigChange
}: ConfigPanelProps) {
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  
  // 添加点击外部关闭面板的功能
  const configPanelRef = useRef<HTMLDivElement>(null);
  const configButtonRef = useRef<HTMLButtonElement>(null);

  // 根据主题获取对应的颜色配置
  const themeColors = {
    rose: {
      accent: 'rose-500',
      hover: 'hover:bg-rose-50',
      active: 'active:bg-rose-100',
      text: 'text-rose-500',
      bg: 'bg-rose-500',
      border: 'border-rose-200',
      highlight: 'bg-rose-50',
    },
    indigo: {
      accent: 'indigo-500',
      hover: 'hover:bg-indigo-50',
      active: 'active:bg-indigo-100',
      text: 'text-indigo-500',
      bg: 'bg-indigo-500',
      border: 'border-indigo-200',
      highlight: 'bg-indigo-50',
    },
    default: {
      accent: 'gray-500',
      hover: 'hover:bg-gray-50',
      active: 'active:bg-gray-100',
      text: 'text-gray-500',
      bg: 'bg-gray-500',
      border: 'border-gray-200',
      highlight: 'bg-gray-50',
    }
  };

  const colors = themeColors[theme === 'rose' ? 'rose' : theme === 'indigo' ? 'indigo' : 'default'];

  // 处理配置变更
  const handleConfigChange = (configType: string, value: any) => {
    if (onConfigChange) {
      onConfigChange(configType, value);
    }
  };

  // 点击外部关闭面板
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (configPanelRef.current && !configPanelRef.current.contains(event.target as Node) && 
          !(configButtonRef.current && configButtonRef.current.contains(event.target as Node))) {
        setIsConfigOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <button 
        ref={configButtonRef}
        onClick={() => setIsConfigOpen(!isConfigOpen)}
        className={`flex items-center justify-center p-2 rounded-full bg-white/90 shadow-sm ring-1 ring-gray-900/5 ${colors.hover} ${colors.active} transition-all duration-200`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-5 h-5 ${colors.text}`}>
          <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" clipRule="evenodd" />
        </svg>
      </button>

      {/* 配置面板 */}
      {isConfigOpen && (
        <div 
          ref={configPanelRef}
          className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl ring-1 ring-black/5 divide-y divide-gray-100 z-50"
        >
          <div className="px-4 py-3">
            <h3 className="text-sm font-medium text-gray-900">系统设置</h3>
            <p className="text-xs text-gray-500 mt-1">自定义您的使用体验</p>
          </div>

          {/* 设置项列表 */}
          <div className="py-2">
            {/* 主题设置 */}
            <button 
              onClick={() => handleConfigChange('theme', 'light')}
              className={`w-full flex justify-between items-center px-4 py-2.5 text-sm text-gray-700 ${colors.hover}`}
            >
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-4 h-4 mr-2 ${colors.text}`}>
                  <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                </svg>
                外观
              </div>
              <div className="flex items-center">
                <span className="text-xs text-gray-500 mr-2">浅色</span>
                <div className="w-8 h-4 bg-gray-200 rounded-full relative">
                  <div className="absolute left-0.5 top-0.5 w-3 h-3 bg-white rounded-full shadow"></div>
                </div>
              </div>
            </button>
            
            {/* 隐私设置 */}
            <button 
              onClick={() => handleConfigChange('privacy', {})}
              className={`w-full flex justify-between items-center px-4 py-2.5 text-sm text-gray-700 ${colors.hover}`}
            >
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-4 h-4 mr-2 ${colors.text}`}>
                  <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
                </svg>
                隐私
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-400">
                <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 011.06 0L10 11.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 9.28a.75.75 0 010-1.06z" clipRule="evenodd" />
              </svg>
            </button>
            
            {/* 通知设置 */}
            <button 
              onClick={() => handleConfigChange('notification', {})}
              className={`w-full flex justify-between items-center px-4 py-2.5 text-sm text-gray-700 ${colors.hover}`}
            >
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-4 h-4 mr-2 ${colors.text}`}>
                  <path d="M5.85 3.5a.75.75 0 00-1.117-1 9.719 9.719 0 00-2.348 4.876.75.75 0 001.479.248A8.219 8.219 0 015.85 3.5zM19.267 2.5a.75.75 0 10-1.118 1 8.22 8.22 0 011.987 4.124.75.75 0 001.48-.248A9.72 9.72 0 0019.266 2.5z" />
                  <path fillRule="evenodd" d="M12 2.25A6.75 6.75 0 005.25 9v.75a8.217 8.217 0 01-2.119 5.52.75.75 0 00.298 1.206c1.544.57 3.16.99 4.831 1.243a3.75 3.75 0 107.48 0 24.583 24.583 0 004.83-1.244.75.75 0 00.298-1.205 8.217 8.217 0 01-2.118-5.52V9A6.75 6.75 0 0012 2.25zM9.75 18c0-.034 0-.067.002-.1a25.05 25.05 0 004.496 0l.002.1a2.25 2.25 0 11-4.5 0z" clipRule="evenodd" />
                </svg>
                通知
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-400">
                <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 011.06 0L10 11.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 9.28a.75.75 0 010-1.06z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 