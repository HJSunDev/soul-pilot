'use client';

import { motion } from 'framer-motion';

interface UnderDevelopmentProps {
  // 模块名称
  moduleName?: string;
  // 预计完成时间
  estimatedCompletion?: string;
  // 自定义类名
  className?: string;
}

export function UnderDevelopment({
  moduleName = '此模块',
  estimatedCompletion = '近期',
  className = ''
}: UnderDevelopmentProps) {
  return (
    <div className={`fixed inset-0 z-40 ${className}`}>
      {/* 背景模糊和半透明效果 - 降低模糊度，让底下内容更清晰 */}
      <div className="absolute inset-0 backdrop-blur-[3px] bg-white/40"></div>
      
      {/* 流动动画背景 */}
      <div className="absolute inset-0 overflow-hidden">
        {/* 流动波浪 1 */}
        <motion.div 
          className="absolute w-[200%] h-[50vh] top-[5%] left-[-50%] bg-gradient-to-r from-blue-100/20 via-purple-100/30 to-pink-100/20 rounded-[100%] opacity-60"
          animate={{
            x: ["0%", "15%", "0%"],
            y: ["0%", "5%", "0%"],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* 流动波浪 2 */}
        <motion.div 
          className="absolute w-[200%] h-[40vh] top-[30%] left-[-30%] bg-gradient-to-r from-teal-100/20 via-cyan-100/30 to-blue-100/20 rounded-[100%] opacity-50"
          animate={{
            x: ["0%", "-15%", "0%"],
            y: ["0%", "8%", "0%"],
            scale: [1, 1.03, 1]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* 流动波浪 3 */}
        <motion.div 
          className="absolute w-[200%] h-[45vh] bottom-[0%] left-[-20%] bg-gradient-to-r from-rose-100/20 via-orange-100/30 to-amber-100/20 rounded-[100%] opacity-40"
          animate={{
            x: ["0%", "10%", "0%"],
            y: ["0%", "-5%", "0%"],
            scale: [1, 1.04, 1]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>


      {/* 中央优雅文字 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="relative"
        >
          {/* 文字背景光晕 */}
          <div className="absolute inset-0 bg-white/40 rounded-full filter blur-3xl transform scale-150"></div>
            {/* 图标 */}
            <motion.div 
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
            className="relative w-24 h-24 mx-auto mb-8"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-200/40 via-purple-200/40 to-pink-200/40 blur-md"></div>
            <div className="absolute inset-2 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
              </svg>
            </div>
          </motion.div>
          
          {/* 模块名称 */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-center mb-3"
          >
            <h2 className="text-4xl font-light tracking-wide text-gray-800 drop-shadow-sm">
              {moduleName}
            </h2>
          </motion.div>
          
          {/* 分隔线 */}
          <motion.div 
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 0.7 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="w-40 h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent mx-auto mb-3"
          />
          
          {/* 完成时间 */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-center"
          >
            <p className="text-base text-gray-600 font-light tracking-wider drop-shadow-sm">
              预计完成于 {estimatedCompletion}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}