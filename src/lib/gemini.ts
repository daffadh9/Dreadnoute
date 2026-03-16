import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export const geminiModel = genAI?.getGenerativeModel({ model: "gemini-2.5-flash" });

/**
 * Generates an image prompt using Gemini based on a user's basic description.
 * This prompt can then be used with an image generation service.
 */
export async function generateImagePrompt(userPrompt: string, type: "avatar" | "cover") {
  if (!geminiModel) throw new Error("Gemini API key not configured");

  const context = type === "avatar" 
    ? "horror character avatar, professional archivist, dark atmospheric, mysterious"
    : "horror landscape, eerie background, cinematic cinematic wide shot, dreadnoute theme";

  const prompt = `You are a creative director for a horror-themed application called 'DreadNoute'. 
  The user wants to generate a ${type} based on this idea: "${userPrompt}".
  
  Please expand this into a highly detailed, professional prompt for an AI image generator (like Midjourney or DALL-E).
  The style must be: Dark, Moody, Gothic, High-Detail, and Horror-themed.
  
  Output ONLY the expanded prompt text, nothing else.`;

  const result = await geminiModel.generateContent(prompt);
  return result.response.text();
}
