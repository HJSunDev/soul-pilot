'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// AdviceDisplay组件的属性接口
interface AdviceDisplayProps {
  advice: string;        // AI建议内容
  isLoading: boolean;    // 加载状态
  worldview: string;     // 世界观内容
  lifeview: string;      // 人生观内容
  values: string;        // 价值观内容
  scenario: string;      // 场景描述
}

// 提取关键观察和建议
const extractKeyPoints = (text: string): string[] => {
  // 将文本按段落分割
  const paragraphs = text.split('\n').filter(p => p.trim());
  // 提取前三个段落作为关键点
  return paragraphs.slice(0, 3);
};

// 波浪形SVG路径
const WavePath = () => (
  <svg className="absolute bottom-0 left-0 right-0 w-full h-16 -mb-px" preserveAspectRatio="none" viewBox="0 0 400 24">
    <path
      d="M0,0 C100,12 200,-12 400,0 L400,24 L0,24 Z"
      className="fill-indigo-50/80"
    />
    <path
      d="M0,14 C100,20 200,4 400,14 L400,24 L0,24 Z"
      className="fill-indigo-100/50"
    />
  </svg>
);

// 展开按钮组件
const ExpandButton = ({ isExpanded, onClick }: { isExpanded: boolean; onClick: () => void }) => (
  <div className="absolute bottom-0 left-0 right-0">
    <WavePath />
    <motion.button
      onClick={onClick}
      className="absolute bottom-0 left-0 right-0 h-14
        flex items-center justify-center space-x-2
        text-sm text-gray-500 hover:text-gray-600
        transition-colors z-50"
      whileHover={{ y: -2 }}
      whileTap={{ y: 0 }}
    >
      <span>{isExpanded ? '收起详情' : '展开更多'}</span>
      <motion.div
        animate={isExpanded ? { rotate: 180 } : { rotate: 0 }}
        transition={{ duration: 0.2 }}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </motion.div>
    </motion.button>
  </div>
);

// 加载动画组件
const LoadingAnimation = () => (
  <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
    <div className="relative w-20 h-20">
      {/* 外圈脉冲动画 */}
      <motion.div
        className="absolute inset-0 rounded-full bg-indigo-100/40"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.1, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* 中圈脉冲动画 */}
      <motion.div
        className="absolute inset-2 rounded-full bg-indigo-100/60"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.2, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.3,
        }}
      />
      {/* 中心图标容器 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="w-12 h-12 rounded-full bg-white flex items-center justify-center
            shadow-[0_2px_12px_-2px_rgba(99,102,241,0.3)] border border-indigo-100"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <svg className="w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
          </svg>
        </motion.div>
      </div>
    </div>
    <h4 className="text-lg font-medium text-gray-900 mt-6 mb-2">
      正在生成建议
    </h4>
    <p className="text-sm text-gray-500/90 max-w-[280px] mx-auto">
      AI 正在根据你的三观和场景进行分析...
    </p>
    {/* 进度条动画 */}
    <div className="w-48 h-1 mt-8 rounded-full bg-gray-100 overflow-hidden">
      <motion.div
        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  </div>
);

// 空状态组件
const EmptyState = () => (
  <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
    <div className="w-16 h-16 mb-6 relative">
      <div className="absolute inset-0 bg-indigo-100/50 rounded-full blur-xl animate-pulse"/>
      <div className="relative w-full h-full rounded-full bg-white flex items-center justify-center
        shadow-[0_2px_12px_-2px_rgba(99,102,241,0.2)] border border-indigo-100">
        <svg className="w-8 h-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
        </svg>
      </div>
    </div>
    <h4 className="text-lg font-medium text-gray-900 mb-2">
      等待你的故事
    </h4>
    <p className="text-sm text-gray-500/90 max-w-[280px] mx-auto">
      请在左侧输入你的具体场景，AI 将根据你的三观提供个性化建议
    </p>
  </div>
);

// 建议内容组件
const AdviceContent = ({
  advice,
  showDetails,
  setShowDetails,
  renderReferenceInfo,
  renderBriefCards,
}: {
  advice: string;
  showDetails: boolean;
  setShowDetails: (show: boolean) => void;
  renderReferenceInfo: () => ReactNode;
  renderBriefCards: () => ReactNode;
}) => (
  <div className="flex flex-col h-full relative">
    {renderReferenceInfo()}
    {!showDetails ? (
      <>
        <div className="flex-1 p-6 pb-16">
          <div className="h-full flex flex-col justify-between">
            {renderBriefCards()}
          </div>
        </div>
        <ExpandButton isExpanded={false} onClick={() => setShowDetails(true)} />
      </>
    ) : (
      <>
        <div className="flex-1 overflow-hidden">
          <div className="h-full p-6 pb-16 overflow-y-auto
            scrollbar-thin scrollbar-thumb-gray-200/80 scrollbar-track-transparent">
            <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
              {advice}
            </p>
          </div>
        </div>
        <ExpandButton isExpanded={true} onClick={() => setShowDetails(false)} />
      </>
    )}
  </div>
);

