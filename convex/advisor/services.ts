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
    modelId: v.string(),
    apiKey: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    try {
      // 获取模型配置
      const modelId = args.modelId || DEFAULT_MODEL_ID;
      const modelConfig = AVAILABLE_MODELS[modelId];
      
      if (!modelConfig) {
        return {
          content: {
            analysis: { points: [] },
            actions: { points: [] },
            fullContent: `未找到ID为 ${modelId} 的模型配置`,
          },
          error: `未找到ID为 ${modelId} 的模型配置`,
          timestamp: new Date().toISOString(),
          status: "error",
          isStructured: false,
        };
      }

      // 确定使用哪个 API Key
      let apiKey: string;
      
      if (modelConfig.isFree) {
        // 对于免费模型，使用环境变量中的 API Key
        apiKey = process.env.OPENAI_API_KEY || '';
        if (!apiKey) {
          return {
            content: {
              analysis: { points: [] },
              actions: { points: [] },
              fullContent: "系统配置错误：未找到环境变量中的 API Key",
            },
            error: "系统配置错误：未找到环境变量中的 API Key",
            timestamp: new Date().toISOString(),
            status: "error",
            isStructured: false,
          };
        }
      } else {
        // 对于付费模型，使用传入的 API Key
        if (!args.apiKey) {
          return {
            content: {
              analysis: { points: [] },
              actions: { points: [] },
              fullContent: "使用付费模型需要提供 API Key",
            },
            error: "使用付费模型需要提供 API Key",
            timestamp: new Date().toISOString(),
            status: "error",
            isStructured: false,
          };
        }
        apiKey = args.apiKey;

        // 清理 API Key，移除可能的前后空格
        apiKey = apiKey.trim();
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

      // 调用AI模型生成响应
      // response对象结构为AIMessage，包含以下主要属性：
      // - id: 响应的唯一标识符
      // - content: AI生成的完整响应内容，通常为JSON格式字符串
      // - additional_kwargs: 额外的元数据
      // - response_metadata: 包含token使用情况和模型信息
      //   - tokenUsage: 包含promptTokens, completionTokens, totalTokens
      //   - finish_reason: 模型停止生成的原因
      //   - model_name: 使用的模型名称
      // - tool_calls: 工具调用信息（如果有）
      // - invalid_tool_calls: 无效的工具调用信息（如果有）
      // - usage_metadata: 更详细的token使用信息
      const response = await model.invoke(prompt);

      // 创建字符串输出解析器
      const stringOutputParser = new StringOutputParser();
      // 获取到 响应对象的content属性值，为ai响应字符串内容，对于我们的需求，获得的是json字符串，还需要把json字符串转换为对象
      const responseText = await stringOutputParser.invoke(response);
      
      // 尝试解析结构化输出
      try {
        // 将responseText(json字符串)转换为对象,是我们需要的结构化json对象
        // 结构化json对象的结构如下：
        // {
        //   analysis: {
        //     points: [
        //       '你当前的心理需求是希望与这个女生建立更深的情感连接，但又担心这种情感会影响到你的自我成长和人格独立。',
        //       '深层心理动机可能是你在寻找‘真正的自己’的过程中，希望通过这段关系来验证或确认自己的情感需求和价值取向。',
        //       '内在冲突在于你既想保持谦恭和尊重，又担心过于主动或被动会影响到这段关系的健康发展。'
        //     ]
        //   },
        //   actions: {
        //     points: [
        //       '尊重自己的情感，同时保持谦恭的态度，尝试与女生进行坦诚的沟通，表达你的感受和想法。',
        //       '在追求这段关系的过程中，继续关注自我成长，确保你的情感需求不会影响到你的人格独立和经济独立。',
        //       '与女生的家长进行私下沟通，确保双方都能理解和支持这段关系，避免不必要的误解和冲突。'
        //     ]
        //   },
        //   fullContent: '你当前的心理需求是希望与这个女生建立更深的情感连接，但又担心这种情感会影响到你的自我成长和人格独立。深层心理动机可能是你在寻找‘真正的自己’的过程中，希望通过这段关系来验证或确认自己的情感需求和价值取向。内在冲突在于你既想保持谦恭和尊重，又担心过于主动或被动会影响到这段关系的健康发展。基于你的三观，建议你尊重自己的情感，同时保持谦恭的态度，尝试与女生进行坦诚的沟通，表达你的感受和想法。在追求这段关系的过程中，继续关注自我成长，确保你的情感需求不会影响到你的人格独立和经济独立。与女生的家长进行私下沟通，确保双方都能理解和支持这段关系，避免不必要的误解和冲突。'
        // }
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



// 使用 Zod 定义三观分析输出的模式
const viewpointAnalysisSchema = z.object({
  results: z.array(
    z.object({
      type: z.enum(['世界观', '人生观', '价值观']),
      percentage: z.number().min(0).max(100),
      explanation: z.string(),
    })
  ).length(3),
  summary: z.string().describe("对用户三观倾向的总体分析，明确这个观念属于哪种三观类型，并给出解释，以第二人称视角回答"),
});

// 分析用户输入的文本属于哪种三观类型的API接口
export const analyzeViewpoint = action({
  args: {
    text: v.string(),
  },
  handler: async (ctx, args) => {
    // 从convex服务端环境中获取OpenRouter服务的API密钥
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error("OpenAI API key not found in environment variables");
    }

    try {
      // 始终使用免费模型
      const modelId = "deepseek-v3-free";
      const modelConfig = AVAILABLE_MODELS[modelId];
      
      if (!modelConfig) {
        throw new Error(`未找到免费模型配置 (deepseek-v3-free)`);
      }

      // 创建结构化输出解析器
      const parser = StructuredOutputParser.fromZodSchema(viewpointAnalysisSchema);
      // 获取格式化指令
      const formatInstructions = parser.getFormatInstructions();

      // 创建提示模板
      const promptTemplate = PromptTemplate.fromTemplate(`
你是一个专业的三观分析专家，你的任务是分析用户输入的观念属于哪种三观类型（世界观、人生观、价值观）。

三观的定义：
1. 世界观：人们对整个世界的总体看法和根本观点，包括对自然、社会和思维发展的基本规律的认识和观点。
2. 人生观：人们对人生目的、价值、意义的根本看法和态度，是人们对"人为什么活着"这一根本问题的回答。
3. 价值观：人们对事物价值的根本看法和评价标准，是判断是非、善恶、美丑的基本准则。

用户输入的观念：
{text}

请分析这个观念在三种三观类型中各自的占比（百分比，三种类型总和为100%），并给出解释。

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
        text: args.text,
        format_instructions: formatInstructions,
      });

      // 调用AI模型生成响应
      const response = await model.invoke(prompt);

      // 创建字符串输出解析器
      const stringOutputParser = new StringOutputParser();
      // 获取响应文本
      const responseText = await stringOutputParser.invoke(response);
      
      // 尝试解析结构化输出
      try {
        const structuredOutput = await parser.parse(responseText);

        // 返回成功结果
        return {
          results: structuredOutput.results,
          summary: structuredOutput.summary,
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
          results: [],
          summary: responseText || "无法解析AI回复",
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
        results: [],
        summary: `抱歉，在处理您的请求时遇到了问题：${error instanceof Error ? error.message : "未知错误"}`,
        error: error instanceof Error ? error.message : "Unknown error occurred",
        timestamp: new Date().toISOString(),
        status: "error",
        isStructured: false,
      };
    }
  },
});
