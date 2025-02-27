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
export const AVAILABLE_MODELS: Record<string, ModelConfig> = {
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
export const DEFAULT_MODEL_ID = "deepseek-v3-free";