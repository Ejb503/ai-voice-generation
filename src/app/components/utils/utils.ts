//  API endpoints
const SUBSCRIBE_API = "/api/v1/groq";
const STREAM_API = "/api/v1/deepgram";

// Headers
const JSON_HEADER = { "Content-Type": "application/json" };
const TEXT_HEADER = { "Content-Type": "text/plain" };

/**
 * Sends a POST request to the subscribe API with the given transcript.
 */
export async function postSubscribe(transcript: string): Promise<Response> {
  const response = await fetch(SUBSCRIBE_API, {
    method: "POST",
    headers: TEXT_HEADER,
    body: transcript,
  });
  return response;
}

/**
 * Sends a POST request to the stream API with the given content.
 */
export async function postStream(content: string): Promise<Blob> {
  const parsedContent = JSON.stringify(content.slice(0, 1000));
  const response = await fetch(STREAM_API, {
    method: "POST",
    headers: JSON_HEADER,
    body: parsedContent,
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.blob();
}

/**
 * Extracts a JSON string from the given message.
 */
export function extractJson(message: string): string {
  const start = message.indexOf("{");
  const end = message.lastIndexOf("}") + 1;
  return message.substring(start, end);
}

/**
 * Processes the audio stream for the given transcript.
 */
export const processAudioStream = async (
  transcript: string,
  setAudioUrl: (url: string | null) => void
): Promise<void> => {
  try {
    const response = await postSubscribe(transcript);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (response.body) {
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          console.log("Stream complete");
          break;
        }

        const text = decoder.decode(value);
        const messages = text.split("\n\n");

        for (const message of messages) {
          const jsonData = extractJson(message);
          if (jsonData) {
            const data = JSON.parse(jsonData);
            const audioBlob = await postStream(data.message);
            const audioUrl = URL.createObjectURL(audioBlob);
            console.log("Audio URL:", audioUrl);
            setAudioUrl(audioUrl);
          }
        }
      }
    }
  } catch (error) {
    console.error("Error processing audio:", error);
  }
};
