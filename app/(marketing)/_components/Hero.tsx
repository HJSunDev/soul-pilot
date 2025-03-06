'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { SignInButton, useUser } from "@clerk/nextjs";

// 自定义动画样式
const AnimationStyles = () => (
  <style jsx global>{`
    @keyframes scaleIn {
      0% { transform: scale(0.5); opacity: 0; }
      70% { transform: scale(1.1); }
      100% { transform: scale(1); opacity: 1; }
    }

    @keyframes fadeIn {
      0% { opacity: 0; transform: translateY(10px); }
      100% { opacity: 1; transform: translateY(0); }
    }

    @keyframes bounceIn {
      0% { transform: scale(0.8); opacity: 0; }
      50% { transform: scale(1.05); }
      70% { transform: scale(0.95); }
      100% { transform: scale(1); opacity: 1; }
    }

    .animate-scaleIn {
      animation: scaleIn 0.5s ease-out forwards;
    }

    .animate-fadeIn {
      animation: fadeIn 0.8s ease-out forwards;
    }

    .animate-bounceIn {
      animation: bounceIn 0.6s ease-out forwards;
    }
    
    /* 隐藏滚动条但保持滚动功能 */
    .hide-scrollbar {
      -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;     /* Firefox */
    }
    
    .hide-scrollbar::-webkit-scrollbar {
      display: none;             /* Chrome, Safari, Opera */
    }
  `}</style>
);

