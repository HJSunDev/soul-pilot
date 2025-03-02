import { BackHomeButton } from './BackHomeButton';
import { UserButton, useUser } from "@clerk/nextjs";
import { useState } from 'react';
import { ModelSelector } from './ModelSelector';
import { ConfigPanel } from './ConfigPanel';

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
  const { isSignedIn } = useUser();
  const [selectedProvider, setSelectedProvider] = useState('default');
  const [selectedModel, setSelectedModel] = useState('GPT-4');

  // 处理模型选择
  const handleModelSelect = (providerId: string, modelId: string, modelName: string) => {
    setSelectedProvider(providerId);
    setSelectedModel(modelName);
  };

  // 处理配置变更
  const handleConfigChange = (configType: string, value: any) => {
    console.log(`配置变更: ${configType}`, value);
    // 在这里处理配置变更，例如更新状态或调用API
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 h-16 bg-transparent ${className}`}>
      <div className="w-full sm:px-6 lg:px-8 h-full flex justify-between">
        {/* 左侧区域 - 返回主页按钮 */}
        <div className="flex items-center">
          <BackHomeButton theme={theme} className="ml-1" />
        </div>
        
        {/* 右侧功能区 */}
        <div className="flex items-center space-x-3 mr-4">
          {/* 模型选择器组件 */}
          <ModelSelector 
            theme={theme} 
            onModelSelect={handleModelSelect} 
          />

          {/* 配置面板组件 */}
          {/* <ConfigPanel 
            theme={theme}
            onConfigChange={handleConfigChange}
          /> */}

          {/* Clerk用户头像 */}
          {isSignedIn && (
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8",
                  userButtonPopoverCard: "shadow-lg",
                  userButtonPopoverFooter: "hidden"
                }
              }}
            />
          )}
        </div>
      </div>
    </nav>
  );
} 