import { RESPONSIVE_CONFIG } from './config';

/**
 * 计算根元素字体大小
 * @returns {number} 计算后的字体大小（单位：px）
 */
function calculateRootFontSize(): number {
  if (typeof window === 'undefined') {
    return RESPONSIVE_CONFIG.FONT_SIZE.BASE;
  }

  const { BASE_WIDTH, FONT_SIZE } = RESPONSIVE_CONFIG;
  const width = window.innerWidth;
  const scale = width / BASE_WIDTH;
  
  // 计算字体大小并限制在最小值和最大值之间
  return Math.min(
    Math.max(
      FONT_SIZE.BASE * scale,
      FONT_SIZE.MIN
    ),
    FONT_SIZE.MAX
  );
}

/**
 * 更新根元素字体大小
 */
function updateRootFontSize(): void {
  const fontSize = calculateRootFontSize();
  const htmlElement = document.documentElement;
  
  // 只在字体大小真正需要变化时更新
  if (htmlElement.style.fontSize !== `${fontSize}px`) {
    htmlElement.style.fontSize = `${fontSize}px`;
  }
}

/**
 * 防抖函数
 * @param fn 需要防抖的函数
 * @param delay 延迟时间（毫秒）
 */
function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

/**
 * 初始化响应式布局
 * @returns {() => void} 清理函数
 */
export function initResponsive(): () => void {
  if (typeof window === 'undefined') {
    return () => {};
  }

  // 初始化字体大小
  updateRootFontSize();

  // 监听窗口大小变化，使用 requestAnimationFrame 优化性能
  let ticking = false;
  const debouncedUpdate = debounce(() => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateRootFontSize();
        ticking = false;
      });
      ticking = true;
    }
  }, 16); // 约60fps

  window.addEventListener('resize', debouncedUpdate);
  window.addEventListener('orientationchange', updateRootFontSize);

  // 返回清理函数
  return () => {
    window.removeEventListener('resize', debouncedUpdate);
    window.removeEventListener('orientationchange', updateRootFontSize);
  };
} 