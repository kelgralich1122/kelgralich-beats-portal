
import { useState } from "react";
import { Track } from "@/utils/musicData";
import { Play, Pause, Clock, Calendar } from "lucide-react";

interface TrackListProps {
  tracks: Track[];
  currentTrackIndex: number;
  setCurrentTrackIndex: (index: number) => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
}

const TrackList = ({ 
  tracks, 
  currentTrackIndex, 
  setCurrentTrackIndex, 
  isPlaying, 
  setIsPlaying 
}: TrackListProps) => {
  const [hoveredTrack, setHoveredTrack] = useState<string | null>(null);

  const handleTrackClick = (index: number) => {
    if (index === currentTrackIndex) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrackIndex(index);
      setIsPlaying(true);
    }
  };

  return (
    <section className="py-24 px-4" id="tracks">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-music-accent/10 text-music-accent mb-4 inline-block">
            DISCOGRAPHY
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Latest Tracks</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Explore the latest beats and rhythms from Kelgralich's collection of carefully crafted soundscapes.
          </p>
        </div>
        
        <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden">
          <div className="hidden md:grid grid-cols-12 px-6 py-4 text-gray-400 text-sm border-b border-white/10">
            <div className="col-span-1 text-center">#</div>
            <div className="col-span-5">TITLE</div>
            <div className="col-span-3 flex items-center gap-1">
              <Calendar size={16} />
              <span>RELEASE DATE</span>
            </div>
            <div className="col-span-3 flex items-center gap-1 justify-end">
              <Clock size={16} />
              <span>DURATION</span>
            </div>
          </div>
          
          <div className="divide-y divide-white/10">
            {tracks.map((track, index) => (
              <div 
                key={track.id}
                className={`grid grid-cols-12 px-4 md:px-6 py-4 items-center transition-all duration-300 cursor-pointer ${
                  currentTrackIndex === index ? 'bg-music-accent/20' : 'hover:bg-white/5'
                }`}
                onClick={() => handleTrackClick(index)}
                onMouseEnter={() => setHoveredTrack(track.id)}
                onMouseLeave={() => setHoveredTrack(null)}
              >
                <div className="col-span-1 text-center flex justify-center">
                  {currentTrackIndex === index && isPlaying ? (
                    <div className="flex space-x-0.5 items-center h-5">
                      <div className="bg-music-accent w-1 h-3 animate-waveform-1"></div>
                      <div className="bg-music-accent w-1 h-4 animate-waveform-2"></div>
                      <div className="bg-music-accent w-1 h-2 animate-waveform-3"></div>
                      <div className="bg-music-accent w-1 h-5 animate-waveform-4"></div>
                    </div>
                  ) : (
                    hoveredTrack === track.id ? (
                      <button className="text-white">
                        {currentTrackIndex === index && !isPlaying ? (
                          <Play size={18} className="ml-1" />
                        ) : (
                          <Play size={18} className="ml-1" />
                        )}
                      </button>
                    ) : (
                      <span className="text-gray-400">{index + 1}</span>
                    )
                  )}
                </div>
                
                <div className="col-span-11 md:col-span-5 flex items-center gap-4">
                  <img 
                    src={track.coverArt} 
                    alt={track.title} 
                    className="w-12 h-12 rounded-md object-cover hidden md:block"
                  />
                  <div className="text-left">
                    <h3 className="font-medium text-white truncate">{track.title}</h3>
                    <p className="text-sm text-gray-400 hidden md:block">Kelgralich</p>
                  </div>
                </div>
                
                <div className="hidden md:block col-span-3 text-gray-400 text-sm">
                  {track.releaseDate}
                </div>
                
                <div className="hidden md:flex col-span-3 text-gray-400 text-sm justify-end">
                  {track.duration}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrackList;
