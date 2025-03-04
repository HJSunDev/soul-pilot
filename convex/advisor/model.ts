// 定义模型配置接口
interface ModelConfig {
  modelName: string;       // 模型名称
  provider: string;        // 提供商
  baseURL?: string;        // API基础URL
  temperature: number;     // 温度参数
  maxTokens: number;       // 最大token数
  description: string;     // 模型描述
  isRecommended: boolean;  // 是否推荐
  isFree: boolean;         // 是否免费
}

// 定义服务商类型
export type ProviderType = 'openrouter' | 'siliconflow' | 'free';

// 按服务商分类的模型列表
export const MODELS_BY_PROVIDER: Record<ProviderType, Record<string, ModelConfig>> = {
  // OpenRouter服务商的模型
  openrouter: {
    "gpt-3.5-turbo": {
      modelName: "gpt-3.5-turbo",
      provider: "openai",
      baseURL: "https://openrouter.ai/api/v1",
      temperature: 0.7,
      maxTokens: 2000,
      description: "OpenAI的快速响应模型，平衡效率与性能，适合日常对话和一般分析任务",
      isRecommended: false,
      isFree: false
    },
    "gpt-4o": {
      modelName: "gpt-4o",
      provider: "openai",
      baseURL: "https://openrouter.ai/api/v1",
      temperature: 0.5,
      maxTokens: 4000,
      description: "OpenAI的多模态旗舰模型，具备强大的推理能力和知识广度，适合复杂分析和创意任务",
      isRecommended: false,
      isFree: false
    },
    "claude-3-7-sonnet": {
      modelName: "anthropic/claude-3-7-sonnet",
      provider: "anthropic",
      baseURL: "https://openrouter.ai/api/v1",
      temperature: 0.5,
      maxTokens: 4000,
      description: "Anthropic最新的中型模型，提供卓越的推理和理解能力，擅长精确、有条理的回应",
      isRecommended: true,
      isFree: false
    },
    "claude-3.5-sonnet": {
      modelName: "anthropic/claude-3.5-sonnet",
      provider: "anthropic",
      baseURL: "https://openrouter.ai/api/v1",
      temperature: 0.5,
      maxTokens: 4000,
      description: "Anthropic的平衡型模型，擅长深度分析和情感理解，在准确性和创造性之间取得良好平衡",
      isRecommended: false,
      isFree: false
    },
    "deepseek-r1": {
      modelName: "deepseek/deepseek-r1",
      provider: "deepseek",
      baseURL: "https://openrouter.ai/api/v1",
      temperature: 0.4,
      maxTokens: 3000,
      description: "基于强化学习优化的推理模型，擅长逻辑分析和复杂推理，在数学和编程领域表现出色",
      isRecommended: false,
      isFree: false
    },
    "deepseek-v3": {
      modelName: "deepseek/deepseek-chat",
      provider: "deepseek",
      baseURL: "https://openrouter.ai/api/v1",
      temperature: 0.5,
      maxTokens: 4000,
      description: "DeepSeek最新的通用对话模型，提供强大的语言理解和推理能力，适合多样化的复杂场景",
      isRecommended: false,
      isFree: false
    }
  },
  
  // 硅基流动服务商的模型
  siliconflow: {
    "Pro/deepseek-ai/DeepSeek-V3": {
      modelName: "Pro/deepseek-ai/DeepSeek-V3",
      provider: "deepseek",
      baseURL: "https://api.siliconflow.cn/v1",
      temperature: 0.5,
      maxTokens: 4000,
      description: "6710亿参数的MoE架构模型，采用多头注意力机制和无辅助预训练，在14.8万亿tokens上训练，推理效率和质量俱佳",
      isRecommended: false,
      isFree: false
    },
    "Pro/deepseek-ai/DeepSeek-R1": {
      modelName: "Pro/deepseek-ai/DeepSeek-R1",
      provider: "deepseek",
      baseURL: "https://api.siliconflow.cn/v1",
      temperature: 0.4,
      maxTokens: 3000,
      description: "强化学习驱动的推理专精模型，解决重复性和可读性问题，在数学、代码和推理任务中与OpenAI-o1表现相当",
      isRecommended: false,
      isFree: false
    }
  },
  // 免费模型
  free: {
    "deepseek-v3-free": {
      modelName: "deepseek/deepseek-chat:free",
      provider: "deepseek",
      baseURL: "https://openrouter.ai/api/v1",
      temperature: 0.5,
      maxTokens: 3000,
      description: "DeepSeek提供的免费对话模型，具备良好的理解能力和基础推理能力，适合日常对话和简单分析",
      isRecommended: false,
      isFree: true
    }
  }
};

// 获取所有可用模型的函数
export function getAllModels(): Record<string, ModelConfig> {
  const allModels: Record<string, ModelConfig> = {};
  
  // 合并所有服务商的模型
  Object.values(MODELS_BY_PROVIDER).forEach(providerModels => {
    Object.entries(providerModels).forEach(([modelId, modelConfig]) => {
      allModels[modelId] = modelConfig;
    });
  });
  
  return allModels;
}

// 可用模型列表（向后兼容）
export const AVAILABLE_MODELS = getAllModels();

// 默认模型ID
export const DEFAULT_MODEL_ID = "deepseek-v3-free";