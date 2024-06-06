```markdown
# AI Powered Voice Chat Demo

## Overview

Edward here. I’ve built a simple version of OpenAI's voice functionality using free APIs. This demo lets you talk, listen, and converse with LLMs. Original blog post is here: - **Blog:** [Blog Post](https://tyingshoelaces.com/blog/ai-voice-generation)
Youtube video is here: [YouTube Video](https://youtu.be/3zPeOpOEmyQ)

Feel free to play around and tell me what you think!

## Tech Stack

- **LLM Host:** Groq
- **LLM:** LLAMA 3
- **TTS:** DeepGram
- **STT:** SpeechRecognition API
- **Web Framework:** NextJS (React front-end, Express API)

## How to use

1. download the repo
2. npm i
3. setup .env.local with DEEPGRAM_API_KEY and GROQ_API_KEY
4. npm run dev

## Hints and tricks

You'll probably want to switch out SpeechRecognition for Whisper AI if you want non-chrome / more stable
There is a lot of investment needed in handling state in the AudioPlayer, not necessary for this demo
Playing with the prompts and context going to Groq is the key for personalisation
Contact me for feedback!

## What I Did

I built a demo where you can:

1. Talk into the browser using the WebSpeechRecognitionAPI.
2. Stream the transcribed text to Groq for processing.
3. Stream the response from Groq to DeepGram for text-to-speech conversion.
4. Play the generated audio response in the browser.

- **NextJS:** ★★★★★ - Wonderful technology, simplifies client and server-side development.
- **Groq:** ★★★★★ - New benchmarks in speed and cost.
- **Llama3:** ★★★★☆ - Noticeable difference from GPT-io, great for cheap requests and demos.
- **DeepGram:** ★★★☆☆ - Generous starting credits, good latency. Still green as a tech.

## Links

- **Demo:** [AI Voice Generation Demo](https://tyingshoelaces.com/ai-voice-generation-demo)
- **GitHub Repository:** [GitHub](https://github.com/Ejb503/ai-voice-generation)
- **Video:** [YouTube Video](https://youtu.be/3zPeOpOEmyQ)
- **Blog:** [Blog Post](https://tyingshoelaces.com/blog/ai-voice-generation)

---

Edward Ejb503, [Tying Shoelaces Blog](https://tyingshoelaces.com)
```
