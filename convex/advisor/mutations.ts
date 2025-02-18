import { mutation } from "../_generated/server";
import { v } from "convex/values";

/**
 * 更新用户三观信息
 * 支持部分更新或完整更新用户的世界观、人生观、价值观
 * 
 * @param worldview - 世界观（可选）
 * @param lifePhilosophy - 人生观（可选）
 * @param values - 价值观（可选）
 * @returns 更新后的记录ID
 * @throws 如果用户未登录，抛出未授权错误
 */
export const updateWorldviews = mutation({
  args: {
    worldview: v.optional(v.string()),
    lifePhilosophy: v.optional(v.string()),
    values: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // 获取当前用户ID
    const userId = (await ctx.auth.getUserIdentity())?.subject;
    if (!userId) throw new Error("未授权访问");

    // 查找用户现有的三观记录
    const existingRecord = await ctx.db
      .query("userWorldviews")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .first();

    // 构建更新数据，只更新提供的字段
    const updateData: any = {
      userId,
      lastUpdated: Date.now(),
    };

    if (args.worldview !== undefined) updateData.worldview = args.worldview;
    if (args.lifePhilosophy !== undefined) updateData.lifePhilosophy = args.lifePhilosophy;
    if (args.values !== undefined) updateData.values = args.values;

    if (existingRecord) {
      // 如果记录存在，则更新
      return await ctx.db.patch(existingRecord._id, updateData);
    } else {
      // 如果记录不存在，则创建新记录
      // 确保所有必需字段都有默认值
      if (!updateData.worldview) updateData.worldview = "";
      if (!updateData.lifePhilosophy) updateData.lifePhilosophy = "";
      if (!updateData.values) updateData.values = "";
      
      return await ctx.db.insert("userWorldviews", updateData);
    }
  },
});
