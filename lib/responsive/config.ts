/**
 * 响应式布局配置
 */

/**
 * 响应式配置类型定义
 */
export interface ResponsiveConfig {
  /** 设计稿基准宽度 */
  BASE_WIDTH: number;
  /** 字体大小配置 */
  FONT_SIZE: {
    /** 最小字号 */
    MIN: number;
    /** 最大字号 */
    MAX: number;
    /** 基准字号 */
    BASE: number;
  };
  /** 断点配置 */
  BREAKPOINTS: {
    /** 小屏幕 */
    SM: number;
    /** 中等屏幕 */
    MD: number;
    /** 大屏幕 */
    LG: number;
    /** 超大屏幕 */
    XL: number;
    /** 特大屏幕 */
    XXL: number;
  };
}

/**
 * 响应式配置常量
 */
export const RESPONSIVE_CONFIG: ResponsiveConfig = {
  // 设计稿基准宽度
  BASE_WIDTH: 1440,
  
  // 字体大小配置（单位：px）
  FONT_SIZE: {
    MIN: 14,    // 最小字号
    MAX: 18,    // 最大字号
    BASE: 16,   // 基准字号
  },
  
  // 断点配置（单位：px）
  BREAKPOINTS: {
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
    XXL: 1536,
  },
} as const;

/**
 * 字体大小比例配置类型
 */
export type FontScale = {
  xs: number;
  sm: number;
  base: number;
  lg: number;
  xl: number;
  '2xl': number;
  '3xl': number;
  '4xl': number;
  '5xl': number;
};

/**
 * 字体大小比例配置
 */
export const FONT_SCALE: FontScale = {
  xs: 0.75,     // 12px at 16px base
  sm: 0.875,    // 14px at 16px base
  base: 1,      // 16px at 16px base
  lg: 1.125,    // 18px at 16px base
  xl: 1.25,     // 20px at 16px base
  '2xl': 1.5,   // 24px at 16px base
  '3xl': 1.875, // 30px at 16px base
  '4xl': 2.25,  // 36px at 16px base
  '5xl': 3,     // 48px at 16px base
} as const;

/**
 * 行高配置类型
 */
export type LineHeight = {
  tight: number;
  normal: number;
  relaxed: number;
};

/**
 * 行高配置
 */
export const LINE_HEIGHT: LineHeight = {
  tight: 1.25,
  normal: 1.5,
  relaxed: 1.75,
} as const; 