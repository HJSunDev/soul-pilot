import { query } from "../_generated/server";
import { v } from "convex/values";

import { AVAILABLE_MODELS } from "./model";

/**
 * 获取当前用户的三观信息
 * 
 * @returns 返回用户的世界观、人生观、价值观信息
 *          如果用户未登录，返回 null
 *          如果用户尚未设置三观，返回 null
 */
export const getUserWorldviews = query({
  handler: async (ctx) => {
    // 获取当前用户ID
    const userId = (await ctx.auth.getUserIdentity())?.subject;
    if (!userId) return null;
    
    // 使用 by_userId 索引查询用户的三观记录
    const worldviews = await ctx.db
      .query("userWorldviews")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .first();
    
    return worldviews;
  },
});

/**
 * 获取指定用户的三观信息
 * 用于管理员或其他授权场景下查看特定用户的三观信息
 * 
 * @param targetUserId - 目标用户ID
 * @returns 返回指定用户的三观信息，如果未找到则返回 null
 * @throws 如果当前用户未登录，抛出未授权错误
 */
export const getTargetUserWorldviews = query({
  args: { targetUserId: v.string() },
  handler: async (ctx, args) => {
    // 获取当前用户ID（可以在这里添加权限检查）
    const userId = (await ctx.auth.getUserIdentity())?.subject;
    if (!userId) throw new Error("未授权访问");
    
    // 使用 by_userId 索引查询目标用户的三观记录
    const worldviews = await ctx.db
      .query("userWorldviews")
      .withIndex("by_userId", (q) => q.eq("userId", args.targetUserId))
      .first();
    
    return worldviews;
  },
});


// 获取可用模型列表的API
export const getAvailableModels = query({
  handler: async () => {
    // 返回所有可用模型的基本信息
    return Object.entries(AVAILABLE_MODELS).map(([id, config]) => ({
      id,
      name: config.modelName,
      provider: config.provider,
      description: config.description
    }));
  }
});

