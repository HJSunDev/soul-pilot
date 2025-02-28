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

// 定义模型配置接口
interface ModelConfig {
  modelName: string;       // 模型名称
  provider: string;        // 提供商
  baseURL?: string;        // API基础URL
  temperature: number;     // 温度参数
  maxTokens: number;       // 最大token数
  description: string;     // 模型描述
}

// 定义可用模型列表
const AVAILABLE_MODELS: Record<string, ModelConfig> = {
  "gpt-3.5-turbo": {
    modelName: "gpt-3.5-turbo",
    provider: "openai",
    baseURL: "https://openrouter.ai/api/v1",
    temperature: 0.7,
    maxTokens: 2000,
    description: "OpenAI GPT-3.5 Turbo - 快速响应，适合一般场景分析"
  },
  "gpt-4o": {
    modelName: "gpt-4o",
    provider: "openai",
    baseURL: "https://openrouter.ai/api/v1",
    temperature: 0.5,
    maxTokens: 4000,
    description: "OpenAI GPT-4o - 强大的多模态模型，适合复杂分析和推理"
  },
  "claude-3-7-sonnet": {
    modelName: "anthropic/claude-3-7-sonnet",
    provider: "anthropic",
    baseURL: "https://openrouter.ai/api/v1",
    temperature: 0.5,
    maxTokens: 4000,
    description: "Anthropic Claude 3.7 Sonnet - 最新的Claude模型，提供更高级的推理和理解能力"
  },
  "claude-3.5-sonnet": {
    modelName: "anthropic/claude-3.5-sonnet",
    provider: "anthropic",
    baseURL: "https://openrouter.ai/api/v1",
    temperature: 0.5,
    maxTokens: 4000,
    description: "Anthropic Claude 3.5 Sonnet - 擅长深度分析和情感理解，平衡速度与智能"
  },
  "deepseek-r1": {
    modelName: "deepseek/deepseek-r1",
    provider: "deepseek",
    baseURL: "https://openrouter.ai/api/v1",
    temperature: 0.4,
    maxTokens: 3000,
    description: "DeepSeek R1 - 强化学习模型，擅长复杂推理和逻辑分析"
  },
  "deepseek-v3": {
    modelName: "deepseek/deepseek-chat",
    provider: "deepseek",
    baseURL: "https://openrouter.ai/api/v1",
    temperature: 0.5,
    maxTokens: 4000,
    description: "DeepSeek V3 - 最新的DeepSeek模型，提供更强的语言理解和推理能力，适合复杂场景分析"
  },
  "deepseek-v3-free": {
    modelName: "deepseek/deepseek-chat:free",
    provider: "deepseek",
    baseURL: "https://openrouter.ai/api/v1",
    temperature: 0.5,
    maxTokens: 3000,
    description: "DeepSeek Chat 免费版 - DeepSeek的免费对话模型，提供基础的对话和推理能力"
  }
};

// 默认模型ID
const DEFAULT_MODEL_ID = "deepseek-v3-free";

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

// 获取可用模型列表的API
export const getAvailableModels = action({
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
      const formatInstructions = parser.getFormatInstructions();

      // 创建提示模板
      const promptTemplate = PromptTemplate.fromTemplate(`
你是一个专业的人生顾问，你需要通过用户的三观来了解用户这个人，然后分析用户在特定场景中的心理需求和深层心理状态。

用户的三观信息如下：
世界观：{worldview}
人生观：{lifePhilosophy}
价值观：{values}

用户的问题或场景：
{scenario}

你的主要职责是：
1. 通过用户的三观深入理解用户的思维方式和价值取向
2. 分析用户在当前场景中的心理需求和深层心理状态（不是分析三观本身）
3. 识别用户在这个场景中可能面临的内在冲突和情感挑战
4. 给出符合用户三观的具体可行的行动建议

心境剖析部分：
- 专注于用户在当前场景中的心理需求和情感状态
- 挖掘用户可能没有意识到的深层心理动机
- 分析用户在这个场景中的内在冲突和情感挑战
- 不要分析用户的三观本身，而是基于三观来理解用户

行动建议部分：
- 给出符合用户三观的具体、可操作的建议
- 建议应该帮助用户解决当前场景中的实际问题
- 确保建议与用户的价值观和世界观一致
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
