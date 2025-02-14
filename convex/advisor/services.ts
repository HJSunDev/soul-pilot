"use node";

import { v } from "convex/values";
import OpenAI from "openai";
import { action } from "../_generated/server";

// 定义消息类型
interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

// AI 助手的系统提示词
const ADVISOR_SYSTEM_PROMPT = `你是一个专业的人生顾问，名为"Soul Pilot"。你的主要职责是：

1. 倾听用户的困惑和问题
2. 提供深入的分析和建议
3. 帮助用户理清思路，找到解决方案
4. 给出具体可行的行动建议

请注意：
- 保持专业、同理心和积极的态度
- 给出具体、可操作的建议
- 避免空泛的建议
- 注意保护用户隐私
- 在必要时建议用户寻求专业帮助

在回答时，请遵循以下结构：
1. 问题复述与共情
2. 深入分析
3. 具体建议
4. 行动计划
5. 鼓励语`;

// OpenAI API 调用函数
export const chat = action({
  args: {
    messages: v.array(
      v.object({
        role: v.union(v.literal("system"), v.literal("user"), v.literal("assistant")),
        content: v.string(),
      })
    ),
  },
  handler: async (ctx, args) => {
    // 获取 API key
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error("OpenAI API key not found in environment variables");
    }

    // 创建 OpenAI 客户端
    const openai = new OpenAI({ apiKey });

    try {
      // 准备消息数组
      const messages: Message[] = [
        {
          role: "system",
          content: ADVISOR_SYSTEM_PROMPT,
        },
        ...args.messages,
      ];

      // 调用 OpenAI API
      const completion = await openai.chat.completions.create({
        model: "gpt-4-turbo-preview",
        messages,
        temperature: 0.7,
        max_tokens: 2000,
      });

      // 返回 AI 的回复
      const reply = completion.choices[0].message.content;
      if (!reply) {
        throw new Error("No response from OpenAI");
      }

      return {
        content: reply,
        timestamp: new Date().toISOString(),
        status: "success",
      };
    } catch (error) {
      console.error("OpenAI API error:", error);
      throw new Error(error instanceof Error ? error.message : "Unknown error occurred");
    }
  },
}); 