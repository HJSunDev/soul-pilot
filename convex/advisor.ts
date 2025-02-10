import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { openai, ADVISOR_SYSTEM_PROMPT, formatAIResponse } from "./openai";
import { Id } from "./_generated/dataModel";

// 定义对话记录的数据结构
export type Message = {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
};

// 创建新的会话
export const createConversation = mutation({
  args: {
    userId: v.string(),
    title: v.string(),
    description: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const conversationId = await ctx.db.insert("conversations", {
      userId: args.userId,
      title: args.title,
      description: args.description,
      tags: args.tags ?? [],
      status: "active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return conversationId;
  },
});

// 获取用户的所有会话
export const getUserConversations = query({
  args: {
    userId: v.string(),
    status: v.optional(v.union(v.literal("active"), v.literal("archived"))),
  },
  handler: async (ctx, args) => {
    const query = ctx.db
      .query("conversations")
      .withIndex("by_user", (q) => q.eq("userId", args.userId));

    // 如果指定了状态，添加状态过滤
    if (args.status !== undefined) {
      return await query
        .filter((q) => q.eq(q.field("status"), args.status))
        .order("desc")
        .collect();
    }

    return await query.order("desc").collect();
  },
});

// 获取特定会话的详情
export const getConversation = query({
  args: { conversationId: v.id("conversations") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.conversationId);
  },
});

// 获取会话的消息历史
export const getConversationMessages = query({
  args: { 
    conversationId: v.id("conversations"),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_conversation", (q) => 
        q.eq("conversationId", args.conversationId)
      )
      .order("asc")
      .take(args.limit ?? 100);
    return messages;
  },
});

// 发送消息并获取 AI 回复
export const sendMessage = mutation({
  args: {
    conversationId: v.id("conversations"),
    userId: v.string(),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    // 获取会话信息
    const conversation = await ctx.db.get(args.conversationId);
    if (!conversation) {
      throw new Error("会话不存在");
    }

    // 保存用户消息
    const userMessage = {
      conversationId: args.conversationId,
      userId: args.userId,
      role: "user" as const,
      content: args.content,
      type: "text" as const,
      timestamp: new Date().toISOString(),
      status: "sent" as const,
    };
    await ctx.db.insert("messages", userMessage);

    // 获取会话历史
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_conversation", (q) => 
        q.eq("conversationId", args.conversationId)
      )
      .order("asc")
      .collect();

    // 构建 OpenAI 消息
    const aiMessages = [
      { role: "system" as const, content: ADVISOR_SYSTEM_PROMPT },
      ...messages.map((msg) => ({
        role: msg.role as "user" | "assistant",
        content: msg.content,
      })),
    ];

    // 调用 OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: aiMessages,
      temperature: 0.7,
      max_tokens: 2000,
    });

    // 保存 AI 回复
    const aiResponse = completion.choices[0]?.message?.content || "抱歉，我现在无法提供建议。";
    const aiMessage = {
      conversationId: args.conversationId,
      userId: args.userId,
      role: "assistant" as const,
      content: aiResponse,
      type: "text" as const,
      timestamp: new Date().toISOString(),
      status: "sent" as const,
    };
    await ctx.db.insert("messages", aiMessage);

    // 更新会话的最后更新时间
    await ctx.db.patch(args.conversationId, {
      updatedAt: new Date().toISOString(),
    });

    return formatAIResponse(aiResponse);
  },
});

// 更新会话状态
export const updateConversationStatus = mutation({
  args: {
    conversationId: v.id("conversations"),
    status: v.union(v.literal("active"), v.literal("archived")),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.conversationId, {
      status: args.status,
      updatedAt: new Date().toISOString(),
    });
  },
});

// 更新会话标签
export const updateConversationTags = mutation({
  args: {
    conversationId: v.id("conversations"),
    tags: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.conversationId, {
      tags: args.tags,
      updatedAt: new Date().toISOString(),
    });
  },
});

// 生成会话摘要
export const generateConversationSummary = mutation({
  args: {
    conversationId: v.id("conversations"),
  },
  handler: async (ctx, args) => {
    // 获取会话的所有消息
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_conversation", (q) => 
        q.eq("conversationId", args.conversationId)
      )
      .order("asc")
      .collect();

    // 构建摘要提示
    const summaryPrompt = `请总结以下对话的主要内容（100字以内）：\n\n${
      messages.map(m => `${m.role === "user" ? "用户" : "AI"}：${m.content}`).join("\n")
    }`;

    // 调用 OpenAI 生成摘要
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [{ role: "user", content: summaryPrompt }],
      temperature: 0.7,
      max_tokens: 200,
    });

    const summary = completion.choices[0]?.message?.content || "无法生成摘要";

    // 更新会话摘要
    await ctx.db.patch(args.conversationId, {
      summary,
      updatedAt: new Date().toISOString(),
    });

    return summary;
  },
}); 