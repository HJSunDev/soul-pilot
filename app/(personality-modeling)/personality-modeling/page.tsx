'use client';

import { useState } from 'react';
import { Navbar } from '@/app/_components/Navbar';
import { SideNav } from '@/app/_components/SideNav';
import { getNavModules } from '@/app/_config/navigation';
import { DiaryEditor } from "../_components/DiaryEditor"

const PersonalityModelingPage = () => {
  const [diaryContent, setDiaryContent] = useState<string>('');
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [diaryDate, setDiaryDate] = useState<Date>(new Date());

  // 处理日记内容变更
  const handleDiaryChange = (content: string) => {
    setDiaryContent(content);
    // 这里可以添加自动保存逻辑
  };

  // 处理日记保存
  const handleSaveDiary = async () => {
    if (!diaryContent.trim()) return;
    
    setIsSaving(true);
    try {
      // 这里添加保存到数据库的逻辑
      console.log('保存日记:', diaryContent);
      
      // 模拟保存延迟
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 保存成功提示
      console.log('日记保存成功');
    } catch (error) {
      console.error('保存日记失败:', error);
    } finally {
      setIsSaving(false);
    }
  };

  // 处理日期变更
  const handleDateChange = (date: Date) => {
    setDiaryDate(date);
    // 这里可以添加根据日期加载日记内容的逻辑
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-white via-emerald-50/20 to-teal-50/30 relative">
      {/* 背景装饰 */}
      <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-emerald-100/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[20rem] h-[20rem] bg-teal-100/20 rounded-full blur-3xl pointer-events-none"></div>
      
      {/* 导航栏 */}
      <Navbar theme="emerald" />
      
      {/* 主要内容区域 */}
      <div className="flex-1 w-full max-w-[75rem] mx-auto px-[1rem] sm:px-[1.5rem] lg:px-[2rem] py-[1rem] flex flex-col relative z-10">
        {/* 日记编辑区 - 占据剩余空间但不超过一屏 */}
        <div className="flex-1 bg-white/60 rounded-xl p-[1rem] border border-emerald-100/50 shadow-lg backdrop-blur-md overflow-hidden">
          <DiaryEditor 
            content={diaryContent}
            onChange={handleDiaryChange}
            onSave={handleSaveDiary}
            isSaving={isSaving}
            currentDate={diaryDate}
            onDateChange={handleDateChange}
          />
        </div>
      </div>

      {/* 侧边导航栏 */}
      <SideNav modules={getNavModules('personality-modeling')} theme="emerald" />
    </div>
  );
}
 
export default PersonalityModelingPage;