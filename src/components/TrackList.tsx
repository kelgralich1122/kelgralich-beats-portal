
import { useState, useEffect } from "react";
import { Track } from "@/utils/musicData";
import { Play, Pause, Clock, Calendar, Search } from "lucide-react";

interface TrackListProps {
  tracks: Track[];
  currentTrackIndex: number;
  setCurrentTrackIndex: (index: number) => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  onAddTrack?: (track: Track) => void;
}

const TrackList = ({ 
  tracks, 
  currentTrackIndex, 
  setCurrentTrackIndex, 
  isPlaying, 
  setIsPlaying
}: TrackListProps) => {
  const [hoveredTrack, setHoveredTrack] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTracks, setFilteredTracks] = useState<Track[]>(tracks);

  useEffect(() => {
    // Filter tracks when search term changes
    if (searchTerm.trim() === '') {
      setFilteredTracks(tracks);
    } else {
      const filtered = tracks.filter(track => 
        track.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        track.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        track.artist?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        track.producer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        track.releaseDate.includes(searchTerm)
      );
      setFilteredTracks(filtered);
    }
  }, [searchTerm, tracks]);

  const handleTrackClick = (index: number) => {
    // Get the actual track index from the original tracks array
    const originalIndex = tracks.findIndex(track => track.id === filteredTracks[index].id);
    
    if (originalIndex === currentTrackIndex) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrackIndex(originalIndex);
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Tracks</h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-8">
            Explore the latest beats and rhythms from Kelgralich's collection of carefully crafted soundscapes.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
            {/* Search input */}
            <div className="relative max-w-md w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search tracks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-3 w-full text-white focus:outline-none focus:ring-2 focus:ring-music-accent/50 focus:border-transparent transition-all duration-300"
              />
              {searchTerm && (
                <button 
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                  onClick={() => setSearchTerm("")}
                >
                  ×
                </button>
              )}
            </div>
          </div>
        </div>
        
        <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden">
          <div className="hidden md:grid grid-cols-12 px-6 py-4 text-gray-400 text-sm border-b border-white/10">
            <div className="col-span-1 text-center">#</div>
            <div className="col-span-4">TITLE</div>
            <div className="col-span-2">ARTIST</div>
            <div className="col-span-2 flex items-center gap-1">
              <Calendar size={16} />
              <span>RELEASE DATE</span>
            </div>
            <div className="col-span-3 flex items-center gap-1 justify-end">
              <Clock size={16} />
              <span>DURATION</span>
            </div>
          </div>
          
          {filteredTracks.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-gray-400">No tracks found matching "{searchTerm}"</p>
              <button 
                className="mt-4 px-4 py-2 rounded-full bg-music-accent/20 text-music-accent text-sm hover:bg-music-accent/30 transition-colors"
                onClick={() => setSearchTerm("")}
              >
                Clear search
              </button>
            </div>
          ) : (
            <div className="divide-y divide-white/10">
              {filteredTracks.map((track, index) => {
                // Find the original index for the current track to determine if it's playing
                const originalIndex = tracks.findIndex(t => t.id === track.id);
                const isCurrentTrack = originalIndex === currentTrackIndex;
                
                return (
                  <div 
                    key={track.id}
                    className={`grid grid-cols-12 px-4 md:px-6 py-4 items-center transition-all duration-300 cursor-pointer ${
                      isCurrentTrack ? 'bg-music-accent/20' : 'hover:bg-white/5'
                    }`}
                    onClick={() => handleTrackClick(index)}
                    onMouseEnter={() => setHoveredTrack(track.id)}
                    onMouseLeave={() => setHoveredTrack(null)}
                  >
                    <div className="col-span-1 text-center flex justify-center">
                      {isCurrentTrack && isPlaying ? (
                        <div className="flex space-x-0.5 items-center h-5">
                          <div className="bg-music-accent w-1 h-3 animate-waveform-1"></div>
                          <div className="bg-music-accent w-1 h-4 animate-waveform-2"></div>
                          <div className="bg-music-accent w-1 h-2 animate-waveform-3"></div>
                          <div className="bg-music-accent w-1 h-5 animate-waveform-4"></div>
                        </div>
                      ) : (
                        hoveredTrack === track.id ? (
                          <button className="text-white">
                            {isCurrentTrack && !isPlaying ? (
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
                    
                    <div className="col-span-11 md:col-span-4 flex items-center gap-4">
                      <img 
                        src={track.coverArt} 
                        alt={track.title} 
                        className="w-12 h-12 rounded-md object-cover hidden md:block"
                      />
                      <div className="text-left">
                        <h3 className="font-medium text-white truncate">{track.title}</h3>
                        <p className="text-sm text-gray-400 md:hidden">{track.artist || 'Unknown artist'}</p>
                      </div>
                    </div>
                    
                    <div className="hidden md:block col-span-2 text-gray-400 text-sm">
                      {track.artist || 'Unknown artist'}
                    </div>
                    
                    <div className="hidden md:block col-span-2 text-gray-400 text-sm">
                      {track.releaseDate}
                    </div>
                    
                    <div className="hidden md:flex col-span-3 text-gray-400 text-sm justify-end">
                      {track.duration}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TrackList;
