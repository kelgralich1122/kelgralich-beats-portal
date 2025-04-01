import { useState, useEffect, useRef } from "react";
import { Track } from "@/utils/musicData";
import { Play, Pause, Clock, Calendar, Search, Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { createClient } from "@supabase/supabase-js";

interface TrackListProps {
  tracks: Track[];
  currentTrackIndex: number;
  setCurrentTrackIndex: (index: number) => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
}

// Initialize Supabase client only if URL and key are available
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
// Only create client if both URL and key are available
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

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
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [newTrackData, setNewTrackData] = useState({
    title: "",
    duration: "",
    releaseDate: new Date().toISOString().split('T')[0],
    description: ""
  });
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState("");
  const audioFileRef = useRef<HTMLInputElement>(null);
  const coverImageRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Filter tracks when search term changes
    if (searchTerm.trim() === '') {
      setFilteredTracks(tracks);
    } else {
      const filtered = tracks.filter(track => 
        track.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        track.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
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

  const handleAudioFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.startsWith('audio/')) {
        toast({
          title: "Invalid file type",
          description: "Please upload an audio file (MP3, WAV, etc.)",
          variant: "destructive"
        });
        return;
      }
      setAudioFile(file);
      
      // Calculate duration (approximate method)
      const audio = new Audio();
      audio.src = URL.createObjectURL(file);
      audio.onloadedmetadata = () => {
        const minutes = Math.floor(audio.duration / 60);
        const seconds = Math.floor(audio.duration % 60);
        setNewTrackData({
          ...newTrackData,
          duration: `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
        });
      };
    }
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file (JPG, PNG, etc.)",
          variant: "destructive"
        });
        return;
      }
      setCoverImage(file);
      setCoverImagePreview(URL.createObjectURL(file));
    }
  };

  const handleUploadTrack = async () => {
    if (!audioFile) {
      toast({
        title: "No audio file",
        description: "Please select an audio file to upload",
        variant: "destructive"
      });
      return;
    }

    if (newTrackData.title.trim() === "") {
      toast({
        title: "Missing title",
        description: "Please enter a title for the track",
        variant: "destructive"
      });
      return;
    }

    // Check if Supabase is properly initialized
    if (!supabase) {
      toast({
        title: "Upload not available",
        description: "Supabase connection is not configured. Please contact the administrator.",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Upload cover image first if provided
      let coverArtUrl = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400';
      
      if (coverImage) {
        const coverFilePath = `covers/${Date.now()}-${coverImage.name}`;
        const { error: coverUploadError } = await supabase.storage
          .from('music-assets')
          .upload(coverFilePath, coverImage, {
            upsert: true
          });

        if (coverUploadError) {
          throw new Error(`Cover upload error: ${coverUploadError.message}`);
        }

        // Get the public URL
        const { data: coverPublicUrlData } = await supabase.storage
          .from('music-assets')
          .getPublicUrl(coverFilePath);

        coverArtUrl = coverPublicUrlData.publicUrl;
      }

      // Upload audio file
      const audioFilePath = `audio/${Date.now()}-${audioFile.name}`;
      
      // Manual progress tracking
      let uploadedBytes = 0;
      const totalBytes = audioFile.size;
      
      // Use XMLHttpRequest to track upload progress
      const xhr = new XMLHttpRequest();
      
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(percentComplete);
          uploadedBytes = event.loaded;
        }
      });
      
      // Use standard Supabase upload
      const { error: audioUploadError } = await supabase.storage
        .from('music-assets')
        .upload(audioFilePath, audioFile, {
          upsert: true
        });

      if (audioUploadError) {
        throw new Error(`Audio upload error: ${audioUploadError.message}`);
      }
      
      // Set progress to 100% when upload is complete
      setUploadProgress(100);

      // Get the public URL for the audio
      const { data: audioPublicUrlData } = await supabase.storage
        .from('music-assets')
        .getPublicUrl(audioFilePath);

      const audioUrl = audioPublicUrlData.publicUrl;

      // Insert the track data into the database
      const { error: insertError } = await supabase
        .from('tracks')
        .insert([
          {
            title: newTrackData.title,
            duration: newTrackData.duration,
            release_date: newTrackData.releaseDate,
            description: newTrackData.description,
            audio_url: audioUrl,
            cover_art: coverArtUrl
          }
        ]);

      if (insertError) {
        throw new Error(`Database insert error: ${insertError.message}`);
      }

      toast({
        title: "Track uploaded successfully",
        description: "Your track has been uploaded and will appear in the list shortly.",
      });

      // Reset form
      setAudioFile(null);
      setCoverImage(null);
      setCoverImagePreview("");
      setNewTrackData({
        title: "",
        duration: "",
        releaseDate: new Date().toISOString().split('T')[0],
        description: ""
      });
      setUploadModalOpen(false);
      
    } catch (error) {
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive"
      });
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
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
            
            {/* Upload button */}
            <button
              onClick={() => setUploadModalOpen(true)}
              className="flex items-center gap-2 bg-music-accent/20 hover:bg-music-accent/30 text-music-accent px-6 py-3 rounded-full transition-colors"
            >
              <Upload size={18} />
              <span>Upload Track</span>
            </button>
          </div>
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
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Upload Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-music-dark border border-white/10 rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto relative">
            <button 
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
              onClick={() => setUploadModalOpen(false)}
            >
              <X size={24} />
            </button>
            
            <h2 className="text-2xl font-bold mb-6 text-center">Upload New Track</h2>
            
            <div className="space-y-5">
              {/* Title */}
              <div>
                <label className="block text-gray-300 mb-2">Track Title</label>
                <input 
                  type="text"
                  value={newTrackData.title}
                  onChange={(e) => setNewTrackData({...newTrackData, title: e.target.value})}
                  placeholder="Enter track title"
                  className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-music-accent/50"
                />
              </div>
              
              {/* Release Date */}
              <div>
                <label className="block text-gray-300 mb-2">Release Date</label>
                <input 
                  type="date"
                  value={newTrackData.releaseDate}
                  onChange={(e) => setNewTrackData({...newTrackData, releaseDate: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-music-accent/50"
                />
              </div>
              
              {/* Description */}
              <div>
                <label className="block text-gray-300 mb-2">Description (optional)</label>
                <textarea 
                  value={newTrackData.description}
                  onChange={(e) => setNewTrackData({...newTrackData, description: e.target.value})}
                  placeholder="Enter track description"
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-music-accent/50"
                />
              </div>
              
              {/* Cover Image Upload */}
              <div>
                <label className="block text-gray-300 mb-2">Cover Image (optional)</label>
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {coverImagePreview ? (
                      <img 
                        src={coverImagePreview} 
                        alt="Cover preview" 
                        className="w-20 h-20 object-cover rounded-md"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-white/5 rounded-md flex items-center justify-center text-gray-400">
                        <span>No image</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      ref={coverImageRef}
                      onChange={handleCoverImageChange}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => coverImageRef.current?.click()}
                      className="px-4 py-2 border border-white/20 rounded-md text-sm hover:bg-white/5 transition-colors"
                    >
                      {coverImage ? 'Change Image' : 'Select Image'}
                    </button>
                    {coverImage && (
                      <button
                        type="button"
                        onClick={() => {
                          setCoverImage(null);
                          setCoverImagePreview('');
                        }}
                        className="ml-2 px-2 py-1 text-gray-400 hover:text-white"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Audio File Upload */}
              <div>
                <label className="block text-gray-300 mb-2">Audio File</label>
                <div className="space-y-2">
                  <input
                    type="file"
                    accept="audio/*"
                    ref={audioFileRef}
                    onChange={handleAudioFileChange}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => audioFileRef.current?.click()}
                    className="w-full px-4 py-3 bg-white/5 border border-dashed border-white/20 rounded-md text-center hover:bg-white/10 transition-colors"
                  >
                    {audioFile ? (
                      <span className="text-music-accent">{audioFile.name}</span>
                    ) : (
                      <span className="text-gray-400">Click to select audio file</span>
                    )}
                  </button>
                  {audioFile && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">
                        {(audioFile.size / (1024 * 1024)).toFixed(2)} MB
                      </span>
                      <button
                        type="button"
                        onClick={() => setAudioFile(null)}
                        className="text-sm text-gray-400 hover:text-white"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Upload Progress */}
              {isUploading && (
                <div className="space-y-2">
                  <div className="w-full bg-white/10 rounded-full h-2.5">
                    <div 
                      className="bg-music-accent h-2.5 rounded-full" 
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-center text-gray-400">
                    Uploading... {uploadProgress}%
                  </p>
                </div>
              )}
              
              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setUploadModalOpen(false)}
                  className="px-5 py-2 border border-white/20 rounded-md text-white hover:bg-white/5 transition-colors"
                  disabled={isUploading}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleUploadTrack}
                  className="px-5 py-2 bg-music-accent text-white rounded-md hover:bg-music-accent/80 transition-colors"
                  disabled={isUploading || !audioFile}
                >
                  {isUploading ? 'Uploading...' : 'Upload Track'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TrackList;
