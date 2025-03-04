import { useState, useRef, useEffect, useCallback } from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { debounce } from 'lodash';

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
  isRecommended: boolean;
  isFree: boolean;
}

export function ModelSelector({
  theme = 'default',
  onModelSelect
}: ModelSelectorProps) {
  const [showModelPanel, setShowModelPanel] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState('free');
  const [selectedModel, setSelectedModel] = useState('DeepSeek Chat 免费版');
  const [selectedModelId, setSelectedModelId] = useState('');
  const [showOpenRouterKey, setShowOpenRouterKey] = useState(false);
  const [showSiliconFlowKey, setShowSiliconFlowKey] = useState(false);
  const [apiKeys, setApiKeys] = useState<{[key: string]: string}>({
    openrouter: '',
    siliconflow: ''
  });
  
  // 添加点击外部关闭面板的功能
  const modelPanelRef = useRef<HTMLDivElement>(null);
  const modelButtonRef = useRef<HTMLDivElement>(null);

  // 获取模型数据
  const modelsByProvider = useQuery(api.advisor.queries.getModelsByProvider);

  // 从本地存储加载API Key
  useEffect(() => {
    const loadApiKeys = () => {
      try {
        const storedOpenRouterKey = localStorage.getItem('soul_pilot_openrouter_key');
        const storedSiliconFlowKey = localStorage.getItem('soul_pilot_siliconflow_key');
        
        setApiKeys({
          openrouter: storedOpenRouterKey || '',
          siliconflow: storedSiliconFlowKey || ''
        });
      } catch (error) {
        console.error('无法从本地存储加载API Key:', error);
      }
    };
    
    loadApiKeys();
  }, []);

  // 保存API Key到本地存储
  const saveApiKeyToLocalStorage = useCallback((providerId: string, value: string) => {
    try {
      if (providerId === 'openrouter') {
        localStorage.setItem('soul_pilot_openrouter_key', value);
      } else if (providerId === 'siliconflow') {
        localStorage.setItem('soul_pilot_siliconflow_key', value);
      }
    } catch (error) {
      console.error(`保存${providerId}的API Key到本地存储时出错:`, error);
    }
  }, []);

  // 使用lodash的debounce创建防抖保存函数
  const debouncedSave = useCallback(
    debounce(saveApiKeyToLocalStorage, 500),
    [saveApiKeyToLocalStorage]
  );

  // 处理API Key更新
  const handleApiKeyChange = useCallback((providerId: string, value: string) => {
    setApiKeys(prev => ({
      ...prev,
      [providerId]: value
    }));
    
    // 使用lodash的debounce函数延迟保存
    debouncedSave(providerId, value);
  }, [debouncedSave]);

  // 组件卸载时取消未执行的防抖函数
  useEffect(() => {
    return () => {
      debouncedSave.cancel();
    };
  }, [debouncedSave]);

  // 模型提供商列表
  const modelProviders: ModelProvider[] = [
    {
      id: 'openrouter',
      name: 'OpenRouter',
      needsKey: true,
      apiKey: apiKeys.openrouter || '••••••••••••••••',
      website: 'https://openrouter.ai',
      models: modelsByProvider ? Object.entries(modelsByProvider.openrouter || {}).map(([id, config]) => ({
        id,
        name: config.modelName,
        description: config.description,
        isRecommended: config.isRecommended,
        isFree: config.isFree
      })) : []
    },
    {
      id: 'siliconflow',
      name: '硅基流动',
      needsKey: true,
      apiKey: apiKeys.siliconflow || '••••••••••••••••',
      website: 'https://www.siliconflow.cn',
      models: modelsByProvider ? Object.entries(modelsByProvider.siliconflow || {}).map(([id, config]) => ({
        id,
        name: config.modelName,
        description: config.description,
        isRecommended: config.isRecommended,
        isFree: config.isFree
      })) : []
    },
    {
      id: 'free',
      name: '免费模型',
      needsKey: false,
      models: modelsByProvider ? Object.entries(modelsByProvider.free || {}).map(([id, config]) => ({
        id,
        name: config.modelName,
        description: config.description,
        isRecommended: config.isRecommended,
        isFree: config.isFree
      })) : []
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
    setSelectedModelId(modelId);
    setShowModelPanel(false);
    
    // 调用父组件的回调函数
    if (onModelSelect) {
      onModelSelect(providerId, modelId, modelName);
    }
  };

  // 切换API Key显示状态
  const toggleKeyVisibility = (provider: string) => {
    if (provider === 'openrouter') {
      setShowOpenRouterKey(!showOpenRouterKey);
    } else if (provider === 'siliconflow') {
      setShowSiliconFlowKey(!showSiliconFlowKey);
    }
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

  // 切换模型面板的显示
  const toggleModelPanel = () => {
    setShowModelPanel(!showModelPanel);
  };

  // 如果模型数据还在加载中
  if (!modelsByProvider) {
    return (
      <div className="flex items-center relative">
        <div className={`flex items-center py-1.5 px-3 rounded-full bg-white/90 shadow-sm ring-1 ring-gray-900/5 cursor-pointer ${colors.hover}`}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-4 h-4 mr-2 ${colors.text}`}>
            <path d="M16.5 7.5h-9v9h9v-9z" />
            <path fillRule="evenodd" d="M8.25 2.25A.75.75 0 019 3v.75h2.25V3a.75.75 0 011.5 0v.75H15V3a.75.75 0 011.5 0v.75h.75a3 3 0 013 3v.75H21A.75.75 0 0121 9h-.75v2.25H21a.75.75 0 010 1.5h-.75V15H21a.75.75 0 010 1.5h-.75v.75a3 3 0 01-3 3h-.75V21a.75.75 0 01-1.5 0v-.75h-2.25V21a.75.75 0 01-1.5 0v-.75H9V21a.75.75 0 01-1.5 0v-.75h-.75a3 3 0 01-3-3v-.75H3A.75.75 0 013 15h.75v-2.25H3a.75.75 0 010-1.5h.75V9H3a.75.75 0 010-1.5h.75v-.75a3 3 0 013-3h.75V3a.75.75 0 01.75-.75zM6 6.75A.75.75 0 016.75 6h10.5a.75.75 0 01.75.75v10.5a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V6.75z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-medium text-gray-700">加载中...</span>
        </div>
      </div>
    );
  }

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
            <div className="flex items-center">
              <h3 className="text-sm font-medium text-gray-900">选择AI模型</h3>
              {/* 安全提示直接显示在标题栏 */}
              <div className="flex items-center ml-3 text-[10px] text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 mr-1 text-gray-400 flex-shrink-0">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
                </svg>
                <span>API密钥仅存储在本地浏览器中</span>
              </div>
            </div>
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
                <div key={provider.id} className="rounded-lg border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md flex flex-col h-full">
                  {/* 提供商标题 - 更紧凑的设计 */}
                  <div className={`flex items-center justify-between px-3 py-2 bg-gray-50 border-b border-gray-200`}>
                    <h4 className="text-xs font-medium text-gray-700">
                      {provider.name}
                    </h4>
                    {provider.needsKey && (
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
                    )}
                  </div>
                  
                  {/* API Key 输入区域 - 更紧凑的设计，移除保存按钮 */}
                  {provider.needsKey && (
                    <div className="px-3 py-2 border-b border-gray-200 bg-gray-50/50">
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-medium text-gray-700">API Key</label>
                        {provider.website && (
                          <a 
                            href={provider.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[10px] text-blue-500 hover:underline flex items-center"
                          >
                            获取API Key
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-2.5 h-2.5 ml-0.5">
                              <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z" clipRule="evenodd" />
                              <path fillRule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" clipRule="evenodd" />
                            </svg>
                          </a>
                        )}
                      </div>
                      <div className="relative">
                        <input 
                          type={(provider.id === 'openrouter' && showOpenRouterKey) || 
                               (provider.id === 'siliconflow' && showSiliconFlowKey) ? 'text' : 'password'} 
                          value={apiKeys[provider.id] || ''}
                          onChange={(e) => handleApiKeyChange(provider.id, e.target.value)}
                          placeholder="输入API Key后自动保存到本地"
                          className="w-full text-xs px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder:text-[10px]"
                        />
                        {apiKeys[provider.id] && (
                          <div className="absolute right-0 inset-y-0 flex items-center pr-2">
                            <span className="inline-flex items-center px-1 py-0.5 rounded-full text-[9px] font-medium bg-green-100 text-green-700">
                              已保存
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* 模型列表 - 固定高度，确保滚动，增强模型之间的分界线 */}
                  <div className="overflow-y-auto custom-scrollbar flex-1 bg-white">
                    <div className="py-1">
                      {provider.models.map((model, index) => {
                        const isSelected = selectedProvider === provider.id && selectedModel === model.name;
                        
                        // 根据主题获取颜色
                        const bgColor = theme === 'rose'
                          ? 'rgba(255, 241, 242, 0.6)'
                          : theme === 'indigo'
                            ? 'rgba(238, 242, 255, 0.6)'
                            : 'rgba(249, 250, 251, 0.6)';
                        
                        const accentColor = theme === 'rose'
                          ? 'rgb(225, 29, 72)' // rose-600
                          : theme === 'indigo'
                            ? 'rgb(79, 70, 229)' // indigo-600
                            : 'rgb(75, 85, 99)'; // gray-600
                            
                        return (
                          <div key={model.id} className={index !== 0 ? "border-t border-gray-100" : ""}>
                            <button
                              onClick={() => handleSelectModel(provider.id, model.id, model.name)}
                              className={`w-full flex flex-col px-3 py-2.5 text-left transition-all duration-300 relative ${
                                isSelected ? '' : 'hover:bg-gray-50'
                              }`}
                              style={isSelected ? {
                                background: bgColor,
                              } : {}}
                            >
                              {/* 当前使用中的模型添加标识 */}
                              {isSelected && (
                                <div 
                                  className="absolute top-0 left-0 px-1 py-[1px] text-[8px] font-medium rounded-br-md"
                                  style={{ 
                                    backgroundColor: accentColor,
                                    color: 'white'
                                  }}
                                >
                                  使用中
                                </div>
                              )}
                              {/* 推荐模型添加标识 */}
                              {model.isRecommended && (
                                <div className="absolute top-0 right-[4px] px-1.5 py-[1px] text-[8px] font-medium rounded-md"
                                  style={{ 
                                    backgroundColor: '#2196F3', // 蓝色，表示推荐，更加醒目且专业
                                    color: 'white'
                                  }}
                                >
                                  推荐
                                </div>
                              )}
                              {/* 免费模型标签 */}
                              {model.isFree && (
                                <div className="absolute top-0 px-1.5 py-[1px] text-[8px] font-medium rounded-md"
                                  style={{ 
                                    backgroundColor: '#4CAF50', // 绿色，表示免费
                                    color: 'white',
                                    right: model.isRecommended ? '40px' : '4px'
                                  }}
                                >
                                  免费
                                </div>
                              )}

                              <div className="flex items-center">
                                <span className={`text-xs font-medium truncate ${
                                  isSelected
                                    ? theme === 'rose'
                                      ? 'text-rose-700'
                                      : theme === 'indigo'
                                        ? 'text-indigo-700'
                                        : 'text-gray-700'
                                    : 'text-gray-800'
                                }`}>
                                  {model.name}
                                </span>
                              </div>
                              <p className="text-[9px] text-gray-500 mt-1 line-clamp-2 leading-relaxed">{model.description}</p>
                            </button>
                          </div>
                        );
                      })}
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