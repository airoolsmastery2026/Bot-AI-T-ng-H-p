import { GoogleGenAI } from "@google/genai";

// Assume process.env.API_KEY is configured in the environment.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("Gemini API key not found. Market Analysis feature will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const prompts = {
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
      contents: prompts[lang](topic),
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
