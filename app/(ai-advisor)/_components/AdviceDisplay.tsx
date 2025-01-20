'use client';

interface AdviceDisplayProps {
  advice: string;
  isLoading: boolean;
  worldview: string;
  lifeview: string;
  values: string;
  scenario: string;
}

export const AdviceDisplay = ({
  advice,
  isLoading,
  worldview,
  lifeview,
  values,
  scenario,
}: AdviceDisplayProps) => {
  const hasViewpoints = worldview || lifeview || values;
  const hasScenario = scenario.trim().length > 0;

  return (
    <div className="bg-white rounded-2xl shadow-lg ring-1 ring-gray-900/5 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        AI 建议
      </h3>

      {!hasViewpoints && !hasScenario ? (
        // 初始状态
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-indigo-600"
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
          <h4 className="text-lg font-medium text-gray-900 mb-2">
            等待你的输入
          </h4>
          <p className="text-sm text-gray-500 max-w-sm">
            请先填写你的三观信息并描述你的具体场景，AI 将为你提供个性化的建议
          </p>
        </div>
      ) : isLoading ? (
        // 加载状态
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 relative mb-4">
            <div className="w-16 h-16 rounded-full border-4 border-indigo-100 border-t-indigo-500 animate-spin"></div>
          </div>
          <p className="text-sm text-gray-500">AI 正在思考中...</p>
        </div>
      ) : advice ? (
        // 显示建议
        <div className="space-y-4">
          <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {advice}
            </p>
          </div>
          
          {/* 参考信息 */}
          <div className="mt-6 pt-4 border-t border-gray-100">
            <h4 className="text-sm font-medium text-gray-900 mb-2">
              参考信息
            </h4>
            <div className="space-y-2 text-xs text-gray-500">
              {worldview && (
                <p>世界观：{worldview.slice(0, 50)}...</p>
              )}
              {lifeview && (
                <p>人生观：{lifeview.slice(0, 50)}...</p>
              )}
              {values && (
                <p>价值观：{values.slice(0, 50)}...</p>
              )}
              {scenario && (
                <p>当前场景：{scenario.slice(0, 50)}...</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        // 准备状态
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-indigo-600"
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
          <h4 className="text-lg font-medium text-gray-900 mb-2">
            准备就绪
          </h4>
          <p className="text-sm text-gray-500 max-w-sm">
            点击"获取 AI 建议"按钮，开始获取个性化建议
          </p>
        </div>
      )}
    </div>
  );
}; 