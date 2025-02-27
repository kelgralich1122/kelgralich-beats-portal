
import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, Volume1, VolumeX } from "lucide-react";
import { Track } from "@/utils/musicData";

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
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = tracks[currentTrackIndex];

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePrevious = () => {
    setCurrentTrackIndex(currentTrackIndex === 0 ? tracks.length - 1 : currentTrackIndex - 1);
  };

  const handleNext = () => {
    setCurrentTrackIndex((currentTrackIndex + 1) % tracks.length);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      setProgress((current / duration) * 100);
      setCurrentTime(current);
      setDuration(duration);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current) {
      const bounds = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - bounds.left;
      const width = bounds.width;
      const percentage = x / width;
      const newTime = percentage * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
      setProgress(percentage * 100);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const VolumeIcon = () => {
    if (volume === 0) return <VolumeX size={20} />;
    if (volume < 0.5) return <Volume1 size={20} />;
    return <Volume2 size={20} />;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="glass-effect p-4 mx-auto max-w-7xl">
        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            <img 
              src={currentTrack.coverArt} 
              alt={currentTrack.title} 
              className="w-12 h-12 rounded-md object-cover"
            />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-sm font-medium text-white">{currentTrack.title}</h3>
                <p className="text-xs text-gray-400">Kelgralich</p>
              </div>
              <div className="text-xs text-gray-400 hidden sm:block">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>
            
            <div 
              className="track-progress cursor-pointer" 
              onClick={handleSeek}
            >
              <div 
                className="track-progress-bar" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 ml-4">
            <button 
              onClick={handlePrevious}
              className="text-white/70 hover:text-white transition-colors"
            >
              <SkipBack size={20} />
            </button>
            
            <button 
              onClick={handlePlayPause}
              className="w-10 h-10 rounded-full bg-music-accent flex items-center justify-center hover:bg-music-highlight transition-colors"
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-1" />}
            </button>
            
            <button 
              onClick={handleNext}
              className="text-white/70 hover:text-white transition-colors"
            >
              <SkipForward size={20} />
            </button>
          </div>
          
          <div className="hidden md:flex items-center gap-2 ml-6">
            <button className="text-white/70 hover:text-white transition-colors">
              <VolumeIcon />
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-20 h-1 accent-music-accent bg-white/20 rounded-full"
            />
          </div>
        </div>
      </div>
      
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleNext}
        src={currentTrack.audioSrc || ""}
      />
    </div>
  );
};

export default MusicPlayer;
