"use client";
import React, { useState, useRef, useEffect } from "react";
import { useSpeechRecognition } from "../hooks/useSpeechRecognition";
import { processAudioStream } from "./utils/utils";
import SpeechAnimation from "./speech-animation";
import Controls from "./controls";

const AudioWidget: React.FC = () => {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [canPlay, setCanPlay] = useState(false);
  const { startRecognition, stopRecognition, transcript, volume } =
    useSpeechRecognition();
  const [checkResult, setCheckResult] = useState<string>("");

  const checkSpeechRecognitionAndMicrophonePermission = async () => {
    if (!("webkitSpeechRecognition" in window)) {
      console.error(
        "Web Speech Recognition API is not available in this browser. "
      );
      return "Web Speech Recognition API is not available in this browser. Please use Chrome";
    }

    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      return "Web Speech Recognition API is available and Microphone has permission.";
    } catch (error) {
      console.error("Microphone permission has not been given:", error);
      return "Microphone permission has not been given:";
    }
  };
  useEffect(() => {
    checkSpeechRecognitionAndMicrophonePermission().then((result) => {
      setCheckResult(result);
    });
  }, []);

  useEffect(() => {
    if (audioUrl) {
      setCanPlay(true);
      audioRef.current = new Audio(audioUrl);
      audioRef.current.addEventListener("play", () => {
        stopRecognition();
        setIsPlaying(true);
      });
      audioRef.current.addEventListener("pause", () => setIsPlaying(false));
      audioRef.current.play();
    }
    return () => {
      setCanPlay(false);
      if (audioRef.current) {
        audioRef.current.removeEventListener("play", () => setIsPlaying(true));
        audioRef.current.removeEventListener("pause", () =>
          setIsPlaying(false)
        );
        audioRef.current.pause();
      }
    };
  }, [audioUrl]);

  useEffect(() => {
    const postTranscript = async () => {
      if (transcript) {
        try {
          processAudioStream(transcript, setAudioUrl);
        } catch (error) {
          console.error("Error processing audio:", error);
        }
      }
    };

    postTranscript();
  }, [transcript]);

  return (
    <div className="flex flex-col items-center justify-between space-y-4 h-screen">
      <div>
        <h1 className="text-2xl text-white">Tying Shoelaces Audio Demo</h1>
        <p className="text-white">{checkResult && <p>{checkResult}</p>}</p>
      </div>

      <div
        onClick={!isPlaying ? startRecognition : stopRecognition}
        className="flex flex-col items-center justify-center pb-12 cursor-pointer w-full"
      >
        <SpeechAnimation volume={volume} />
        {!isPlaying ? (
          <p className="text-white mt-4 text-center">
            Click on Ed to start recording. Recording will stop when speech
            stops.
          </p>
        ) : (
          <p className="text-white mt-4 text-center">
            Doing magical things with your audio...
          </p>
        )}
        <audio ref={audioRef} />
      </div>
      <Controls
        startPlaying={() => audioRef.current?.play()}
        pausePlaying={() => audioRef.current?.pause()}
        canPlay={canPlay}
        isPlaying={isPlaying}
      />
    </div>
  );
};
export default AudioWidget;
