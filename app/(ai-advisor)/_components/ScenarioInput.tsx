'use client';

import { useState } from 'react';

interface ScenarioInputProps {
  onSubmit: (scenario: string) => void;
}

export const ScenarioInput = ({ onSubmit }: ScenarioInputProps) => {
  const [scenario, setScenario] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (scenario.trim()) {
      onSubmit(scenario);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg ring-1 ring-gray-900/5 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        描述你的场景
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <textarea
            className="w-full h-48 p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
            placeholder="请详细描述你当前遇到的情况或困扰..."
            value={scenario}
            onChange={(e) => setScenario(e.target.value)}
          />
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              尽可能详细地描述，这将帮助 AI 更好地理解你的处境
            </div>
            <div className="text-xs text-gray-400">
              {scenario.length}/1000 字
            </div>
          </div>
          <button
            type="submit"
            disabled={!scenario.trim()}
            className={`
              w-full py-3 px-4 rounded-lg text-white font-medium
              transition-all duration-300 relative overflow-hidden
              ${scenario.trim() 
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:shadow-lg hover:shadow-indigo-500/30' 
                : 'bg-gray-300 cursor-not-allowed'
              }
            `}
          >
            <span className="relative z-10">获取 AI 建议</span>
            {scenario.trim() && (
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-700 opacity-0 hover:opacity-100 transition-opacity duration-300" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}; 