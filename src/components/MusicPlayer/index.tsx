import { useState, useEffect } from "react";
import { Track } from "@/utils/musicData";
import TrackInfo from "./TrackInfo";
import PlaybackControls from "./PlaybackControls";
import ProgressBar from "./ProgressBar";
import VolumeControl from "./VolumeControl";
import AudioElement from "./AudioElement";

interface MusicPlayerProps {
  tracks: Track[];
  currentTrackIndex: number;
  setCurrentTrackIndex: (index: number) => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
}

const MusicPlayer = ({ 
  tracks, 
  currentTrackIndex, 
  setCurrentTrackIndex, 
  isPlaying, 
  setIsPlaying 
}: MusicPlayerProps) => {
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const currentTrack = tracks[currentTrackIndex];

  useEffect(() => {
    // Reset current time when track changes
    setCurrentTime(0);
  }, [currentTrackIndex]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePrevious = () => {
    if (currentTime > 3) {
      // If we're more than 3 seconds into the song, just restart it
      setCurrentTime(0);
    } else {
      // Otherwise, go to previous track (or last track if we're at the beginning)
      setCurrentTrackIndex(currentTrackIndex === 0 ? tracks.length - 1 : currentTrackIndex - 1);
    }
  };

  const handleNext = () => {
    setCurrentTrackIndex((currentTrackIndex + 1) % tracks.length);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (isMuted && newVolume > 0) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
  };

  const handleTrackEnded = () => {
    if (currentTrackIndex < tracks.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
    } else {
      setIsPlaying(false);
      setCurrentTime(0);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-md border-t border-white/10 p-3 z-50">
      <div className="max-w-7xl mx-auto grid grid-cols-12 items-center gap-4">
        <TrackInfo currentTrack={currentTrack} />
        
        <div className="col-span-12 md:col-span-6 flex flex-col items-center justify-center">
          <PlaybackControls 
            isPlaying={isPlaying}
            onPlayPause={handlePlayPause}
            onPrevious={handlePrevious}
            onNext={handleNext}
          />
          
          <ProgressBar 
            currentTime={currentTime}
            duration={duration}
            onSeek={handleSeek}
          />
        </div>
        
        <VolumeControl 
          volume={volume}
          isMuted={isMuted}
          onVolumeChange={handleVolumeChange}
          onToggleMute={toggleMute}
        />
      </div>

      <AudioElement 
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        volume={volume}
        isMuted={isMuted}
        onDurationChange={setDuration}
        onTimeUpdate={setCurrentTime}
        onEnded={handleTrackEnded}
        setIsPlaying={setIsPlaying}
      />
    </div>
  );
};

export default MusicPlayer;
