
import React from "react";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

interface PlaybackControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

const PlaybackControls = ({ 
  isPlaying, 
  onPlayPause, 
  onPrevious, 
  onNext 
}: PlaybackControlsProps) => {
  return (
    <div className="flex items-center gap-4 mb-2">
      <button 
        className="text-gray-300 hover:text-white transition-colors"
        onClick={onPrevious}
      >
        <SkipBack size={20} />
      </button>
      <button 
        className="bg-music-accent rounded-full w-10 h-10 flex items-center justify-center text-white hover:bg-music-accent/80 transition-colors"
        onClick={onPlayPause}
      >
        {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-1" />}
      </button>
      <button 
        className="text-gray-300 hover:text-white transition-colors"
        onClick={onNext}
      >
        <SkipForward size={20} />
      </button>
    </div>
  );
};

export default PlaybackControls;
