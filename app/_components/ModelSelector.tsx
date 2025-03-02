import { useState, useRef, useEffect } from 'react';

interface ModelSelectorProps {
  theme?: 'rose' | 'indigo' | 'default';
  onModelSelect?: (provider: string, modelId: string, modelName: string) => void;
}

interface ModelProvider {
  id: string;
  name: string;
  models: Model[];
  apiKey?: string;
  needsKey: boolean;
  website?: string;
}

interface Model {
  id: string;
  name: string;
  description: string;
}

export function ModelSelector({
  theme = 'default',
  onModelSelect
}: ModelSelectorProps) {
  const [showModelPanel, setShowModelPanel] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState('default');
  const [selectedModel, setSelectedModel] = useState('GPT-4');
  const [showOpenRouterKey, setShowOpenRouterKey] = useState(false);
  const [showSiliconFlowKey, setShowSiliconFlowKey] = useState(false);
  
  // 添加点击外部关闭面板的功能
  const modelPanelRef = useRef<HTMLDivElement>(null);
  const modelButtonRef = useRef<HTMLDivElement>(null);

  // 模型提供商列表
  const modelProviders: ModelProvider[] = [
    {
      id: 'openrouter',
      name: 'OpenRouter',
      needsKey: true,
      apiKey: '••••••••••••••••',
      website: 'https://openrouter.ai',
      models: [
        { id: 'openai/gpt-4-turbo', name: 'GPT-4 Turbo', description: 'OpenAI最新的大型模型' },
        { id: 'anthropic/claude-3-opus', name: 'Claude 3 Opus', description: 'Anthropic最强大的模型' },
        { id: 'anthropic/claude-3-sonnet', name: 'Claude 3 Sonnet', description: '平衡性能和速度' },
        { id: 'google/gemini-pro', name: 'Gemini Pro', description: 'Google的高级多模态模型' },
        { id: 'mistral/mistral-large', name: 'Mistral Large', description: 'Mistral AI的高性能大型语言模型' },
        { id: 'meta/llama-3-70b', name: 'Llama 3 70B', description: 'Meta最新的开源大型语言模型' }
      ]
    },
    {
      id: 'siliconflow',
      name: '硅基流动',
      needsKey: true,
      apiKey: '••••••••••••••••',
      website: 'https://www.siliconflow.cn',
      models: [
        { id: 'sf/yi-34b', name: 'Yi-34B', description: '01AI开源大模型' },
        { id: 'sf/qwen-72b', name: 'Qwen-72B', description: '阿里通义千问大模型' },
        { id: 'sf/llama3-70b', name: 'Llama3-70B', description: 'Meta最新开源模型' },
        { id: 'sf/mixtral-8x7b', name: 'Mixtral-8x7B', description: 'Mistral AI的混合专家模型' }
      ]
    },
    {
      id: 'default',
      name: '默认模型',
      needsKey: false,
      models: [
        { id: 'gpt4', name: 'GPT-4', description: '最强大的通用模型' },
        { id: 'gpt35', name: 'GPT-3.5', description: '快速且经济的选择' },
        { id: 'claude', name: 'Claude', description: '擅长长文本理解' },
        { id: 'gemini', name: 'Gemini', description: '谷歌的多模态模型' }
      ]
    }
  ];

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
      light: 'rose-100',
      lighter: 'rose-50',
    },
    indigo: {
      accent: 'indigo-500',
      hover: 'hover:bg-indigo-50',
      active: 'active:bg-indigo-100',
      text: 'text-indigo-500',
      bg: 'bg-indigo-500',
      border: 'border-indigo-200',
      highlight: 'bg-indigo-50',
      light: 'indigo-100',
      lighter: 'indigo-50',
    },
    default: {
      accent: 'gray-500',
      hover: 'hover:bg-gray-50',
      active: 'active:bg-gray-100',
      text: 'text-gray-500',
      bg: 'bg-gray-500',
      border: 'border-gray-200',
      highlight: 'bg-gray-50',
      light: 'gray-100',
      lighter: 'gray-50',
    }
  };

  const colors = themeColors[theme === 'rose' ? 'rose' : theme === 'indigo' ? 'indigo' : 'default'];

  // 获取当前选择的提供商
  const currentProvider = modelProviders.find(p => p.id === selectedProvider) || modelProviders[2];

  // 选择模型
  const handleSelectModel = (providerId: string, modelId: string, modelName: string) => {
    setSelectedProvider(providerId);
    setSelectedModel(modelName);
    setShowModelPanel(false);
    
    // 调用父组件的回调函数
    if (onModelSelect) {
      onModelSelect(providerId, modelId, modelName);
    }
  };

  // 处理API Key更新
  const handleApiKeyChange = (providerId: string, value: string) => {
    // 在实际应用中，这里应该更新状态并保存到数据库或本地存储
    console.log(`更新${providerId}的API Key:`, value);
  };

  // 保存API Key
  const handleSaveApiKey = (providerId: string, value: string) => {
    console.log(`保存${providerId}的API Key:`, value);
    // 显示保存成功的提示
  };

  // 点击外部关闭面板
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (showModelPanel && modelPanelRef.current && !modelPanelRef.current.contains(event.target as Node) &&
          !(modelButtonRef.current && modelButtonRef.current.contains(event.target as Node))) {
        setShowModelPanel(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showModelPanel]);

  // 切换API Key显示状态
  const toggleKeyVisibility = (provider: string) => {
    if (provider === 'openrouter') {
      setShowOpenRouterKey(!showOpenRouterKey);
    } else if (provider === 'siliconflow') {
      setShowSiliconFlowKey(!showSiliconFlowKey);
    }
  };

  // 切换模型面板的显示
  const toggleModelPanel = () => {
    setShowModelPanel(!showModelPanel);
  };

  return (
    <div className="flex items-center relative">
      {/* 模型选择按钮 */}
      <div 
        className={`flex items-center py-1.5 px-3 rounded-full bg-white/90 shadow-sm ring-1 ring-gray-900/5 cursor-pointer hover:shadow-md transition-all duration-200 ${colors.hover}`}
        onClick={toggleModelPanel}
        ref={modelButtonRef}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-4 h-4 mr-2 ${colors.text}`}>
          <path d="M16.5 7.5h-9v9h9v-9z" />
          <path fillRule="evenodd" d="M8.25 2.25A.75.75 0 019 3v.75h2.25V3a.75.75 0 011.5 0v.75H15V3a.75.75 0 011.5 0v.75h.75a3 3 0 013 3v.75H21A.75.75 0 0121 9h-.75v2.25H21a.75.75 0 010 1.5h-.75V15H21a.75.75 0 010 1.5h-.75v.75a3 3 0 01-3 3h-.75V21a.75.75 0 01-1.5 0v-.75h-2.25V21a.75.75 0 01-1.5 0v-.75H9V21a.75.75 0 01-1.5 0v-.75h-.75a3 3 0 01-3-3v-.75H3A.75.75 0 013 15h.75v-2.25H3a.75.75 0 010-1.5h.75V9H3a.75.75 0 010-1.5h.75v-.75a3 3 0 013-3h.75V3a.75.75 0 01.75-.75zM6 6.75A.75.75 0 016.75 6h10.5a.75.75 0 01.75.75v10.5a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V6.75z" clipRule="evenodd" />
        </svg>
        <span className="text-sm font-medium text-gray-700">{selectedModel}</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 ml-1 text-gray-400">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </div>
      
      {/* 模型选择面板 - 优化后的UI */}
      {showModelPanel && (
        <div 
          ref={modelPanelRef}
          className="absolute right-0 top-12 w-[640px] bg-white rounded-xl shadow-2xl ring-1 ring-black/5 z-50 overflow-hidden transform translate-x-[-10%]"
          style={{height: '28rem'}}
        >
          {/* 面板头部 - 简化设计 */}
          <div className="px-5 py-3 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-sm font-medium text-gray-900">选择AI模型</h3>
            <button 
              onClick={() => setShowModelPanel(false)} 
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* 主要内容区 - 使用网格布局替代三列 */}
          <div className="p-4 overflow-y-auto custom-scrollbar" style={{height: 'calc(28rem - 3rem)'}}>
            <div className="grid grid-cols-3 gap-4 h-full">
              {modelProviders.map((provider) => (
                <div key={provider.id} className={`rounded-lg border ${selectedProvider === provider.id ? `border-${colors.accent}/40` : 'border-gray-100'} overflow-hidden transition-all duration-200 hover:shadow-md flex flex-col h-full`}>
                  {/* 提供商标题 - 更紧凑的设计 */}
                  <div className={`flex items-center justify-between px-3 py-2 ${selectedProvider === provider.id ? `bg-${colors.lighter}` : 'bg-gray-50'}`}>
                    <h4 className={`text-xs font-medium ${selectedProvider === provider.id ? `text-${colors.accent}` : 'text-gray-700'}`}>
                      {provider.name}
                    </h4>
                    {selectedProvider === provider.id && (
                      <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-${colors.accent} text-white`}>
                        当前
                      </span>
                    )}
                  </div>
                  
                  {/* API Key 输入区域 - 更紧凑的设计 */}
                  {provider.needsKey && (
                    <div className="px-3 py-2 border-b border-gray-100">
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-medium text-gray-700">API Key</label>
                        <button 
                          onClick={() => toggleKeyVisibility(provider.id)}
                          className="text-[10px] text-gray-500 hover:text-gray-700 flex items-center"
                        >
                          {(provider.id === 'openrouter' && showOpenRouterKey) || 
                           (provider.id === 'siliconflow' && showSiliconFlowKey) ? (
                            <>
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 mr-0.5">
                                <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                                <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                              </svg>
                              隐藏
                            </>
                          ) : (
                            <>
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 mr-0.5">
                                <path fillRule="evenodd" d="M3.28 2.22a.75.75 0 00-1.06 1.06l14.5 14.5a.75.75 0 101.06-1.06l-1.745-1.745a10.029 10.029 0 003.3-4.38 1.651 1.651 0 000-1.185A10.004 10.004 0 009.999 3a9.956 9.956 0 00-4.744 1.194L3.28 2.22zM7.752 6.69l1.092 1.092a2.5 2.5 0 013.374 3.373l1.091 1.092a4 4 0 00-5.557-5.557z" clipRule="evenodd" />
                                <path d="M10.748 13.93l2.523 2.523a9.987 9.987 0 01-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 010-1.186A10.007 10.007 0 012.839 6.02L6.07 9.252a4 4 0 004.678 4.678z" />
                              </svg>
                              显示
                            </>
                          )}
                        </button>
                      </div>
                      <div className="flex">
                        <input 
                          type={(provider.id === 'openrouter' && showOpenRouterKey) || 
                               (provider.id === 'siliconflow' && showSiliconFlowKey) ? 'text' : 'password'} 
                          value={provider.apiKey || ''}
                          onChange={(e) => handleApiKeyChange(provider.id, e.target.value)}
                          placeholder="输入API Key"
                          className="w-full text-xs px-2 py-1.5 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <button 
                          onClick={() => handleSaveApiKey(provider.id, provider.apiKey || '')}
                          className={`px-2 py-1.5 bg-${colors.accent}/10 border border-l-0 border-${colors.accent}/30 rounded-r-md text-xs font-medium text-${colors.accent} hover:bg-${colors.accent}/20 transition-colors`}
                        >
                          保存
                        </button>
                      </div>
                      
                      {/* 服务商网站链接 - 更紧凑的设计 */}
                      <div className="flex justify-between items-center mt-1.5">
                        <p className="text-[10px] text-gray-500">
                          获取API Key:
                        </p>
                        <a 
                          href={provider.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={`text-[10px] text-${colors.accent} hover:underline flex items-center`}
                        >
                          访问官网
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-2.5 h-2.5 ml-0.5">
                            <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z" clipRule="evenodd" />
                            <path fillRule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" clipRule="evenodd" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  )}
                  
                  {/* 模型列表 - 固定高度，确保滚动 */}
                  <div className="overflow-y-auto custom-scrollbar px-2 py-2 flex-1">
                    <div className="space-y-1.5">
                      {provider.models.map((model) => (
                        <button
                          key={model.id}
                          onClick={() => handleSelectModel(provider.id, model.id, model.name)}
                          className={`w-full flex flex-col px-3 py-2 rounded-md text-left transition-all duration-200 ${
                            selectedProvider === provider.id && selectedModel === model.name 
                              ? `bg-${colors.accent}/10 border border-${colors.accent}/30` 
                              : 'hover:bg-gray-50 border border-transparent'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className={`text-xs font-medium ${selectedProvider === provider.id && selectedModel === model.name ? `text-${colors.accent}` : 'text-gray-800'}`}>
                              {model.name}
                            </span>
                            
                            {selectedProvider === provider.id && selectedModel === model.name && (
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`w-4 h-4 text-${colors.accent}`}>
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                          <p className="text-[10px] text-gray-500 mt-0.5 line-clamp-2">{model.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 