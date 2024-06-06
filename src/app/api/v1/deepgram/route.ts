import { NextRequest } from "next/server";
import { createClient } from "@deepgram/sdk";

const API_KEY = process.env.DEEPGRAM_API_KEY;
if (!API_KEY) {
  throw new Error("No API key provided");
}
const deepgram = createClient(API_KEY);

export async function POST(req: NextRequest) {
  const controller = new AbortController();

  try {
    const { readable, writable } = new TransformStream();
    const data = await req.text();

    const response = await deepgram.speak.request(
      { text: data },
      {
        model: "aura-perseus-en",
        encoding: "linear16",
        container: "wav",
      }
    );
    const stream = await response.getStream();
    if (!stream) return new Response("No stream available");

    // Pipe the audio stream to the writable stream
    stream.pipeTo(writable);

    return new Response(readable, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "audio/wav",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Error in text-to-speech function:", error);
    throw error;
  } finally {
    controller.abort();
  }
}
