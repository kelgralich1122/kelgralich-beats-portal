
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrackList from "@/components/TrackList";
import MusicPlayer from "@/components/MusicPlayer";
import About from "@/components/About";
import Footer from "@/components/Footer";
import { tracks as demoTracks, Track } from "@/utils/musicData";
import { createClient } from "@supabase/supabase-js";
import { X, ListMusic } from "lucide-react";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
// Only create client if both URL and key are available
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

const Index = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [tracks, setTracks] = useState<Track[]>(demoTracks);
  const [loading, setLoading] = useState(true);
  const [showMusicPlayer, setShowMusicPlayer] = useState(true);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        setLoading(true);
        if (!supabase) {
          console.log("Using demo tracks: Supabase credentials not configured");
          setLoading(false);
          return;
        }
        
        const { data, error } = await supabase
          .from('tracks')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching tracks:', error);
          return;
        }

        if (data && data.length > 0) {
          const supabaseTracks: Track[] = data.map((track) => ({
            id: track.id,
            title: track.title,
            duration: track.duration,
            releaseDate: track.release_date,
            audioSrc: track.audio_url,
            coverArt: track.cover_art,
            description: track.description
          }));

          setTracks([...supabaseTracks, ...demoTracks]);
        }
      } catch (error) {
        console.error('Error in track fetching:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTracks();

    // Only set up subscription if Supabase is configured
    if (supabase) {
      const tracksSubscription = supabase
        .channel('tracks-changes')
        .on('postgres_changes', { 
          event: '*', 
          schema: 'public', 
          table: 'tracks' 
        }, () => {
          fetchTracks();
        })
        .subscribe();

      return () => {
        supabase.removeChannel(tracksSubscription);
      };
    }
  }, []);

  const toggleMusicPlayer = () => {
    setShowMusicPlayer(!showMusicPlayer);
  };

  const addTrack = (newTrack: Track) => {
    // Add the new track to the beginning of the tracks list
    setTracks([newTrack, ...tracks]);
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
        onAddTrack={addTrack}
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