// Hero 部分组件
const Hero = () => {
  const { isSignedIn } = useUser();
  const [animationStep, setAnimationStep] = useState(0);
  const [showScenario, setShowScenario] = useState(false);
  const [scenarioTyping, setScenarioTyping] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [typingText, setTypingText] = useState('');
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [resetAnimation, setResetAnimation] = useState(false);
  // 添加进度状态
  const [progress, setProgress] = useState(0);
  
  // 滚动容器引用
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  // 结果区域引用
  const resultRef = useRef<HTMLDivElement>(null);
  // 分析过程引用
  const analysisRef = useRef<HTMLDivElement>(null);
  // 分析步骤引用数组
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 模拟分析过程的文本
  const scenarioText = "遇到职业选择困境，是继续现有工作还是追求新机会？";
  const analysisSteps = [
    { title: "情景分析", content: "分析当前情境与个人价值观的匹配度..." },
    { title: "情绪识别", content: "检测到焦虑与期待的混合情绪..." },
    { title: "价值观评估", content: "评估个人成长与稳定性的权衡..." },
    { title: "行动建议", content: "生成个性化行动方案..." }
  ];
  
  const resultText = "建议：根据您的价值观分析，追求新机会更符合您的长期发展目标。建议在保持现有工作的同时，投入20%时间探索新领域，降低风险的同时为转变做准备。";

  // 初始化步骤引用数组
  useEffect(() => {
    stepRefs.current = Array(analysisSteps.length).fill(null).map(() => null);
  }, []);

  // 通用滚动函数 - 滚动到指定元素
  const scrollToElement = (element: HTMLElement | null, offset = 20) => {
    if (!element || !scrollContainerRef.current) return;
    
    const containerTop = scrollContainerRef.current.getBoundingClientRect().top;
    const elementTop = element.getBoundingClientRect().top;
    const scrollOffset = elementTop - containerTop - offset;
    
    scrollContainerRef.current.scrollTo({
      top: scrollContainerRef.current.scrollTop + scrollOffset,
      behavior: 'smooth'
    });
  };

  // 滚动到容器顶部
  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  // 滚动到分析过程
  const scrollToAnalysis = () => {
    scrollToElement(analysisRef.current);
  };

  // 滚动到特定分析步骤
  const scrollToStep = (index: number) => {
    scrollToElement(stepRefs.current[index], 50);
  };

  // 滚动到结果区域
  const scrollToResult = () => {
    scrollToElement(resultRef.current);
  };

  // 情景输入打字效果
  useEffect(() => {
    if (resetAnimation) {
      setScenarioTyping('');
      setShowScenario(false);
      setAnimationStep(0);
      setShowResult(false);
      setTypingText('');
      setAnalysisComplete(false);
      setResetAnimation(false);
      setProgress(0);
      
      // 开始新的动画循环
      setTimeout(() => {
        setShowScenario(true);
        scrollToTop();
      }, 1000);
      return;
    }
    
    if (showScenario) {
      let i = 0;
      const typingInterval = setInterval(() => {
        if (i < scenarioText.length) {
          setScenarioTyping(scenarioText.substring(0, i + 1));
          i++;
        } else {
          clearInterval(typingInterval);
          setTimeout(() => {
            setAnimationStep(1);
            setProgress(25); // 第一步完成，进度25%
          }, 800);
        }
      }, 40);
      return () => clearInterval(typingInterval);
    }
  }, [showScenario, resetAnimation]);

  // 分析步骤动画
  useEffect(() => {
    if (animationStep === 1) {
      // 当分析过程开始时，滚动到分析区域
      setTimeout(() => {
        scrollToAnalysis();
      }, 300);
    } else if (animationStep > 1 && animationStep <= analysisSteps.length) {
      // 当新的分析步骤出现时，滚动到该步骤
      setTimeout(() => {
        scrollToStep(animationStep - 1);
      }, 300);
      
      // 更新进度
      setProgress(25 * animationStep);
    }
    
    if (animationStep > 0 && animationStep < analysisSteps.length) {
      const timer = setTimeout(() => {
        setAnimationStep(prev => prev + 1);
      }, 1500);
      return () => clearTimeout(timer);
    } else if (animationStep === analysisSteps.length && !showResult) {
      const timer = setTimeout(() => {
        setShowResult(true);
        // 在显示结果前，确保滚动到结果区域
        setTimeout(() => {
          scrollToResult();
        }, 300);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [animationStep, showResult]);

  // 结果打字效果
  useEffect(() => {
    if (showResult) {
      let i = 0;
      const typingInterval = setInterval(() => {
        if (i < resultText.length) {
          setTypingText(resultText.substring(0, i + 1));
          i++;
          
          // 更新进度
          const resultProgress = 100 - 25 + (25 * i / resultText.length);
          setProgress(Math.min(resultProgress, 99));
          
          // 每添加10个字符，滚动一次，确保视野跟随文本输入
          if (i % 10 === 0) {
            setTimeout(() => {
              scrollToResult();
            }, 50);
          }
        } else {
          clearInterval(typingInterval);
          setTimeout(() => {
            setAnalysisComplete(true);
            setProgress(100); // 完成，进度100%
            
            // 完成标志出现时，再次滚动确保可见
            setTimeout(() => {
              scrollToResult();
            }, 300);
          }, 500);
        }
      }, 30);
      return () => clearInterval(typingInterval);
    }
  }, [showResult]);

  // 初始启动动画
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowScenario(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // 统一的卡片样式
  const cardStyle = "bg-gradient-to-r from-indigo-50/80 via-white to-white rounded-xl border border-indigo-100/50 shadow-sm relative overflow-hidden group transition-all duration-700";
  const cardPadding = "p-4";
  const cardWidth = "w-full max-w-[28rem]";

  return (
    <div className="relative isolate h-screen flex items-center">
      {/* 添加自定义动画样式 */}
      <AnimationStyles />
      
      {/* 背景装饰 */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>

      <div className="mx-auto max-w-6xl px-6 lg:px-8 pt-14">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-12 lg:items-center">
          {/* 左侧文本内容 */}
          <div className="relative z-10">
            <div className="relative">
              <div className="absolute -top-4 -left-8 w-16 h-16 bg-indigo-100 rounded-full blur-2xl opacity-40"></div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                探索心灵的
                <span className="relative">
                  <span className="relative z-10">航行指南</span>
                  <div className="absolute bottom-0 left-0 right-0 h-2.5 bg-indigo-200/60 -rotate-1"></div>
                </span>
              </h1>
            </div>
            <p className="mt-6 text-base leading-7 text-gray-600 sm:text-lg">
              Soul Pilot 是您的心灵导航仪，帮助您在人生的旅途中找到方向。通过科学的方法和个性化的指导，让每一个人都能找到属于自己的成长道路。
            </p>
            <div className="mt-8 flex items-center gap-x-6">
              {isSignedIn ? (
                <Link
                  href="/advisor"
                  className="relative inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-full overflow-hidden shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-indigo-500/30 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="relative z-10">开始探索</span>
                  <div className="absolute inset-0 -z-10 bg-linear-to-r from-indigo-600 to-indigo-700 opacity-80"></div>
                </Link>
              ) : (
                <SignInButton mode="modal">
                  <button className="relative inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-full overflow-hidden shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-indigo-500/30 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span className="relative z-10">开始探索</span>
                    <div className="absolute inset-0 -z-10 bg-linear-to-r from-indigo-600 to-indigo-700 opacity-80"></div>
                  </button>
                </SignInButton>
              )}
              <Link 
                href="#features" 
                className="group text-sm font-semibold leading-7 text-gray-900 flex items-center gap-x-2 transition-all duration-300 hover:gap-x-3"
              >
                了解更多
                <span aria-hidden="true" className="text-indigo-600 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* 右侧分析动画 */}
          <div className="mt-12 lg:mt-0 relative">
            <div className="relative">
              {/* 背景光晕效果 */}
              <div className="absolute -top-4 -right-4 w-64 h-64 bg-indigo-50 rounded-full mix-blend-multiply blur-2xl opacity-70"></div>
              <div className="absolute -bottom-4 -left-4 w-64 h-64 bg-pink-50 rounded-full mix-blend-multiply blur-2xl opacity-70"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-purple-50 rounded-full mix-blend-multiply blur-xl opacity-50"></div>
              
              {/* 分析界面 */}
              <div className="relative">
                {/* 主卡片 */}
                <div className="aspect-[4/3] w-full rounded-2xl bg-gradient-to-br from-white via-white to-indigo-50 p-5 shadow-[0_10px_40px_-15px_rgba(79,70,229,0.2)] ring-1 ring-indigo-900/5 overflow-hidden backdrop-blur-sm">
                  {/* 界面网格背景 */}
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMwLTkuOTQtOC4wNi0xOC0xOC0xOFYyYzcuNzMyIDAgMTQgNi4yNjggMTQgMTRoMnptLTIgMGMwIDcuNzMyLTYuMjY4IDE0LTE0IDE0djJjOS45NCAwIDE4LTguMDYgMTgtMThoLTJ6IiBmaWxsPSIjNjM2NmYxIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz48cGF0aCBkPSJNNDAgMThIMjBWMGgyMHYxOHptMCA0MEgyMFYyMGgyMHYzOHptMjAgMEg0MFYyMGgyMHYzOHptMC0xOEg0MFYwaDIwdjIweiIgc3Ryb2tlPSIjNjM2NmYxIiBzdHJva2Utb3BhY2l0eT0iMC4wNSIvPjwvZz48L3N2Zz4=')] opacity-30"></div>
                  
                  {/* 顶部状态栏 */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center space-x-2">
                      <div className="h-3 w-3 rounded-full bg-red-400 shadow-[0_0_10px_rgba(248,113,113,0.5)]"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)]"></div>
                      <div className="h-3 w-3 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)]"></div>
                    </div>
                    <div className="text-xs font-medium text-indigo-600 bg-gradient-to-r from-indigo-50 to-white px-3 py-1 rounded-full shadow-sm border border-indigo-100/50">SoulPilot Analysis v1.0</div>
                  </div>
                  
                  {/* 进度条 */}
                  <div className="w-full h-1 bg-gray-100 rounded-full mb-4 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-700 ease-out"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  
                  {/* 内容区域 - 添加滚动容器 */}
                  <div 
                    ref={scrollContainerRef}
                    className="h-full w-full rounded-xl bg-white/90 p-5 backdrop-blur-sm border border-indigo-100/50 flex flex-col space-y-4 text-sm shadow-[0_4px_20px_-8px_rgba(79,70,229,0.15)] overflow-y-auto scroll-smooth hide-scrollbar"
                    style={{ maxHeight: "calc(100% - 40px)" }}
                  >
                    {/* 动态内容容器 - 使用绝对定位和动画来实现平滑过渡 */}
                    <div className="relative flex flex-col items-center">
                      {/* 情景输入 - 动态显示 */}
                      <div 
                        className={`${cardStyle} ${cardPadding} ${cardWidth}
                        ${showScenario ? 'opacity-100 transform-none' : 'opacity-0 -translate-y-4'}`}
                      >
                        {/* 装饰元素 */}
                        <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-100/20 rounded-full -translate-x-5 -translate-y-10 group-hover:bg-indigo-100/30 transition-all duration-500"></div>
                        
                        <div className="flex items-center mb-2.5">
                          <div className="w-1 h-5 bg-gradient-to-b from-indigo-400 to-indigo-600 rounded-full mr-3"></div>
                          <div className="text-indigo-700 font-semibold tracking-wide">情景输入</div>
                        </div>
                        <div className="text-gray-700 pl-4 border-l-2 border-indigo-100 leading-relaxed min-h-[1.5rem]">
                          {scenarioTyping}
                          {scenarioTyping.length < scenarioText.length && showScenario && (
                            <span className="inline-block w-1.5 h-5 bg-indigo-500 ml-0.5 animate-pulse rounded-sm"></span>
                          )}
                        </div>
                      </div>
                      
                      {/* 分析过程 - 仅在情景输入完成后显示 */}
                      {animationStep > 0 && (
                        <div 
                          ref={analysisRef}
                          className={`${cardStyle} ${cardPadding} ${cardWidth} mt-4`}
                        >
                          {/* 装饰元素 */}
                          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-100/20 rounded-full -translate-x-10 -translate-y-16 group-hover:bg-indigo-100/30 transition-all duration-500"></div>
                          
                          <div className="flex items-center mb-3">
                            <div className="w-1 h-5 bg-gradient-to-b from-indigo-400 to-indigo-600 rounded-full mr-3"></div>
                            <div className="text-indigo-700 font-semibold tracking-wide">分析进程</div>
                          </div>
                          
                          {/* 步骤连接线 */}
                          <div className="absolute left-[1.35rem] top-[3.5rem] bottom-8 w-0.5 bg-gradient-to-b from-indigo-100 via-indigo-200 to-indigo-100 z-0"></div>
                          
                          <div className="space-y-5 pl-4 border-l-2 border-indigo-100 relative">
                            {analysisSteps.map((step, index) => (
                              <div 
                                key={index}
                                ref={el => {
                                  stepRefs.current[index] = el;
                                  return undefined;
                                }}
                                className={`transition-all duration-1000 ${index < animationStep ? 'opacity-100 transform-none' : 'opacity-0 -translate-y-4 h-0 overflow-hidden'}`}
                              >
                                <div className="flex items-center relative z-10">
                                  {index < animationStep ? (
                                    <div className="flex items-center justify-center h-6 w-6 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 text-white shadow-[0_2px_10px_-3px_rgba(16,185,129,0.4)] mr-3 transition-all duration-500 animate-scaleIn">
                                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                      </svg>
                                    </div>
                                  ) : (
                                    <div className="h-6 w-6 rounded-full border-2 border-gray-200 mr-3 flex items-center justify-center bg-white">
                                      <div className="h-1.5 w-1.5 rounded-full bg-gray-300"></div>
                                    </div>
                                  )}
                                  <span className={`text-indigo-800 font-medium tracking-wide transition-all duration-500 ${index < animationStep ? 'text-indigo-700' : 'text-gray-400'}`}>
                                    {step.title}
                                  </span>
                                </div>
                                <div className={`pl-9 text-gray-600 text-xs mt-1.5 pr-2 leading-relaxed transition-all duration-500 ${index < animationStep ? 'opacity-100' : 'opacity-50'}`}>
                                  {step.content}
                                </div>
                              </div>
                            ))}
                            
                            {/* 加载指示器 */}
                            {animationStep === analysisSteps.length && !showResult && (
                              <div className="flex items-center mt-4 pl-1.5 relative z-10">
                                <div className="relative h-6 w-6 mr-3">
                                  <div className="absolute inset-0 rounded-full border-2 border-indigo-100 opacity-30"></div>
                                  <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-indigo-600 animate-spin"></div>
                                  <div className="absolute inset-[3px] rounded-full bg-indigo-50"></div>
                                </div>
                                <div className="text-indigo-700 font-medium">生成结果中</div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      
                      {/* 结果区域 - 仅在分析完成后显示 */}
                      {showResult && (
                        <div 
                          ref={resultRef}
                          className={`${cardStyle} ${cardPadding} ${cardWidth} mt-4 hover:shadow-md hover:border-indigo-200/70 transition-all duration-1000 animate-fadeIn`}
                        >
                          {/* 装饰元素 */}
                          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-100/20 rounded-full -translate-x-8 -translate-y-12 group-hover:bg-indigo-100/30 transition-all duration-500"></div>
                          
                          <div className="flex items-center mb-2.5">
                            <div className="w-1 h-5 bg-gradient-to-b from-indigo-400 to-indigo-600 rounded-full mr-3"></div>
                            <div className="text-indigo-700 font-semibold tracking-wide">分析结果</div>
                          </div>
                          <div className="text-gray-700 pl-4 border-l-2 border-indigo-100 relative leading-relaxed min-h-[1.5rem]">
                            {typingText}
                            {typingText.length < resultText.length && (
                              <span className="inline-block w-1.5 h-5 bg-indigo-500 ml-0.5 animate-pulse rounded-sm"></span>
                            )}
                            
                            {/* 完成标志 */}
                            {analysisComplete && (
                              <div className="mt-3 flex items-center">
                                <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs font-medium px-3 py-1 rounded-full shadow-sm flex items-center animate-bounceIn">
                                  <svg className="w-3.5 h-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  分析完成
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <div className="relative left-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-linear-to-tr from-[#9089fc] to-[#ff80b5] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" />
      </div>
    </div>
  );
};

export default Hero; 