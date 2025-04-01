
import React from "react";
import { Track } from "@/utils/musicData";

interface TrackInfoProps {
  currentTrack: Track | undefined;
}

const TrackInfo = ({ currentTrack }: TrackInfoProps) => {
  return (
    <div className="col-span-12 md:col-span-3 flex items-center gap-3">
      <img 
        src={currentTrack?.coverArt || 'https://via.placeholder.com/40'} 
        alt={currentTrack?.title || 'Track'} 
        className="w-12 h-12 rounded object-cover"
      />
      <div className="truncate">
        <h4 className="text-white font-medium truncate">{currentTrack?.title || 'No track selected'}</h4>
        <p className="text-gray-400 text-sm">Kelgralich</p>
      </div>
    </div>
  );
};

export default TrackInfo;
