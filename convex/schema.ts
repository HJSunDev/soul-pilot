import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  /**
   * ========================
   * 灵魂导航模块（Soul Guidance）
   * ========================
   */
  
  // 用户三观表：存储用户的世界观、人生观和价值观
  userWorldviews: defineTable({
    // Clerk 用户ID，作为用户唯一标识
    userId: v.string(),
    
    // 世界观：用户对世界的基本认知和理解（Markdown格式）
    worldview: v.string(),
    
    // 人生观：用户对人生意义和目标的理解
    lifePhilosophy: v.string(),
    
    // 价值观：用户的核心价值取向和判断标准
    values: v.string(),
    
    // 最后更新时间戳
    lastUpdated: v.number(),
  })
  .index("by_userId", ["userId"]),  // 按用户ID建立索引，用于快速查询用户数据

  /**
   * ========================
   * 情绪档案模块（Emotion Archive）
   * 待实现
   * ========================
   */

  /**
   * ========================
   * 人格建模模块（Personality Modeling）
   * 待实现
   * ========================
   */
}); 