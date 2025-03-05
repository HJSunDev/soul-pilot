'use client';

import { useState } from 'react';
import { CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/hooks/use-toast";

// 模拟AI分析
const mockAnalyzeEmotion = async (data: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        emotion: {
          type: 'joy',
          name: '愉悦',
          icon: '😊',
          intensity: 85
        },
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

interface EmotionRecorderProps {
  onSubmit: (note: string) => Promise<void>;
}

export function EmotionRecorder({ onSubmit }: EmotionRecorderProps) {
  const { toast } = useToast();
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [charCount, setCharCount] = useState(0);
  
  const MAX_CHARS = 300;

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_CHARS) {
      setNote(value);
      setCharCount(value.length);
    }
  };

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
      await onSubmit(note);
      // 清空输入
      setNote('');
      setCharCount(0);
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
    <div className="w-full space-y-4">
      <div className="relative">
        {/* 输入框装饰 */}
        <div className="absolute -inset-1 bg-gradient-to-r from-rose-100 to-rose-200 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
        
        <div className="relative">
          <Textarea
            placeholder="此刻，你的内心在想些什么..."
            value={note}
            onChange={handleNoteChange}
            className="h-28 resize-none bg-white/80 hover:bg-white focus:bg-white border-0 focus:ring-2 ring-rose-200/50 shadow-sm rounded-lg text-sm transition-all duration-300 pr-16"
          />
          
          {/* 字数统计 */}
          <div className="absolute bottom-2 right-3 text-xs text-gray-400">
            <span className={charCount > MAX_CHARS * 0.8 ? 'text-rose-500' : ''}>{charCount}</span>/{MAX_CHARS}
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        {/* 情绪提示 */}
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse"></div>
          <span className="text-xs text-gray-500">记录情绪，获得AI解读</span>
        </div>
        
        {/* 提交按钮 */}
        <Button
          className="relative overflow-hidden rounded-lg group"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-rose-500 transition-transform duration-300 group-hover:scale-102" />
          <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-rose-500 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
          <span className="relative flex items-center justify-center gap-2 text-sm font-medium text-white px-4 py-2">
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>分析中...</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
                </svg>
                <span>感知情绪</span>
              </>
            )}
          </span>
        </Button>
      </div>
    </div>
  );
}