import React from "react";
import "./SpeechAnimation.css";

interface SpeechAnimationProps {
  volume: number;
  onClick?: () => void;
}

const SpeechAnimation: React.FC<SpeechAnimationProps> = ({
  volume,
  onClick,
}) => {
  const size = volume < 20 ? 50 : Math.min(Math.max(volume, 10), 100);

  return (
    <div
      onClick={onClick}
      className={`circle`}
      style={{ transform: `scale(${size / 50})` }}
    />
  );
};

export default SpeechAnimation;
