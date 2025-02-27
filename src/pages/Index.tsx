
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrackList from "@/components/TrackList";
import MusicPlayer from "@/components/MusicPlayer";
import About from "@/components/About";
import Footer from "@/components/Footer";
import { tracks } from "@/utils/musicData";

const Index = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="bg-gradient-to-b from-music-darker to-music-dark min-h-screen">
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
      <MusicPlayer 
        tracks={tracks}
        currentTrackIndex={currentTrackIndex}
        setCurrentTrackIndex={setCurrentTrackIndex}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
    </div>
  );
};

export default Index;
