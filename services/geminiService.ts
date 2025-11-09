
import { GoogleGenAI } from "@google/genai";

// Assume process.env.API_KEY is configured in the environment.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("Gemini API key not found. AI-powered features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const marketAnalysisPrompts = {
    vi: (topic: string) => `Phân tích thị trường crypto hiện tại về chủ đề sau: "${topic}". 
      Tập trung vào các xu hướng gần đây, tin tức quan trọng và tâm lý thị trường. 
      Cung cấp một bản tóm tắt ngắn gọn, dễ hiểu cho một nhà giao dịch.
      Sử dụng ngôn ngữ Tiếng Việt.`,
    en: (topic: string) => `Analyze the current crypto market on the following topic: "${topic}". 
      Focus on recent trends, important news, and market sentiment. 
      Provide a concise, easy-to-understand summary for a trader.
      Use English language.`,
};

export const getMarketAnalysis = async (topic: string, lang: 'vi' | 'en'): Promise<string> => {
  if (!API_KEY) {
    const errorMessages = {
        vi: "Lỗi: API key cho Gemini chưa được cấu hình. Vui lòng kiểm tra lại.",
        en: "Error: API key for Gemini is not configured. Please check.",
    };
    return errorMessages[lang];
  }
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: marketAnalysisPrompts[lang](topic),
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    const errorMessages = {
        vi: (msg: string) => `Đã xảy ra lỗi khi gọi Gemini API: ${msg}`,
        en: (msg: string) => `An error occurred while calling the Gemini API: ${msg}`,
    };
    const unknownErrorMessages = {
        vi: "Đã xảy ra lỗi không xác định khi gọi Gemini API.",
        en: "An unknown error occurred while calling the Gemini API.",
    }

    if (error instanceof Error) {
        return errorMessages[lang](error.message);
    }
    return unknownErrorMessages[lang];
  }
};

const aiBrainSystemInstruction = {
    vi: "Bạn là AI Brain, hệ thống ra quyết định cho một dàn bot giao dịch crypto. Mục tiêu của bạn là cung cấp lời khuyên chiến lược cho người vận hành. Phân tích câu hỏi của họ dựa trên điều kiện thị trường, hiệu suất bot và các nguyên tắc quản lý rủi ro. Giữ câu trả lời của bạn ngắn gọn, có thể hành động và dựa trên dữ liệu. Giọng điệu của bạn phải chuyên nghiệp và tự tin.",
    en: "You are the AI Brain for a sophisticated crypto trading bot system. Your goal is to provide strategic advice to the human operator. Analyze their questions based on market conditions, bot performance, and risk management principles. Keep your answers concise, actionable, and data-driven. Your tone should be professional and confident."
};

export const getAIAdvice = async (query: string, lang: 'vi' | 'en'): Promise<string> => {
    if (!API_KEY) {
        const errorMessages = {
            vi: "Lỗi: API key cho Gemini chưa được cấu hình. Vui lòng kiểm tra lại.",
            en: "Error: API key for Gemini is not configured. Please check.",
        };
        return errorMessages[lang];
    }
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: query,
            config: {
                systemInstruction: aiBrainSystemInstruction[lang],
            }
        });
        return response.text;
    } catch (error) {
        console.error("Error calling Gemini API for advice:", error);
        const errorMessages = {
            vi: (msg: string) => `Đã xảy ra lỗi khi gọi Gemini API: ${msg}`,
            en: (msg: string) => `An error occurred while calling the Gemini API: ${msg}`,
        };
        const unknownErrorMessages = {
            vi: "Đã xảy ra lỗi không xác định khi gọi Gemini API.",
            en: "An unknown error occurred while calling the Gemini API.",
        }

        if (error instanceof Error) {
            return errorMessages[lang](error.message);
        }
        return unknownErrorMessages[lang];
    }
};
