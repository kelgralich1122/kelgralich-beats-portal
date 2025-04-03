
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrackList from "@/components/TrackList";
import MusicPlayer from "@/components/MusicPlayer";
import About from "@/components/About";
import Footer from "@/components/Footer";
import { tracks as demoTracks, Track } from "@/utils/musicData";
import { X, ListMusic } from "lucide-react";

const Index = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [tracks] = useState<Track[]>(demoTracks);
  const [showMusicPlayer, setShowMusicPlayer] = useState(true);

  const toggleMusicPlayer = () => {
    setShowMusicPlayer(!showMusicPlayer);
  };

  return (
    <div className="bg-gradient-to-b from-music-darker to-music-dark min-h-screen text-white">
      <Navbar />
      <Hero />
      <TrackList 
        tracks={tracks}
        currentTrackIndex={currentTrackIndex}
        setCurrentTrackIndex={setCurrentTrackIndex}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
      <About />
      <Footer />
      
      {/* Music Player Toggle Button */}
      <button 
        onClick={toggleMusicPlayer}
        className="fixed bottom-20 right-4 z-50 bg-music-accent rounded-full p-3 shadow-lg hover:bg-music-accent/80 transition-colors"
        aria-label={showMusicPlayer ? "Hide Music Player" : "Show Music Player"}
      >
        {showMusicPlayer ? <X size={20} /> : <ListMusic size={20} />}
      </button>
      
      {showMusicPlayer && (
        <MusicPlayer 
          tracks={tracks}
          currentTrackIndex={currentTrackIndex}
          setCurrentTrackIndex={setCurrentTrackIndex}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
      )}
    </div>
  );
};

export default Index;
