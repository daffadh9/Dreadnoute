import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import { NextRequest, NextResponse } from "next/server";

// Kurator yang "tahu terlalu banyak": Cold, slow, long pauses, flat tonality
function formatColdPacing(text: string): string {
  // Replace standard punctuation with long ellipses to force the TTS to pause heavily
  return text.trim()
    .replace(/\.\s+/g, '...\n\n...\n')
    .replace(/\,\s+/g, '... ')
    .replace(/\?\s+/g, '?...\n\n')
    .replace(/\!\s+/g, '...\n\n');
}

function dramatizeText(sections: { title: string; content: string }[], voiceStyle: string): string {
  const narrativeSections = sections.map((section, index) => {
    const contentText = Array.isArray(section.content) ? (section.content as string[]).join(". ") : section.content;
    const pacedTitle = formatColdPacing(section.title);
    const pacedContent = formatColdPacing(contentText);
    
    // Very long pauses between sections
    return `...\n\n...\n\n${pacedTitle}...\n\n${pacedContent}`;
  });

  const fullContent = narrativeSections.join("");

  if (voiceStyle === "saksi") {
    return `...\n\nSaya... harus menceritakan ini...\n\n...\n\nsebelum semuanya... terlambat...\n\n...\n\n${fullContent}\n\n...\n\nItu... yang terjadi. Jangan pergi kesana... jangan pernah.`;
  }

  if (voiceStyle === "forbidden") {
    return `...\n\nArsip terlarang. Tingkat akses... hitam.\n\n...\n\n${fullContent}\n\n...\n\nLog ditutup.`;
  }

  // Default: kurator — cold, knowing too much, monotonous
  return `...\n\nArsip Dread-noute... berkas dibuka...\n\n...\n\n${fullContent}\n\n...\n\nKembalikan arsip ke lemari besi... dan jangan menoleh ke belakang.`;
}

export async function POST(req: NextRequest) {
  try {
    const { sections, voiceStyle } = await req.json();

    if (!sections || sections.length === 0) {
      return NextResponse.json(
        { error: "Tidak ada konten arsip untuk dibacakan." },
        { status: 400 }
      );
    }

    // Bungkus semua section menjadi satu narasi dramatis
    const narrativeText = dramatizeText(sections, voiceStyle || "kurator");

    // Setup ElevenLabs client
    const elevenLabsApiKey = process.env.ELEVENLABS_API_KEY || "sk_bd54a3c4d30176317408bc39c26b4ca199833a90bb43e433";
    const elevenlabs = new ElevenLabsClient({ apiKey: elevenLabsApiKey });

    const voiceId = process.env.ELEVENLABS_VOICE_ID || "dvWFQHCY2Y64dYruqGaE";

    const audioStream = await elevenlabs.textToSpeech.convert(voiceId, {
      text: narrativeText,
      model_id: "eleven_multilingual_v2",
      output_format: "mp3_44100_128",
      voice_settings: {
        stability: 0.95, // VERY HIGH: keeps emotion completely flat and cold
        similarity_boost: 0.70,
        style: 0.0, // VERY LOW: removes exaggerated dramatic fluctuations (acts like reading facts)
        use_speaker_boost: false, // LOW ENERGY: adds a subtle whisper feel
      }
    } as any);

    // Convert stream ke Base64
    const arrayBuffer = await new Response(audioStream as any).arrayBuffer();
    const audioBuffer = Buffer.from(arrayBuffer);
    const audioBase64 = audioBuffer.toString("base64");

    // Kirim balik audio + jumlah section untuk timing di frontend
    return NextResponse.json({ 
      audioBase64,
      sectionCount: sections.length,
      totalCharacters: narrativeText.length,
    });

  } catch (error: any) {
    console.error("ElevenLabs TTS Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
