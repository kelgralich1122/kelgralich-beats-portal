
import { useState, useRef, useEffect } from "react";
import { Track } from "@/utils/musicData";

interface AudioElementProps {
  currentTrack: Track | undefined;
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  onDurationChange: (duration: number) => void;
  onTimeUpdate: (currentTime: number) => void;
  onEnded: () => void;
  setIsPlaying: (isPlaying: boolean) => void;
}

const AudioElement = ({
  currentTrack,
  isPlaying,
  volume,
  isMuted,
  onDurationChange,
  onTimeUpdate,
  onEnded,
  setIsPlaying
}: AudioElementProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = isMuted ? 0 : volume;

    if (isPlaying) {
      audio.play().catch(error => {
        console.error("Error playing audio:", error);
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }

    const handleLoadedMetadata = () => {
      onDurationChange(audio.duration);
    };

    const handleTimeUpdate = () => {
      onTimeUpdate(audio.currentTime);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', onEnded);
    };
  }, [isPlaying, volume, isMuted, onDurationChange, onTimeUpdate, onEnded, setIsPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(error => {
        console.error("Error playing new track:", error);
        setIsPlaying(false);
      });
    }
  }, [currentTrack, isPlaying, setIsPlaying]);

  return (
    <audio 
      ref={audioRef} 
      src={currentTrack?.audioSrc || ''} 
      preload="metadata"
    />
  );
};

export default AudioElement;
