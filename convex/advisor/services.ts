"use node";

import { v } from "convex/values";
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "langchain/output_parsers";
import { z } from "zod";
import { action } from "../_generated/server";
import { StringOutputParser } from "@langchain/core/output_parsers";

// 定义用户三观信息的接口类型
interface Worldviews {
  worldview?: string;      // 用户的世界观
  lifePhilosophy?: string; // 用户的人生观
  values?: string;         // 用户的价值观
}

// 使用 Zod 定义结构化输出的模式
const adviceOutputSchema = z.object({
  analysis: z.object({
    points: z.array(z.string()).length(3).describe("三个心境剖析要点"),
  }),
  actions: z.object({
    points: z.array(z.string()).length(3).describe("三个行动指南要点"),
  }),
  fullContent: z.string().describe("完整的分析和建议内容"),
});

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

    try {
      // 创建结构化输出解析器
      const parser = StructuredOutputParser.fromZodSchema(adviceOutputSchema);
      const formatInstructions = parser.getFormatInstructions();

      // 创建提示模板
      const promptTemplate = PromptTemplate.fromTemplate(`
你是一个专业的人生顾问，你需要基于用户的三观，给出符合其价值观的建议。

用户的三观信息如下：
世界观：{worldview}
人生观：{lifePhilosophy}
价值观：{values}

用户的问题或场景：
{scenario}

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

{format_instructions}
      `);

      // 初始化 ChatOpenAI 模型
      const model = new ChatOpenAI({
        openAIApiKey: apiKey,
        modelName: "gpt-4",
        temperature: 0.5,
        maxTokens: 2500,
        // 使用 OpenRouter 作为代理
        configuration: {
          baseURL: "https://openrouter.ai/api/v1",
        },
      });

      // 创建字符串输出解析器
      const stringOutputParser = new StringOutputParser();

      // 格式化提示
      const prompt = await promptTemplate.format({
        worldview: args.worldviews.worldview || "未设置",
        lifePhilosophy: args.worldviews.lifePhilosophy || "未设置",
        values: args.worldviews.values || "未设置",
        scenario: args.scenario,
        format_instructions: formatInstructions,
      });

      // 调用模型并将结果转换为字符串
      const response = await model.invoke(prompt);
      const responseText = await stringOutputParser.invoke(response);
      
      // 尝试解析结构化输出
      try {
        const structuredOutput = await parser.parse(responseText);
        
        // 返回成功结果
        return {
          content: {
            analysis: structuredOutput.analysis,
            actions: structuredOutput.actions,
            fullContent: structuredOutput.fullContent,
          },
          timestamp: new Date().toISOString(),
          status: "success",
          isStructured: true,
        };
      } catch (parseError) {
        console.error("解析结构化输出失败:", parseError);
        
        // 解析失败时的降级处理
        return {
          content: {
            analysis: { points: [] },
            actions: { points: [] },
            fullContent: responseText || "无法解析AI回复",
          },
          timestamp: new Date().toISOString(),
          status: "success",
          isStructured: false,
        };
      }
    } catch (error) {
      // 记录错误日志
      console.error("AI服务错误:", error);
      
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
