'use client';

import { useState } from 'react';
import { CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { useToast } from "@/hooks/use-toast";

// 定义情绪类型
const emotionTypes = [
  { id: 'joy', name: '喜悦', icon: '😊' },
  { id: 'anger', name: '愤怒', icon: '😠' },
  { id: 'sadness', name: '悲伤', icon: '😢' },
  { id: 'fear', name: '恐惧', icon: '😨' },
  { id: 'disgust', name: '厌恶', icon: '😒' },
  { id: 'surprise', name: '惊讶', icon: '😲' }
];

// 模拟AI分析
const mockAnalyzeEmotion = async (data: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        analysis: "根据你的描述，我注意到你在面对工作压力时倾向于自我怀疑。这种情绪反应是很自然的，但也显示你可能对自己要求过高。建议你尝试将注意力从'我做得够好吗'转移到'我从这个经历中学到了什么'。",
        suggestions: [
          "尝试每天记录三件做得好的小事，培养积极的自我对话",
          "在感到压力时，给自己5分钟的正念呼吸时间",
          "与信任的同事或朋友分享你的顾虑，获取不同的视角"
        ]
      });
    }, 1500);
  });
};

export function EmotionRecorder() {
  const { toast } = useToast();
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [intensity, setIntensity] = useState(50);
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!note.trim()) {
      toast({
        title: '请记录你的想法',
        variant: 'destructive'
      });
      return;
    }

    try {
      setIsSubmitting(true);
      await mockAnalyzeEmotion({
        type: selectedEmotion,
        intensity,
        note,
        timestamp: new Date().toISOString()
      });

      toast({
        title: '记录成功',
        description: '你的心情已记录，请查看分析结果'
      });
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

  return (
    <CardContent className="h-full p-4">
      <div className="h-full flex flex-col">
        {/* 标题 */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-medium text-gray-900">记录心情</h2>
          <p className="text-xs text-gray-500">记录下此刻的想法和感受</p>
        </div>

        <div className="flex-1 flex gap-4">
          {/* 左侧：情绪选择和强度 */}
          <div className="w-32 flex-shrink-0 space-y-4">
            {/* 情绪类型选择 */}
            <div className="grid grid-cols-2 gap-1.5">
              {emotionTypes.map((emotion) => (
                <Button
                  key={emotion.id}
                  variant="outline"
                  className={`
                    h-10 p-0 group relative transition-all duration-300
                    hover:border-rose-200 hover:bg-rose-50/50
                    ${selectedEmotion === emotion.id
                      ? 'border-rose-200 bg-rose-50/50 ring-1 ring-rose-400/20'
                      : 'border-gray-100'
                    }
                  `}
                  onClick={() => setSelectedEmotion(emotion.id)}
                >
                  <span className="text-base group-hover:scale-110 transition-transform duration-300">
                    {emotion.icon}
                  </span>
                </Button>
              ))}
            </div>

            {/* 情绪强度 */}
            <div>
              <Slider
                value={[intensity]}
                onValueChange={(values) => setIntensity(values[0])}
                max={100}
                step={1}
                className="w-full"
                orientation="vertical"
              />
              <div className="mt-1.5 text-center text-xs text-gray-400">
                强度 {intensity}%
              </div>
            </div>
          </div>

          {/* 右侧：内心独白 */}
          <div className="flex-1 min-w-0">
            <Textarea
              placeholder="此刻，你的内心在想些什么..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="h-full min-h-[150px] resize-none bg-gray-50/50 border-gray-100 hover:border-rose-200/50 focus:border-rose-200 focus:ring-rose-200 transition-colors duration-300 rounded-xl text-sm"
            />
          </div>
        </div>

        {/* 提交按钮 */}
        <div className="mt-4 flex justify-end">
          <Button
            className="px-6 h-8 bg-gradient-to-r from-rose-400 to-rose-500 hover:from-rose-500 hover:to-rose-600 text-white shadow-lg shadow-rose-200/50 transition-all duration-300"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            <span className="relative flex items-center gap-2 text-sm">
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  分析中...
                </>
              ) : (
                <>
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
                  </svg>
                  获取分析
                </>
              )}
            </span>
          </Button>
        </div>
      </div>
    </CardContent>
  );
} 