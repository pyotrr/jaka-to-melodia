import React, { useCallback, useEffect, useRef } from "react";
import {
  AudioVisualizerContainer,
  AudioVisualizerBar,
} from "../../../styles/components/AudioVisualizer.styled";
import { Space } from "../../../styles/Containers.styled";

interface AudioVisualizerProps {
  audioPath: string;
}
const SAMPLE_RATE = 44100;
const MAX_FREQ = SAMPLE_RATE / 2;

const FFT_SIZE = 128;
const NUMBER_OF_BUCKETS = FFT_SIZE / 2;
const FREQ_PER_BUCKET = MAX_FREQ / NUMBER_OF_BUCKETS;

const FREQ_IDX_100 = Math.floor(100 / FREQ_PER_BUCKET);
const FREQ_IDX_10000 = Math.floor(10_000 / FREQ_PER_BUCKET);

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ audioPath }) => {
  const audioElement = useRef<HTMLAudioElement>(new Audio(audioPath));
  const audioContext = useRef<AudioContext>(new AudioContext());
  const analyzer = useRef<AnalyserNode | null>(null);

  const requestRef = useRef(0);
  const fftArrRef = useRef(new Uint8Array(NUMBER_OF_BUCKETS));
  const usableSpectrumFftData = useRef(
    new Uint8Array(FREQ_IDX_10000 - FREQ_IDX_100)
  );

  const visualizerContainer = useRef<HTMLDivElement>(null);

  const animate = useCallback(() => {
    if (!analyzer.current || !visualizerContainer.current) {
      requestAnimationFrame(animate);
      return;
    }
    analyzer.current.getByteFrequencyData(fftArrRef.current);
    usableSpectrumFftData.current = fftArrRef.current.subarray(
      FREQ_IDX_100,
      FREQ_IDX_10000
    );

    const divs = Array.from(
      visualizerContainer.current.children as HTMLCollectionOf<HTMLElement>
    );

    for (let i = 0; i < divs.length; i++) {
      divs[i].style.transform = `scaleY(${
        usableSpectrumFftData.current[i] * 4
      }%)`;
    }

    requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    audioElement.current.crossOrigin = "anonymous";
    audioElement.current.volume = 0.5;
    audioElement.current.play().then(() => {
      requestRef.current = requestAnimationFrame(animate);
    });
    audioElement.current.onended = () =>
      cancelAnimationFrame(requestRef.current);
    const audioSource = audioContext.current.createMediaElementSource(
      audioElement.current
    );
    analyzer.current = audioContext.current.createAnalyser();
    analyzer.current.smoothingTimeConstant = 0.85;
    audioSource
      .connect(analyzer.current)
      .connect(audioContext.current.destination);
    analyzer.current.fftSize = FFT_SIZE;
  }, [animate]);

  useEffect(() => {
    const currentAudioElement = audioElement.current;
    return () => {
      currentAudioElement.pause();
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <>
      <Space />
      <AudioVisualizerContainer ref={visualizerContainer}>
        {new Array(usableSpectrumFftData.current.length).fill(0).map((_, i) => {
          return <AudioVisualizerBar key={i} />;
        })}
      </AudioVisualizerContainer>
    </>
  );
};

export default AudioVisualizer;
