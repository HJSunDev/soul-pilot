"use node";

import { v } from "convex/values";
import OpenAI from "openai";
import { action } from "../_generated/server";

// 定义三观信息类型
interface Worldviews {
  worldview?: string;
  lifePhilosophy?: string;
  values?: string;
}

/**
 * 构建系统提示词
 * 将用户的三观信息整合到系统提示词中
 */
function buildSystemPrompt(worldviews: Worldviews): string {
  // 基础系统提示词
  const basePrompt = `你是一个专业的人生顾问，你需要基于用户的三观，给出符合其价值观的建议。

用户的三观信息如下：
${worldviews.worldview ? `世界观：${worldviews.worldview}` : '世界观：未设置'}
${worldviews.lifePhilosophy ? `人生观：${worldviews.lifePhilosophy}` : '人生观：未设置'}
${worldviews.values ? `价值观：${worldviews.values}` : '价值观：未设置'}

你的主要职责是：
1. 倾听用户的困惑和问题
2. 基于用户的三观进行分析
3. 帮助用户找到符合其价值观的解决方案
4. 给出具体可行的行动建议

请注意：
- 保持专业、同理心和积极的态度
- 给出具体、可操作的建议
- 避免空泛的建议
- 确保建议与用户的三观一致

在回答时，请遵循以下结构：
1. 问题复述与共情
2. 基于用户三观的深入分析
3. 符合用户价值观的具体建议
4. 可执行的行动计划`;

  return basePrompt;
}

/**
 * 获取AI顾问的建议
 * 根据用户的三观信息和具体场景，给出符合用户价值观的建议
 */
export const getAdvice = action({
  args: {
    // 用户的三观信息
    worldviews: v.object({
      worldview: v.optional(v.string()),
      lifePhilosophy: v.optional(v.string()),
      values: v.optional(v.string()),
    }),
    // 用户描述的具体场景或问题
    scenario: v.string(),
  },
  handler: async (ctx, args) => {
    // 获取 API key
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error("OpenAI API key not found in environment variables");
    }

    // 创建 OpenAI 客户端
    const openai = new OpenAI({ 
      apiKey,
      baseURL: "https://openrouter.ai/api/v1",
    });

    try {
      // 构建系统提示词
      const systemPrompt = buildSystemPrompt(args.worldviews);

      // 准备消息
      const messages = [
        {
          role: "system" as const,
          content: systemPrompt,
        },
        {
          role: "user" as const,
          content: args.scenario,
        },
      ];

      // 调用 OpenAI API
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
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