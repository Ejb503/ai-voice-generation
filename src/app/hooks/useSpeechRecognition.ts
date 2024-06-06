import { useState, useCallback, useRef } from "react";
import { updateVolume } from "./utils/utils";

declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

export const useSpeechRecognition = () => {
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(
    null
  );
  const [transcript, setTranscript] = useState<string | null>(null);
  const [volume, setVolume] = useState<number>(0);
  const mediaStream = useRef<MediaStream | null>(null);

  const startRecognition = useCallback(() => {
    if ("webkitSpeechRecognition" in window) {
      navigator.mediaDevices
        .getUserMedia({ audio: true, video: false })
        .then((stream) => {
          mediaStream.current = stream;
          const recognition = new webkitSpeechRecognition();
          recognition.lang = "en-US";
          recognition.onresult = (event) => {
            if (event.results.length > 0) {
              const result = event.results[event.results.length - 1];
              if (result.isFinal) {
                setTranscript(result[0].transcript);
              }
            }
          };
          recognition.onspeechend = () => {
            recognition.stop();
            setRecognition(null);
          };
          recognition.start();
          setTranscript(null);
          setRecognition(recognition);

          const audioContext = new AudioContext();
          const source = audioContext.createMediaStreamSource(stream);
          const analyser = audioContext.createAnalyser();
          analyser.fftSize = 256;
          source.connect(analyser);
          const bufferLength = analyser.frequencyBinCount;
          const dataArray = new Uint8Array(bufferLength);

          updateVolume(analyser, dataArray, bufferLength, setVolume);
          setTimeout(() => {
            setTranscript(
              "We didnt hear you properly. Try again and speak more clearly!!"
            );
            if (recognition) {
              recognition.stop();
              setRecognition(null);
            }
          }, 7500);
        })
        .catch((err) => {
          console.error("Error accessing microphone:", err);
        });
    }
  }, []);

  const stopRecognition = () => {
    if (recognition) {
      recognition.stop();
    }
    if (mediaStream.current) {
      mediaStream.current.getTracks().forEach((track) => track.stop());
    }
  };

  return { startRecognition, stopRecognition, transcript, volume };
};