// AdviceDisplay组件:用于展示AI建议内容
export const AdviceDisplay = ({
  advice,
  isLoading,
  worldview,
  lifeview,
  values,
  scenario,
}: AdviceDisplayProps) => {
  const [showReference, setShowReference] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const insights = extractKeyPoints(advice || '');
  const suggestions = extractKeyPoints(advice?.split('建议您可以考虑以下方式来处理')[1] || '');

  // 渲染参考信息按钮和面板
  const renderReferenceInfo = () => (
    <>
      <div className={`absolute right-3 transition-all duration-300 z-30
        ${showReference ? 'top-[4.5rem]' : 'top-3'}`}>
        <button
          onClick={() => setShowReference(!showReference)}
          className="px-2 py-1 text-xs text-gray-400 hover:text-gray-600
            transition-colors flex items-center space-x-1"
        >
          <span>参考信息</span>
          <svg 
            className={`w-3 h-3 transition-transform ${showReference ? 'rotate-180' : ''}`}
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {showReference && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute top-0 left-0 right-0 z-20 bg-white/95 backdrop-blur-sm
              border-b border-zinc-100/80 shadow-sm"
          >
            <div className="px-6 py-4">
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                {worldview && (
                  <div className="flex items-center space-x-1 truncate">
                    <span className="text-gray-400 shrink-0">世界观：</span>
                    <span className="text-gray-600 truncate">{worldview.slice(0, 30)}...</span>
                  </div>
                )}
                {lifeview && (
                  <div className="flex items-center space-x-1 truncate">
                    <span className="text-gray-400 shrink-0">人生观：</span>
                    <span className="text-gray-600 truncate">{lifeview.slice(0, 30)}...</span>
                  </div>
                )}
                {values && (
                  <div className="flex items-center space-x-1 truncate">
                    <span className="text-gray-400 shrink-0">价值观：</span>
                    <span className="text-gray-600 truncate">{values.slice(0, 30)}...</span>
                  </div>
                )}
                {scenario && (
                  <div className="flex items-center space-x-1 truncate">
                    <span className="text-gray-400 shrink-0">当前场景：</span>
                    <span className="text-gray-600 truncate">{scenario.slice(0, 30)}...</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  // 渲染简要信息卡片
  const renderBriefCards = () => (
    <div className="space-y-3">
      {/* 心境剖析卡片 */}
      <div className="rounded-xl bg-gradient-to-br from-indigo-50/40 to-purple-50/40 p-[1px]">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3">
          <div className="flex items-center space-x-2 mb-2">
            <svg className="w-3.5 h-3.5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <h3 className="text-sm font-medium text-gray-900">心境剖析</h3>
          </div>
          <div className="space-y-2">
            {insights.map((insight, index) => (
              <div key={index} className="flex items-start space-x-2">
                <span className="flex-shrink-0 w-4 h-4 mt-0.5 rounded-full bg-indigo-100 text-indigo-600
                  flex items-center justify-center text-xs font-medium">
                  {index + 1}
                </span>
                <p className="text-xs text-gray-600 leading-relaxed flex-1 line-clamp-1">
                  {insight}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 行动指南卡片 */}
      <div className="rounded-xl bg-gradient-to-br from-purple-50/40 to-indigo-50/40 p-[1px]">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3">
          <div className="flex items-center space-x-2 mb-2">
            <svg className="w-3.5 h-3.5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
            <h3 className="text-sm font-medium text-gray-900">行动指南</h3>
          </div>
          <div className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="flex items-start space-x-2">
                <span className="flex-shrink-0 w-4 h-4 mt-0.5 rounded-full bg-purple-100 text-purple-600
                  flex items-center justify-center text-xs font-medium">
                  {index + 1}
                </span>
                <p className="text-xs text-gray-600 leading-relaxed flex-1 line-clamp-1">
                  {suggestion}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-xl 
      border border-zinc-100/80 
      transition-all duration-300
      hover:bg-white/98 hover:shadow-lg hover:shadow-indigo-500/5
      hover:border-indigo-100
      h-[23rem] flex flex-col overflow-hidden
      relative">
      
      {/* 根据不同状态渲染不同内容 */}
      {!advice && !isLoading ? (
        <EmptyState />
      ) : isLoading ? (
        <LoadingAnimation />
      ) : (
        <AdviceContent
          advice={advice}
          showDetails={showDetails}
          setShowDetails={setShowDetails}
          renderReferenceInfo={renderReferenceInfo}
          renderBriefCards={renderBriefCards}
        />
      )}
    </div>
  );
}; 