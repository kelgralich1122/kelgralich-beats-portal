
import React from "react";
import { Volume2, VolumeX } from "lucide-react";

interface VolumeControlProps {
  volume: number;
  isMuted: boolean;
  onVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleMute: () => void;
}

const VolumeControl = ({ 
  volume, 
  isMuted, 
  onVolumeChange, 
  onToggleMute 
}: VolumeControlProps) => {
  return (
    <div className="col-span-12 md:col-span-3 flex items-center justify-end gap-2">
      <button 
        className="text-gray-300 hover:text-white transition-colors"
        onClick={onToggleMute}
      >
        {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={onVolumeChange}
        className="w-24 h-1 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
      />
    </div>
  );
};

export default VolumeControl;
