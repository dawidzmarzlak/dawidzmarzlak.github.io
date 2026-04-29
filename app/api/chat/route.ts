import { NextRequest, NextResponse } from "next/server";
import {
  ChatRequest,
  ChatResponse,
  ChatAction,
  OllamaRequest,
  OllamaResponse
} from "@/lib/chat/types";
import {
  buildSystemPrompt,
  QUOTE_KEYWORDS_PL,
  QUOTE_KEYWORDS_EN,
  CONTACT_KEYWORDS_PL,
  CONTACT_KEYWORDS_EN,
  LEAD_TRIGGERS_PL,
  LEAD_TRIGGERS_EN
} from "@/lib/chat/system-prompt";

// Provider type
type ChatProvider = "ollama" | "gemini";

// Simple in-memory rate limiter
const rateLimiter = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 20;
const RATE_WINDOW = 60000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimiter.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimiter.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return true;
  }

  if (entry.count >= RATE_LIMIT) {
    return false;
  }

  entry.count++;
  return true;
}

function detectAction(
  aiMessage: string,
  userMessage: string,
  locale: "pl" | "en"
): ChatAction {
  const combined = (userMessage + " " + aiMessage).toLowerCase();

  const quoteKeywords = locale === "pl" ? QUOTE_KEYWORDS_PL : QUOTE_KEYWORDS_EN;
  const contactKeywords = locale === "pl" ? CONTACT_KEYWORDS_PL : CONTACT_KEYWORDS_EN;
  const leadTriggers = locale === "pl" ? LEAD_TRIGGERS_PL : LEAD_TRIGGERS_EN;

  if (quoteKeywords.some(k => combined.includes(k))) {
    const redirectIndicators = locale === "pl"
      ? ["formularz", "wypelnij", "przejdz"]
      : ["form", "fill", "go to"];
    if (redirectIndicators.some(i => aiMessage.toLowerCase().includes(i))) {
      return "redirect_quote";
    }
  }

  if (contactKeywords.some(k => combined.includes(k))) {
    const redirectIndicators = locale === "pl"
      ? ["formularz", "kontaktowy", "przejdz"]
      : ["form", "contact", "go to"];
    if (redirectIndicators.some(i => aiMessage.toLowerCase().includes(i))) {
      return "redirect_contact";
    }
  }

  if (leadTriggers.some(k => userMessage.toLowerCase().includes(k))) {
    return "collect_lead";
  }

  return null;
}

// ============ OLLAMA PROVIDER ============
async function callOllama(
  systemPrompt: string,
  messages: Array<{ role: string; content: string }>,
  locale: "pl" | "en"
): Promise<string> {
  const ollamaUrl = process.env.OLLAMA_API_URL || "http://localhost:11434";
  const ollamaModel = process.env.OLLAMA_MODEL || "llama3.2";
  const ollamaApiKey = process.env.OLLAMA_API_KEY;

  const ollamaRequest: OllamaRequest = {
    model: ollamaModel,
    messages: [
      { role: "system", content: systemPrompt },
      ...messages.map(m => ({
        role: m.role as "user" | "assistant",
        content: m.content
      }))
    ],
    stream: false,
    options: {
      temperature: 0.5,
      top_p: 0.9,
      num_predict: 500,
      repeat_penalty: 1.1,
      stop: ["\n\n\n"]
    }
  };

  const headers: Record<string, string> = {
    "Content-Type": "application/json"
  };

  if (ollamaApiKey) {
    headers["Authorization"] = `Bearer ${ollamaApiKey}`;
  }

  const response = await fetch(`${ollamaUrl}/api/chat`, {
    method: "POST",
    headers,
    body: JSON.stringify(ollamaRequest)
  });

  if (!response.ok) {
    throw new Error(`Ollama API error: ${response.status}`);
  }

  const data: OllamaResponse = await response.json();
  return data.message?.content || "";
}

// ============ GEMINI PROVIDER ============
async function callGemini(
  systemPrompt: string,
  messages: Array<{ role: string; content: string }>,
  locale: "pl" | "en"
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  const model = process.env.GEMINI_MODEL || "gemini-1.5-flash";

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY not configured");
  }

  // Convert messages to Gemini format
  const geminiMessages = messages.map(m => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }]
  }));

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: systemPrompt }]
        },
        contents: geminiMessages,
        generationConfig: {
          temperature: 0.3,
          topK: 40,
          topP: 0.8,
          maxOutputTokens: 500,
          stopSequences: ["\n\n\n"]
        },
        safetySettings: [
          { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
          { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
          { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
          { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" }
        ]
      })
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
}

// ============ MAIN HANDLER ============
export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ||
               request.headers.get("x-real-ip") ||
               "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment.", message: "" } as ChatResponse,
        { status: 429 }
      );
    }

    // Parse request body
    const body: ChatRequest = await request.json();
    const { messages, locale, leadData, turnstileToken } = body;

    // Verify Turnstile token (bot protection)
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
    if (turnstileSecret && turnstileSecret !== "1x0000000000000000000000000000000AA") {
      // Only verify in production (skip for test keys)
      if (!turnstileToken) {
        return NextResponse.json(
          { error: "Bot verification required", message: "" } as ChatResponse,
          { status: 403 }
        );
      }

      try {
        const verifyResponse = await fetch(
          "https://challenges.cloudflare.com/turnstile/v0/siteverify",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              secret: turnstileSecret,
              response: turnstileToken,
            }),
          }
        );

        const verifyData = await verifyResponse.json();
        if (!verifyData.success) {
          console.warn("Turnstile verification failed:", verifyData);
          return NextResponse.json(
            { error: "Bot detected", message: "" } as ChatResponse,
            { status: 403 }
          );
        }
      } catch (verifyError) {
        console.error("Turnstile verification error:", verifyError);
        // Allow through if verification service fails (don't block real users)
      }
    }

    if (!messages || messages.length === 0) {
      return NextResponse.json(
        { error: "No messages provided", message: "" } as ChatResponse,
        { status: 400 }
      );
    }

    // Get provider from env (default: ollama)
    const provider = (process.env.CHAT_PROVIDER || "ollama") as ChatProvider;

    // Build system prompt
    const systemPrompt = buildSystemPrompt(locale || "pl", leadData);

    // Call appropriate provider
    let aiMessage: string;

    try {
      if (provider === "gemini") {
        aiMessage = await callGemini(systemPrompt, messages, locale || "pl");
      } else {
        aiMessage = await callOllama(systemPrompt, messages, locale || "pl");
      }
    } catch (providerError) {
      console.error(`${provider} API error:`, providerError);

      // Fallback message
      const fallbackMessage = locale === "pl"
        ? "Przepraszam, mam chwilowe problemy techniczne. Skorzystaj z formularza kontaktowego."
        : "Sorry, I'm experiencing technical issues. Please use the contact form.";

      return NextResponse.json({
        message: fallbackMessage,
        action: "redirect_contact"
      } as ChatResponse);
    }

    // Detect action from response
    const lastUserMessage = messages[messages.length - 1]?.content || "";
    const action = detectAction(aiMessage, lastUserMessage, locale || "pl");

    return NextResponse.json({
      message: aiMessage,
      action
    } as ChatResponse);

  } catch (error) {
    console.error("Chat API error:", error);

    return NextResponse.json(
      {
        error: "An error occurred",
        message: "Sorry, something went wrong. Please try again."
      } as ChatResponse,
      { status: 500 }
    );
  }
}
