"use node";
//"use node"; 告诉Convex在Node.js环境中运行这个文件中的代码

import { v } from "convex/values";
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "langchain/output_parsers";
import { z } from "zod";
import { action } from "../_generated/server";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { AVAILABLE_MODELS, DEFAULT_MODEL_ID } from "./model";




// 使用 Zod 定义结构化输出的模式
const adviceOutputSchema = z.object({
  analysis: z.object({
    points: z.array(z.string()).length(3).describe("三个心境剖析要点，分析用户在当前场景中的心理需求和深层心理状态"),
  }),
  actions: z.object({
    points: z.array(z.string()).length(3).describe("三个行动指南要点，基于用户三观提供的具体可行建议"),
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
      // 使用默认模型配置
      const modelId = DEFAULT_MODEL_ID;
      const modelConfig = AVAILABLE_MODELS[modelId];
      
      if (!modelConfig) {
        throw new Error(`未找到ID为 ${modelId} 的模型配置`);
      }

      // 创建结构化输出解析器
      const parser = StructuredOutputParser.fromZodSchema(adviceOutputSchema);
      // 获取格式化指令
      const formatInstructions = parser.getFormatInstructions();

      // 创建提示模板
      const promptTemplate = PromptTemplate.fromTemplate(`
你是一个专业的人生顾问，你需要通过用户的三观来了解用户这个人，然后分析用户在特定场景中的心理需求和深层心理状态，以第二人称视角回答。

用户的三观信息如下：
世界观：{worldview}
人生观：{lifePhilosophy}
价值观：{values}

用户的场景：
{scenario}

你的主要职责是：
1. 通过用户的三观深入理解用户的思维方式和价值取向
2. 分析用户在当前场景中的心理需求和深层心理状态
3. 识别用户在这个场景中可能面临的内在冲突和情感挑战
4. 给出符合用户三观的具体可行的行动建议

心境剖析部分：
- 专注于用户在当前场景中的心理需求和情感状态
- 挖掘用户可能没有意识到的深层心理动机
- 分析用户在这个场景中的内在冲突和情感挑战
- 不要分析用户的三观本身，而是基于三观来理解用户的场景

行动建议部分：
- 给出符合用户三观的具体、可操作的建议
- 建议应该帮助用户解决当前场景中的实际问题
- 避免空泛的建议，注重实用性和可行性

{format_instructions}
      `);

      // 初始化 ChatOpenAI 模型
      const model = new ChatOpenAI({
        openAIApiKey: apiKey,
        modelName: modelConfig.modelName,
        temperature: modelConfig.temperature,
        maxTokens: modelConfig.maxTokens,
        // 使用配置的基础URL
        configuration: modelConfig.baseURL ? {
          baseURL: modelConfig.baseURL,
        } : undefined,
      });

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

      // 创建字符串输出解析器
      const stringOutputParser = new StringOutputParser();
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
          modelUsed: {
            id: modelId,
            name: modelConfig.modelName,
            provider: modelConfig.provider
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
          modelUsed: {
            id: modelId,
            name: modelConfig.modelName,
            provider: modelConfig.provider
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
