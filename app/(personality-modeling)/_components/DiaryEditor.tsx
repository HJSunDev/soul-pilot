'use client';

import { useState, useRef, useEffect } from 'react';
import { Tiptap } from '@/components/ui/tiptap';
import { Button } from '@/components/ui/button';
import { 
  CalendarIcon, 
  SaveIcon, 
  MoonIcon, 
  SunIcon, 
  CloudIcon, 
  CloudRainIcon,
  StarIcon,
  HeartIcon,
  SmileIcon,
  FrownIcon,
  MehIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  TagIcon,
  SparklesIcon
} from 'lucide-react';
import { format, addDays, subDays, isToday, isSameDay } from 'date-fns';
import { zhCN } from 'date-fns/locale';

interface DiaryEditorProps {
  content: string;
  onChange: (content: string) => void;
  onSave: () => void;
  isSaving: boolean;
  currentDate: Date;
  onDateChange: (date: Date) => void;
}

export const DiaryEditor = ({
  content,
  onChange,
  onSave,
  isSaving,
  currentDate,
  onDateChange
}: DiaryEditorProps) => {
  const [mood, setMood] = useState<string>('');
  const [weather, setWeather] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState<string>('');
  const [showTagInput, setShowTagInput] = useState<boolean>(false);
  const [editingTagIndex, setEditingTagIndex] = useState<number>(-1);
  const editorRef = useRef<HTMLDivElement>(null);
  const tagInputRef = useRef<HTMLInputElement>(null);

  // 格式化日期
  const formattedDate = format(currentDate, 'yyyy年MM月dd日 EEEE', { locale: zhCN });

  // 自动聚焦编辑器
  useEffect(() => {
    const timer = setTimeout(() => {
      if (editorRef.current) {
        const editorElement = editorRef.current.querySelector('[contenteditable=true]');
        if (editorElement) {
          (editorElement as HTMLElement).focus();
        }
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // 聚焦标签输入框
  useEffect(() => {
    if (showTagInput && tagInputRef.current) {
      tagInputRef.current.focus();
    }
  }, [showTagInput]);

  // 心情选项
  const moodOptions = [
    { value: 'happy', label: '开心', icon: <SmileIcon className="w-[0.875rem] h-[0.875rem] text-amber-500" /> },
    { value: 'calm', label: '平静', icon: <MehIcon className="w-[0.875rem] h-[0.875rem] text-blue-400" /> },
    { value: 'sad', label: '低落', icon: <FrownIcon className="w-[0.875rem] h-[0.875rem] text-indigo-400" /> },
    { value: 'love', label: '喜爱', icon: <HeartIcon className="w-[0.875rem] h-[0.875rem] text-rose-400" /> },
    { value: 'excited', label: '兴奋', icon: <StarIcon className="w-[0.875rem] h-[0.875rem] text-yellow-500" /> },
  ];

  // 天气选项
  const weatherOptions = [
    { value: 'sunny', label: '晴朗', icon: <SunIcon className="w-[0.875rem] h-[0.875rem] text-amber-500" /> },
    { value: 'cloudy', label: '多云', icon: <CloudIcon className="w-[0.875rem] h-[0.875rem] text-blue-400" /> },
    { value: 'rainy', label: '雨天', icon: <CloudRainIcon className="w-[0.875rem] h-[0.875rem] text-indigo-400" /> },
  ];

  // 处理日期变更
  const handlePrevDay = () => {
    onDateChange(subDays(currentDate, 1));
  };

  const handleNextDay = () => {
    onDateChange(addDays(currentDate, 1));
  };

  const handleTodayClick = () => {
    onDateChange(new Date());
  };

  // 处理标签添加
  const handleAddTag = () => {
    if (newTag.trim()) {
      // 移除用户可能输入的#前缀
      const tagText = newTag.trim().replace(/^#+/, '');
      
      if (tagText && !tags.includes(tagText)) {
        if (editingTagIndex >= 0) {
          // 编辑现有标签
          const newTags = [...tags];
          newTags[editingTagIndex] = tagText;
          setTags(newTags);
          setEditingTagIndex(-1);
        } else {
          // 添加新标签
          setTags([...tags, tagText]);
        }
        setNewTag('');
        setShowTagInput(false);
      } else {
        // 标签已存在或为空，只关闭输入框
        setNewTag('');
        setShowTagInput(false);
      }
    } else {
      // 输入为空，关闭输入框
      setShowTagInput(false);
    }
  };

  // 处理标签删除
  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  // 处理标签编辑
  const handleEditTag = (tag: string, index: number) => {
    setNewTag(tag);
    setEditingTagIndex(index);
    setShowTagInput(true);
  };

  // 处理标签输入回车和Escape
  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    } else if (e.key === 'Escape') {
      setShowTagInput(false);
      setNewTag('');
      setEditingTagIndex(-1);
    }
  };

  // 取消标签编辑或添加
  const handleCancelTagEdit = () => {
    setShowTagInput(false);
    setNewTag('');
    setEditingTagIndex(-1);
  };

  return (
    <div className="flex flex-col h-full">
      {/* 顶部工具栏 - 日期导航和保存按钮 */}
      <div className="flex items-center justify-between bg-white/60 rounded-lg p-[0.75rem] shadow-sm border border-emerald-100 mb-[0.75rem] relative overflow-hidden">
        {/* 装饰元素 */}
        <div className="absolute -right-[1rem] -top-[1rem] w-[5rem] h-[5rem] bg-emerald-100/30 rounded-full blur-xl"></div>
        <div className="absolute -left-[1rem] -bottom-[1rem] w-[3rem] h-[3rem] bg-teal-100/20 rounded-full blur-lg"></div>
        
        {/* 日期导航 */}
        <div className="flex items-center relative z-10">
          <button 
            onClick={handlePrevDay}
            className="p-[0.375rem] rounded-full hover:bg-emerald-100/50 text-gray-500 hover:text-emerald-600 transition-colors"
          >
            <ChevronLeftIcon className="w-[1rem] h-[1rem]" />
          </button>
          
          <div className="flex flex-col items-center mx-[0.5rem]">
            <div className="flex items-center space-x-[0.5rem] text-gray-700 font-medium">
              <CalendarIcon className="w-[0.875rem] h-[0.875rem] text-emerald-500" />
              <span className="text-[0.75rem]">{formattedDate}</span>
            </div>
            
            {!isToday(currentDate) && (
              <button 
                onClick={handleTodayClick}
                className="text-[0.625rem] text-emerald-600 hover:text-emerald-700 mt-[0.25rem] hover:underline"
              >
                返回今天
              </button>
            )}
          </div>
          
          <button 
            onClick={handleNextDay}
            className="p-[0.375rem] rounded-full hover:bg-emerald-100/50 text-gray-500 hover:text-emerald-600 transition-colors"
            disabled={isToday(currentDate)}
          >
            <ChevronRightIcon className={`w-[1rem] h-[1rem] ${isToday(currentDate) ? 'opacity-30' : ''}`} />
          </button>
        </div>
        
        {/* 保存按钮 */}
        <Button
          onClick={onSave}
          disabled={isSaving || !content.trim()}
          className="bg-transparent hover:bg-emerald-50/70 text-emerald-600 rounded-full px-[1rem] py-[0.375rem] text-[0.75rem] flex items-center space-x-[0.375rem] border border-emerald-200/50 shadow-sm relative z-10 transition-colors"
        >
          {isSaving ? (
            <>
              <div className="w-[0.875rem] h-[0.875rem] border-2 border-emerald-200 border-t-emerald-500 rounded-full animate-spin"></div>
              <span>保存中...</span>
            </>
          ) : (
            <>
              <SaveIcon className="w-[0.875rem] h-[0.875rem]" />
              <span>保存日记</span>
            </>
          )}
        </Button>
      </div>

      {/* 中间区域 - 编辑器和侧边栏 */}
      <div className="flex flex-1 gap-[0.75rem] min-h-0">
        {/* 编辑器 */}
        <div 
          ref={editorRef}
          className="flex-1 bg-gradient-to-b from-white to-emerald-50/30 rounded-xl shadow-sm border border-emerald-100/50 overflow-hidden relative"
        >
          {/* 装饰元素 */}
          <div className="absolute -right-[5rem] -bottom-[5rem] w-[15rem] h-[15rem] bg-emerald-100/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -left-[3rem] -top-[3rem] w-[10rem] h-[10rem] bg-teal-100/10 rounded-full blur-2xl pointer-events-none"></div>
          
          {/* 纸张效果 - 使用 CSS 实现纹理 */}
          <div className="absolute inset-0 bg-white opacity-10 pointer-events-none" 
               style={{
                 backgroundImage: `
                   linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px),
                   linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px)
                 `,
                 backgroundSize: '1.5rem 1.5rem'
               }}
          ></div>
          
          {/* 装饰线条 */}
          <div className="absolute left-[2rem] top-0 bottom-0 w-[1px] bg-emerald-200/20 pointer-events-none"></div>
          
          {/* 装饰角标 */}
          <div className="absolute left-0 top-0 w-[3rem] h-[3rem] overflow-hidden pointer-events-none">
            <div className="absolute top-[0.5rem] left-[-1.5rem] w-[3rem] h-[1.5rem] bg-emerald-200/30 rotate-45"></div>
          </div>
          <div className="absolute right-0 bottom-0 w-[3rem] h-[3rem] overflow-hidden pointer-events-none">
            <div className="absolute bottom-[0.5rem] right-[-1.5rem] w-[3rem] h-[1.5rem] bg-emerald-200/30 rotate-45"></div>
          </div>
          
          <Tiptap
            content={content}
            onChange={onChange}
            placeholder="今天有什么想法呢？记录下来吧..."
            className="h-full p-[1.25rem] relative z-10 prose prose-emerald max-w-none focus:outline-none diary-content text-[1rem] leading-[1.8]"
          />
          
          {/* 右下角装饰 */}
          <div className="absolute right-[0.75rem] bottom-[0.75rem] text-emerald-300/30 pointer-events-none">
            <SparklesIcon className="w-[1.25rem] h-[1.25rem]" />
          </div>
        </div>
        
        {/* 侧边栏 - 心情、天气和标签 */}
        <div className="w-[10rem] flex flex-col gap-[0.75rem]">
          {/* 心情选择 */}
          <div className="bg-gradient-to-br from-white to-emerald-50/50 rounded-lg p-[0.75rem] shadow-sm border border-emerald-100/50 relative overflow-hidden">
            <div className="absolute -right-[1rem] -bottom-[1rem] w-[3rem] h-[3rem] bg-amber-100/20 rounded-full blur-lg pointer-events-none"></div>
            
            <label className="text-[0.6875rem] font-medium text-gray-500 block mb-[0.5rem] relative z-10">今日心情</label>
            <div className="flex flex-col gap-[0.375rem] relative z-10">
              {moodOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setMood(option.value)}
                  className={`flex items-center space-x-[0.375rem] px-[0.625rem] py-[0.375rem] rounded-md text-[0.6875rem] border transition-all ${
                    mood === option.value
                      ? 'border-emerald-200 bg-gradient-to-r from-emerald-50 to-emerald-100/50 text-emerald-700 shadow-sm'
                      : 'border-gray-200 hover:border-emerald-200 hover:bg-emerald-50/50'
                  }`}
                >
                  {option.icon}
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 天气选择 */}
          <div className="bg-gradient-to-br from-white to-blue-50/50 rounded-lg p-[0.75rem] shadow-sm border border-blue-100/50 relative overflow-hidden">
            <div className="absolute -left-[1rem] -top-[1rem] w-[3rem] h-[3rem] bg-blue-100/20 rounded-full blur-lg pointer-events-none"></div>
            
            <label className="text-[0.6875rem] font-medium text-gray-500 block mb-[0.5rem] relative z-10">今日天气</label>
            <div className="flex flex-col gap-[0.375rem] relative z-10">
              {weatherOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setWeather(option.value)}
                  className={`flex items-center space-x-[0.375rem] px-[0.625rem] py-[0.375rem] rounded-md text-[0.6875rem] border transition-all ${
                    weather === option.value
                      ? 'border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100/50 text-blue-700 shadow-sm'
                      : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50/50'
                  }`}
                >
                  {option.icon}
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 标签管理 */}
          <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-lg p-[0.75rem] shadow-sm border border-gray-100/50 flex-1 relative overflow-hidden">
            <div className="absolute -right-[1rem] -top-[1rem] w-[3rem] h-[3rem] bg-gray-100/20 rounded-full blur-lg pointer-events-none"></div>
            
            <div className="flex items-center justify-between mb-[0.75rem] relative z-10">
              <label className="text-[0.6875rem] font-medium text-gray-500">日记标签</label>
              <button 
                onClick={() => {
                  setShowTagInput(true);
                  setEditingTagIndex(-1);
                  setNewTag('');
                }}
                className="flex items-center justify-center w-[1.75rem] h-[1.75rem] rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 hover:text-emerald-700 transition-all shadow-sm group"
                type="button"
              >
                <TagIcon className="w-[0.875rem] h-[0.875rem] group-hover:scale-110 transition-transform" />
              </button>
            </div>
            
            {/* 标签列表 */}
            <div className="flex flex-wrap gap-[0.375rem] overflow-y-auto max-h-[10rem] relative z-10">
              {tags.length > 0 ? (
                tags.map((tag, index) => (
                  <div 
                    key={tag + index} 
                    className="inline-flex items-center px-[0.625rem] py-[0.375rem] rounded-full text-[0.75rem] bg-emerald-50 text-emerald-700 border border-emerald-100 hover:bg-emerald-100/50 transition-all duration-200 shadow-sm group"
                  >
                    <div className="flex items-center overflow-hidden">
                      <span className="truncate max-w-[7rem] transition-all duration-200 group-hover:max-w-[5rem]">{tag}</span>
                      <div className="flex-shrink-0 flex items-center ml-[0.375rem] w-0 overflow-hidden group-hover:w-auto transition-all duration-200">
                        <button 
                          onClick={() => handleEditTag(tag, index)}
                          className="text-emerald-400 hover:text-emerald-600 p-[0.125rem] rounded-full hover:bg-white/70 transition-colors flex-shrink-0"
                          title="编辑标签"
                          type="button"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-[0.75rem] h-[0.75rem]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                          </svg>
                        </button>
                        <button 
                          onClick={() => handleRemoveTag(tag)}
                          className="text-emerald-400 hover:text-emerald-600 p-[0.125rem] rounded-full hover:bg-white/70 transition-colors flex-shrink-0 ml-[0.125rem]"
                          title="删除标签"
                          type="button"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-[0.75rem] h-[0.75rem]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-[0.75rem] text-gray-400 text-center w-full py-[1.5rem]">
                  <div className="flex flex-col items-center">
                    <TagIcon className="w-[1.25rem] h-[1.25rem] mb-[0.5rem] text-gray-300" />
                    <span>暂无标签</span>
                  </div>
                </div>
              )}
            </div>
            
            {/* 标签输入面板 - 浮动定位在外部 */}
            {showTagInput && (
              <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center" onClick={handleCancelTagEdit}>
                <div 
                  className="bg-white rounded-xl shadow-lg border border-emerald-100 w-[20rem] overflow-hidden animate-in fade-in zoom-in-95 duration-200"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* 标题栏 */}
                  <div className="bg-emerald-50 px-[1rem] py-[0.75rem] border-b border-emerald-100 flex items-center justify-between">
                    <h3 className="text-[0.875rem] font-medium text-emerald-800 flex items-center">
                      {editingTagIndex >= 0 ? (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-[1rem] h-[1rem] mr-[0.5rem]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                          </svg>
                          编辑标签
                        </>
                      ) : (
                        <>
                          <TagIcon className="w-[1rem] h-[1rem] mr-[0.5rem]" />
                          添加新标签
                        </>
                      )}
                    </h3>
                    <button 
                      onClick={handleCancelTagEdit}
                      className="text-gray-400 hover:text-gray-600 w-[1.75rem] h-[1.75rem] flex items-center justify-center rounded-full hover:bg-white/70 transition-colors"
                      type="button"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-[1rem] h-[1rem]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>
                  
                  {/* 内容区域 */}
                  <div className="p-[1rem]">
                    <div className="mb-[1rem]">
                      <label className="block text-[0.75rem] text-gray-500 mb-[0.375rem]">标签内容</label>
                      <div className="relative">
                        <input
                          ref={tagInputRef}
                          type="text"
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          onKeyDown={handleTagKeyDown}
                          placeholder="输入标签内容"
                          className="w-full text-[0.875rem] border border-gray-200 rounded-lg px-[1rem] py-[0.625rem] focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400 bg-white shadow-sm"
                          autoFocus
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-[0.75rem]">
                      <button
                        onClick={handleCancelTagEdit}
                        className="px-[1rem] py-[0.5rem] rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors text-[0.8125rem]"
                        type="button"
                      >
                        取消
                      </button>
                      <button
                        onClick={handleAddTag}
                        className="px-[1rem] py-[0.5rem] rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white transition-colors text-[0.8125rem] shadow-sm"
                        type="button"
                      >
                        {editingTagIndex >= 0 ? "更新标签" : "添加标签"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 底部提示信息 */}
      <div className="text-[0.625rem] text-gray-400 text-center italic mt-[0.5rem]">
        你的日记将被安全地保存，并用于分析你的性格特征
      </div>
    </div>
  );
}; 