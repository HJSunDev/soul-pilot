'use client';

import { useState } from 'react';
import { CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useToast } from "@/hooks/use-toast"


// 定义情绪类型
const emotionTypes = [
  { id: 'joy', name: '喜悦', color: 'bg-amber-500', description: '充满快乐和满足', icon: '😊' },
  { id: 'anger', name: '愤怒', color: 'bg-red-500', description: '感到不满和烦躁', icon: '😠' },
  { id: 'sadness', name: '悲伤', color: 'bg-blue-500', description: '感到失落和沮丧', icon: '😢' },
  { id: 'fear', name: '恐惧', color: 'bg-purple-500', description: '感到担忧和不安', icon: '😨' },
  { id: 'disgust', name: '厌恶', color: 'bg-green-500', description: '感到反感和排斥', icon: '😒' },
  { id: 'surprise', name: '惊讶', color: 'bg-pink-500', description: '感到意外和震惊', icon: '😲' }
];

// 模拟异步请求
const mockCreateEmotionRecord = async (data: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('创建情绪记录:', data);
      resolve({ success: true });
    }, 1000);
  });
};

export function EmotionRecorder() {
  const { toast } = useToast();

  // 状态管理
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [intensity, setIntensity] = useState(50);
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 提交情绪记录
  const handleSubmit = async () => {
    if (!selectedEmotion) {
      toast({
        title: '请选择情绪类型',
        variant: 'destructive'
      });
      return;
    }

    try {
      setIsSubmitting(true);
      await mockCreateEmotionRecord({
        type: selectedEmotion,
        intensity,
        note,
        timestamp: new Date().toISOString()
      });

      toast({
        title: '记录成功',
        description: '你的情绪记录已保存'
      });

      // 重置表单
      setSelectedEmotion(null);
      setIntensity(50);
      setNote('');
    } catch (error) {
      toast({
        title: '记录失败',
        description: '请稍后重试',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // 获取选中情绪的描述
  const selectedEmotionDescription = selectedEmotion
    ? emotionTypes.find(e => e.id === selectedEmotion)?.description
    : null;

  return (
    <CardContent className="h-full p-8">
      <div className="h-full flex flex-col max-w-2xl mx-auto">
        {/* 情绪类型选择 */}
        <div className="flex-shrink-0">
          <div className="flex items-center justify-between mb-6">
            <div className="space-y-1">
              <h2 className="text-xl font-medium text-gray-900">此刻的心情</h2>
              <p className="text-sm text-gray-500">选择一个最能代表你当前情绪的类型</p>
            </div>
            {selectedEmotionDescription && (
              <span className="text-sm text-gray-500 animate-in fade-in slide-in-from-right-5">
                {selectedEmotionDescription}
              </span>
            )}
          </div>
          <div className="grid grid-cols-3 gap-3">
            {emotionTypes.map((emotion) => (
              <Button
                key={emotion.id}
                variant="outline"
                className={`
                  group relative h-20 overflow-hidden transition-all duration-300
                  hover:border-rose-200 hover:bg-rose-50/50
                  ${selectedEmotion === emotion.id
                    ? 'border-rose-200 bg-rose-50/50 ring-2 ring-rose-400/20 ring-offset-2'
                    : 'border-gray-100 hover:border-rose-200/50'
                  }
                `}
                onClick={() => setSelectedEmotion(emotion.id)}
              >
                <div className="relative z-10 flex flex-col items-center gap-2">
                  <span className="text-2xl transition-transform duration-300 group-hover:scale-110">
                    {emotion.icon}
                  </span>
                  <span className="text-sm font-medium text-gray-700">{emotion.name}</span>
                </div>
                <div
                  className={`absolute inset-0 opacity-0 transition-opacity duration-300 ${emotion.color} ${
                    selectedEmotion === emotion.id ? 'opacity-5' : ''
                  }`}
                />
              </Button>
            ))}
          </div>
        </div>

        {/* 情绪强度滑块 */}
        <div className="mt-8 flex-shrink-0">
          <div className="space-y-1 mb-6">
            <h2 className="text-xl font-medium text-gray-900">情绪强度</h2>
            <p className="text-sm text-gray-500">拖动滑块来表示这种情绪的强烈程度</p>
          </div>
          <div className="px-1">
            <Slider
              value={[intensity]}
              onValueChange={(values) => setIntensity(values[0])}
              max={100}
              step={1}
              className="w-full"
            />
            <div className="mt-2 flex justify-between text-sm text-gray-500">
              <span>轻微</span>
              <span>中等</span>
              <span>强烈</span>
            </div>
          </div>
        </div>

        {/* 情绪笔记 */}
        <div className="mt-8 flex-1 flex flex-col min-h-0">
          <div className="space-y-1 mb-4">
            <h2 className="text-xl font-medium text-gray-900">内心独白</h2>
            <p className="text-sm text-gray-500">记录下此刻的想法和感受</p>
          </div>
          <div className="flex-1 min-h-0">
            <Textarea
              placeholder="写下你的心情..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="h-full min-h-[120px] resize-none bg-gray-50/50 border-gray-100 hover:border-rose-200/50 focus:border-rose-200 focus:ring-rose-200 transition-colors duration-300 rounded-xl"
            />
          </div>
        </div>

        {/* 提交按钮 */}
        <div className="mt-8 flex-shrink-0">
          <Button
            className="w-full h-12 bg-gradient-to-r from-rose-400 to-rose-500 hover:from-rose-500 hover:to-rose-600 text-white shadow-lg shadow-rose-200/50 transition-all duration-300"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            <span className="relative flex items-center gap-2">
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  记录中...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                  记录此刻
                </>
              )}
            </span>
          </Button>
        </div>
      </div>
    </CardContent>
  );
} 