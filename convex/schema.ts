import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // 会话表：存储用户的咨询会话信息
  conversations: defineTable({
    // 用户ID
    userId: v.string(),
    // 会话标题
    title: v.string(),
    // 会话描述或初始问题
    description: v.optional(v.string()),
    // 会话状态：active（进行中）| archived（已归档）
    status: v.union(v.literal("active"), v.literal("archived")),
    // 会话标签/场景，用于分类
    tags: v.array(v.string()),
    // 创建时间
    createdAt: v.string(),
    // 最后更新时间
    updatedAt: v.string(),
    // 会话摘要，可以用 AI 生成
    summary: v.optional(v.string()),
  })
    // 用于查询用户的所有会话
    .index("by_user", ["userId"])
    // 用于按状态查询会话
    .index("by_user_and_status", ["userId", "status"])
    // 用于按标签查询会话
    .index("by_user_and_tags", ["userId", "tags"]),

  // 消息表：存储会话中的具体消息
  messages: defineTable({
    // 关联的会话ID
    conversationId: v.id("conversations"),
    // 用户ID，冗余存储以便快速查询
    userId: v.string(),
    // 消息角色：用户或AI助手
    role: v.union(v.literal("user"), v.literal("assistant")),
    // 消息内容
    content: v.string(),
    // 消息类型：text（文本）| image（图片）| file（文件）等
    type: v.union(v.literal("text"), v.literal("image"), v.literal("file")),
    // 发送时间
    timestamp: v.string(),
    // 消息状态：sent（已发送）| delivered（已送达）| read（已读）
    status: v.union(
      v.literal("sent"),
      v.literal("delivered"),
      v.literal("read")
    ),
    // 元数据，用于存储额外信息
    metadata: v.optional(v.object({
      // 如果是文件消息，存储文件信息
      fileUrl: v.optional(v.string()),
      fileName: v.optional(v.string()),
      fileSize: v.optional(v.number()),
      // 如果是图片消息，存储图片信息
      imageUrl: v.optional(v.string()),
      width: v.optional(v.number()),
      height: v.optional(v.number()),
    })),
  })
    // 用于查询特定会话的所有消息
    .index("by_conversation", ["conversationId"])
    // 用于查询用户的所有消息
    .index("by_user", ["userId"])
    // 用于按时间范围查询消息
    .index("by_conversation_and_timestamp", ["conversationId", "timestamp"]),
}); 