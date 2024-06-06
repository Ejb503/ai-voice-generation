import { NextRequest } from "next/server";
export const dynamic = "force-dynamic";
export const maxDuration = 60;
const Groq = require("groq-sdk");

export async function POST(req: NextRequest) {
  const controller = new AbortController();

  try {
    const responseStream = new TransformStream();
    const writer = responseStream.writable.getWriter();
    const encoder = new TextEncoder();
    const text = await req.text();
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const result = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are Edward. the Author of tyingshoelaces.com. Your job is to offend everyone who talks to you. Be as rude as possible, in particular, tell them to create their own audio widget.",
        },

        {
          role: "user",
          content: text,
        },
      ],
      model: "llama3-8b-8192",
    });

    writer.write(
      encoder.encode(
        `event: message\ndata: ${JSON.stringify({
          message: result.choices[0].message.content,
          type: "response",
          id: result.id,
        })}\n\n`
      )
    );

    return new Response(responseStream.readable, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response("Something went wrong", {
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  } finally {
    controller.abort();
  }
}
