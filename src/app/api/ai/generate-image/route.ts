import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_IMAGE_MODELS = [
  "gemini-3.1-flash-image-preview",
  "gemini-3-pro-image-preview",
  "gemini-2.5-flash-image",
];

async function generateWithGeminiREST(
  apiKey: string,
  model: string,
  prompt: string,
  isAvatar: boolean
): Promise<string | null> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const body = {
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: {
      responseModalities: ["IMAGE", "TEXT"],
    },
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(30000),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`${model} REST error ${res.status}: ${err}`);
  }

  const data = await res.json();
  const parts = data?.candidates?.[0]?.content?.parts ?? [];

  for (const part of parts) {
    if (part?.inlineData?.mimeType?.startsWith("image/")) {
      return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
    }
  }

  return null;
}

export async function POST(req: NextRequest) {
  try {
    const { prompt, type } = await req.json();
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "Gemini API key not configured" }, { status: 500 });
    }

    const isAvatar = type === "avatar";

    // Step 1: Expand prompt dengan Gemini 2.5 Flash (teks)
    const genAI = new GoogleGenerativeAI(apiKey);
    const textModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const styleGuide = isAvatar
      ? "a dark gothic horror character portrait, close-up face, dramatic lighting"
      : "an ultra-wide cinematic horror landscape banner, wide composition, ominous sky";

    const expandRequest = `You are an expert AI image prompt engineer for the horror app DreadNoute.

Transform this input into a highly detailed image generation prompt for ${styleGuide}:

USER INPUT: "${prompt}"

Add: specific textures, horror atmosphere, cinematic lighting, 8K photorealistic quality.
Max 150 words. Output ONLY the prompt text.`;

    const textResult = await textModel.generateContent(expandRequest);
    const detailedPrompt = textResult.response.text().trim();
    console.log("✅ Expanded prompt:", detailedPrompt);

    // Step 2: Coba setiap Gemini image model via REST API
    for (const model of GEMINI_IMAGE_MODELS) {
      try {
        console.log(`🎨 Trying Gemini image model: ${model}`);
        const imageUrl = await generateWithGeminiREST(apiKey, model, detailedPrompt, isAvatar);
        if (imageUrl) {
          console.log(`✅ Success with ${model}`);
          return NextResponse.json({ imageUrl, detailedPrompt, source: model });
        }
      } catch (err: any) {
        console.warn(`❌ ${model} failed:`, err.message.slice(0, 100));
      }
    }

    // Step 3: Fallback Pollinations flux-pro (fetch server-side → base64)
    console.log("⚠️ All Gemini image models failed. Falling back to Pollinations...");
    const width = isAvatar ? 768 : 1344;
    const height = isAvatar ? 768 : 768;
    const seed = Math.floor(Math.random() * 9999999);
    const neg = "blurry, low quality, watermark, text, cartoon, anime, ugly, distorted, nsfw";

    const pollinationsUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(
      `${detailedPrompt}, masterpiece, best quality, ultra detailed`
    )}?width=${width}&height=${height}&seed=${seed}&nologo=true&model=flux-pro&negative=${encodeURIComponent(neg)}&enhance=true`;

    const imgRes = await fetch(pollinationsUrl, { signal: AbortSignal.timeout(55000) });
    if (!imgRes.ok) throw new Error(`Pollinations error: ${imgRes.status}`);

    const buffer = await imgRes.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");
    const mime = imgRes.headers.get("content-type") || "image/jpeg";

    return NextResponse.json({
      imageUrl: `data:${mime};base64,${base64}`,
      detailedPrompt,
      source: "pollinations-flux-pro",
    });

  } catch (error: any) {
    console.error("AI Generation Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
