import React, { useEffect, useRef } from "react";

interface AudioVisualizerProps {
  audioPath: string;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ audioPath }) => {
  const audioElement = useRef<HTMLAudioElement>(new Audio(audioPath));
  const audioContext = useRef<AudioContext>(new AudioContext());

  useEffect(() => {
    audioContext.current.createMediaElementSource(audioElement.current);
    const analyser = audioContext.current.createAnalyser();
  }, []);

  return <div />;
};

export default AudioVisualizer;
