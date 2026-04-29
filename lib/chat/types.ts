export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface LeadData {
  name?: string;
  email?: string;
  phone?: string;
}

export type ChatAction = "collect_lead" | "redirect_contact" | "redirect_quote" | null;

export interface ChatRequest {
  messages: Array<{
    role: "user" | "assistant";
    content: string;
  }>;
  locale: "pl" | "en";
  leadData?: LeadData;
  turnstileToken?: string | null;
}

export interface ChatResponse {
  message: string;
  action?: ChatAction;
  error?: string;
}

export interface OllamaMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface OllamaRequest {
  model: string;
  messages: OllamaMessage[];
  stream: boolean;
  options?: {
    temperature?: number;
    top_p?: number;
    num_predict?: number;
    repeat_penalty?: number;
    stop?: string[];
  };
}

export interface OllamaResponse {
  model: string;
  message: {
    role: string;
    content: string;
  };
  done: boolean;
}
