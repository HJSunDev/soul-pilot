'use client';

// AdviceDisplay组件的属性接口
interface AdviceDisplayProps {
  advice: string;        // AI建议内容
  isLoading: boolean;    // 加载状态
  worldview: string;     // 世界观内容
  lifeview: string;      // 人生观内容
  values: string;        // 价值观内容
  scenario: string;      // 场景描述
}

// AdviceDisplay组件:用于展示AI建议内容
export const AdviceDisplay = ({
  advice,
  isLoading,
  worldview,
  lifeview,
  values,
  scenario,
}: AdviceDisplayProps) => {
  // 检查是否已输入三观信息
  const hasViewpoints = worldview || lifeview || values;
  // 检查是否已输入场景描述
  const hasScenario = scenario.trim().length > 0;

  return (
    // 主容器：采用与ScenarioInput一致的渐变背景和阴影效果
    <div className="bg-gradient-to-br from-white to-gray-50/80 rounded-2xl 
      shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] ring-1 ring-gray-900/5 
      p-6 h-[20rem] flex flex-col">
      {/* 标题区域：保持视觉一致性 */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-1.5 h-6 bg-gradient-to-b from-purple-500 to-indigo-500 rounded-full"/>
        <h3 className="text-xl font-semibold bg-gradient-to-r from-gray-800 to-gray-600 
          bg-clip-text text-transparent">
          AI 建议
        </h3>
      </div>

      {!hasViewpoints && !hasScenario ? (
        // 初始状态：优化空状态设计
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          {/* 图标容器：改进视觉效果 */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-50 to-purple-50 
            flex items-center justify-center mb-4 shadow-inner">
            <svg
              className="w-8 h-8 text-indigo-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          {/* 提示文本：优化排版 */}
          <h4 className="text-lg font-medium bg-gradient-to-r from-gray-800 to-gray-600 
            bg-clip-text text-transparent mb-3">
            等待你的输入
          </h4>
          <p className="text-sm text-gray-500/90 max-w-sm leading-relaxed">
            请先填写你的三观信息并描述你的具体场景，AI 将为你提供个性化的建议
          </p>
        </div>
      ) : isLoading ? (
        // 加载状态：优化加载动画
        <div className="flex-1 flex flex-col items-center justify-center">
          {/* 加载动画容器 */}
          <div className="relative mb-4">
            <div className="w-16 h-16 rounded-full border-[3px] border-indigo-100 
              border-t-indigo-500 animate-spin"></div>
            <div className="absolute inset-0 w-16 h-16 rounded-full border-[3px] 
              border-purple-100 border-r-purple-500 animate-spin-reverse"></div>
          </div>
          <p className="text-sm font-medium text-gray-500/90 animate-pulse">
            AI 正在思考中...
          </p>
        </div>
      ) : advice ? (
        // 建议显示状态：优化内容展示
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* 建议内容区域：改进视觉效果 */}
          <div className="flex-1 overflow-auto scrollbar-thin scrollbar-thumb-gray-200 
            scrollbar-track-transparent hover:scrollbar-thumb-gray-300">
            <div className="p-4 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 
              backdrop-blur-sm rounded-xl border border-indigo-100/30">
              <p className="text-[15px] leading-relaxed text-gray-700 whitespace-pre-line">
                {advice}
              </p>
            </div>
          </div>
          
          {/* 参考信息区域：优化布局和样式 */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <h4 className="text-sm font-medium text-gray-800 mb-2 flex items-center space-x-2">
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>参考信息</span>
            </h4>
            {/* 显示用户输入的三观和场景信息摘要 */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              {worldview && (
                <div className="p-1.5 rounded-lg bg-gray-50/80">
                  <span className="text-gray-400">世界观：</span>
                  <span className="text-gray-600">{worldview.slice(0, 50)}...</span>
                </div>
              )}
              {lifeview && (
                <div className="p-1.5 rounded-lg bg-gray-50/80">
                  <span className="text-gray-400">人生观：</span>
                  <span className="text-gray-600">{lifeview.slice(0, 50)}...</span>
                </div>
              )}
              {values && (
                <div className="p-1.5 rounded-lg bg-gray-50/80">
                  <span className="text-gray-400">价值观：</span>
                  <span className="text-gray-600">{values.slice(0, 50)}...</span>
                </div>
              )}
              {scenario && (
                <div className="p-1.5 rounded-lg bg-gray-50/80">
                  <span className="text-gray-400">当前场景：</span>
                  <span className="text-gray-600">{scenario.slice(0, 50)}...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        // 准备状态：优化视觉效果
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          {/* 图标容器 */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-50 to-purple-50 
            flex items-center justify-center mb-4 shadow-inner">
            <svg
              className="w-8 h-8 text-indigo-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          {/* 提示文本 */}
          <h4 className="text-lg font-medium bg-gradient-to-r from-gray-800 to-gray-600 
            bg-clip-text text-transparent mb-3">
            准备就绪
          </h4>
          <p className="text-sm text-gray-500/90 max-w-sm leading-relaxed">
            点击"获取 AI 建议"按钮，开始获取个性化建议
          </p>
        </div>
      )}
    </div>
  );
}; 