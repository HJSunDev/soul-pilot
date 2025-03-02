import { BackHomeButton } from './BackHomeButton';

interface NavbarProps {
  // 主题色，用于定制不同页面的颜色风格
  theme?: 'rose' | 'indigo' | 'default';
  // 自定义类名，用于覆盖默认样式
  className?: string;
}

export function Navbar({
  theme = 'default',
  className = ''
}: NavbarProps) {
  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 h-16  bg-transparent  ${className}`}>
      <div className="w-full sm:px-6 lg:px-8 h-full flex ">
        {/* 左侧区域 - 返回主页按钮 */}
        <div className="flex items-center">
          <BackHomeButton theme={theme} className="ml-1" />
        </div>
        
        {/* 右侧功能区 */}
        <div className="flex items-center space-x-3">
          

        </div>
      </div>
    </nav>
  );
} 