"use node";

import { v } from "convex/values";
import OpenAI from "openai";
import { action } from "../_generated/server";

// 定义用户三观信息的接口类型
interface Worldviews {
  worldview?: string;      // 用户的世界观
  lifePhilosophy?: string; // 用户的人生观
  values?: string;         // 用户的价值观
}

// 构建系统提示词，引导AI根据用户三观提供个性化建议
function buildSystemPrompt(worldviews: Worldviews): string {
  const basePrompt = `你是一个专业的人生顾问，你需要基于用户的三观，给出符合其价值观的建议。

用户的三观信息如下：
${worldviews.worldview ? `世界观：${worldviews.worldview}` : "世界观：未设置"}
${worldviews.lifePhilosophy ? `人生观：${worldviews.lifePhilosophy}` : "人生观：未设置"}
${worldviews.values ? `价值观：${worldviews.values}` : "价值观：未设置"}

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

请严格按照以下JSON格式输出你的回答：
{
  "analysis": {
    "points": [
      "第一个心境剖析要点",
      "第二个心境剖析要点",
      "第三个心境剖析要点"
    ]
  },
  "actions": {
    "points": [
      "第一个行动指南要点",
      "第二个行动指南要点",
      "第三个行动指南要点"
    ]
  },
  "fullContent": "这里是完整的分析和建议内容，包括问题复述与共情、基于用户三观的深入分析、符合用户价值观的具体建议、可执行的行动计划等"
}

请确保输出格式严格遵循上述JSON结构，不要添加任何前缀或后缀。`;

  return basePrompt;
}

// 验证和处理AI响应，确保返回格式一致的数据结构
function validateAndProcessResponse(responseContent: string): {
  isStructured: boolean; // 表示是否符合预期的结构化格式
  data: {
    analysis: { points: string[] };
    actions: { points: string[] };
    fullContent: string;
  };
} {
  try {
    // 尝试解析JSON响应
    let jsonData;
    try {
      jsonData = JSON.parse(responseContent);
    } catch (e) {
      // JSON解析失败时，返回降级处理的数据结构
      return {
        isStructured: false,
        data: {
          analysis: { points: [] },
          actions: { points: [] },
          fullContent: responseContent, // 使用原始回复作为完整内容
        },
      };
    }

    // 验证JSON结构是否符合预期格式
    const hasValidStructure =
      jsonData.analysis &&
      Array.isArray(jsonData.analysis.points) &&
      jsonData.analysis.points.length === 3 &&
      jsonData.actions &&
      Array.isArray(jsonData.actions.points) &&
      jsonData.actions.points.length === 3 &&
      jsonData.fullContent &&
      typeof jsonData.fullContent === "string";

    // 结构完全符合预期时返回结构化数据
    if (hasValidStructure) {
      return {
        isStructured: true,
        data: {
          analysis: { points: jsonData.analysis.points },
          actions: { points: jsonData.actions.points },
          fullContent: jsonData.fullContent,
        },
      };
    }

    // 结构不完全符合预期时进行降级处理
    return {
      isStructured: false,
      data: {
        analysis: { points: [] },
        actions: { points: [] },
        fullContent: responseContent, // 使用原始回复作为完整内容
      },
    };
  } catch (error) {
    // 处理过程中发生任何错误时的降级处理
    return {
      isStructured: false,
      data: {
        analysis: { points: [] },
        actions: { points: [] },
        fullContent: responseContent, // 使用原始回复作为完整内容
      },
    };
  }
}

// 根据用户三观和场景提供个性化建议的API接口
export const getAdvice = action({
  args: {
    worldviews: v.object({
      worldview: v.optional(v.string()),
      lifePhilosophy: v.optional(v.string()),
      values: v.optional(v.string()),
    }),
    scenario: v.string(),
  },
  handler: async (ctx, args) => {
    // 获取API密钥
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error("OpenAI API key not found in environment variables");
    }

    // 初始化OpenAI客户端，使用OpenRouter作为代理
    const openai = new OpenAI({
      apiKey,
      baseURL: "https://openrouter.ai/api/v1",
    });

    try {
      // 构建系统提示和用户消息
      const systemPrompt = buildSystemPrompt(args.worldviews);
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

      // 调用AI模型获取回复
      const completion = await openai.chat.completions.create({
        model: "gpt-4", // 使用GPT-4以获得更好的结构化输出能力
        messages,
        temperature: 0.5, // 降低温度以获得更一致的格式输出
        max_tokens: 2500,
        response_format: { type: "json_object" }, // 指定JSON响应格式
      });

      // 提取AI回复内容
      const reply = completion.choices[0].message.content;
      if (!reply) {
        throw new Error("No response from OpenAI");
      }

      // 验证和处理AI响应
      const processedResponse = validateAndProcessResponse(reply);

      // 返回成功结果
      return {
        content: processedResponse.data,
        timestamp: new Date().toISOString(),
        status: "success",
        isStructured: processedResponse.isStructured,
      };
    } catch (error) {
      // 记录错误日志
      console.error("OpenAI API error:", error);
      
      // 返回错误结果
      return {
        content: {
          analysis: { points: [] },
          actions: { points: [] },
          fullContent: `抱歉，在处理您的请求时遇到了问题：${error instanceof Error ? error.message : "未知错误"}`,
        },
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
        timestamp: new Date().toISOString(),
        status: "error",
        isStructured: false,
      };
    }
  },
});
