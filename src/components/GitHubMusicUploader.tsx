
import React, { useState } from "react";
import { Track, createGithubRawUrl } from "@/utils/musicData";
import { useToast } from "@/hooks/use-toast";
import { Music, Upload, X } from "lucide-react";

interface GitHubMusicUploaderProps {
  onTrackAdded: (track: Track) => void;
}

const GitHubMusicUploader: React.FC<GitHubMusicUploaderProps> = ({ onTrackAdded }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trackData, setTrackData] = useState<Partial<Track>>({
    title: "",
    duration: "0:00",
    releaseDate: new Date().toISOString().split("T")[0],
    description: "",
  });
  const [repoInfo, setRepoInfo] = useState({
    username: "",
    repository: "",
    branch: "main",
    filePath: "",
  });
  const [previewUrl, setPreviewUrl] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const { toast } = useToast();

  const validateAudioUrl = async (url: string): Promise<boolean> => {
    try {
      setIsValidating(true);
      const response = await fetch(url, { method: "HEAD" });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const contentType = response.headers.get("content-type") || "";
      if (!contentType.includes("audio")) {
        toast({
          title: "Invalid file type",
          description: "The URL doesn't point to an audio file",
          variant: "destructive"
        });
        return false;
      }
      
      return true;
    } catch (error) {
      toast({
        title: "URL validation failed",
        description: error instanceof Error ? error.message : "Could not validate the URL",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsValidating(false);
    }
  };

  const generatePreview = () => {
    if (!repoInfo.username || !repoInfo.repository || !repoInfo.filePath) {
      toast({
        title: "Missing information",
        description: "Please fill in all GitHub repository details",
        variant: "destructive"
      });
      return;
    }

    const url = createGithubRawUrl(
      repoInfo.username,
      repoInfo.repository,
      repoInfo.branch,
      repoInfo.filePath
    );
    
    setPreviewUrl(url);
  };

  const handleSubmit = async () => {
    if (!trackData.title) {
      toast({
        title: "Missing title",
        description: "Please enter a title for the track",
        variant: "destructive"
      });
      return;
    }

    if (!previewUrl) {
      toast({
        title: "Missing audio URL",
        description: "Please generate a preview URL first",
        variant: "destructive"
      });
      return;
    }

    // Validate the audio URL
    const isValid = await validateAudioUrl(previewUrl);
    if (!isValid) return;

    // Create the new track
    const newTrack: Track = {
      id: `track-${Date.now()}`,
      title: trackData.title || "Untitled Track",
      duration: trackData.duration || "0:00",
      releaseDate: trackData.releaseDate || new Date().toISOString().split("T")[0],
      audioSrc: previewUrl,
      coverArt: trackData.coverArt || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400",
      description: trackData.description,
    };

    // Add the track to the list
    onTrackAdded(newTrack);
    
    toast({
      title: "Track added successfully",
      description: "The track has been added to your playlist",
    });

    // Reset form and close modal
    setTrackData({
      title: "",
      duration: "0:00",
      releaseDate: new Date().toISOString().split("T")[0],
      description: "",
    });
    setRepoInfo({
      username: "",
      repository: "",
      branch: "main",
      filePath: "",
    });
    setPreviewUrl("");
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 bg-music-accent/20 hover:bg-music-accent/30 text-music-accent px-6 py-3 rounded-full transition-colors"
      >
        <Music size={18} />
        <span>Add GitHub Music</span>
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-music-dark border border-white/10 rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto relative">
            <button 
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
              onClick={() => setIsModalOpen(false)}
            >
              <X size={24} />
            </button>
            
            <h2 className="text-2xl font-bold mb-6 text-center">Add Music from GitHub</h2>
            
            <div className="space-y-5">
              {/* Title */}
              <div>
                <label className="block text-gray-300 mb-2">Track Title*</label>
                <input 
                  type="text"
                  value={trackData.title}
                  onChange={(e) => setTrackData({...trackData, title: e.target.value})}
                  placeholder="Enter track title"
                  className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-music-accent/50"
                />
              </div>
              
              {/* GitHub Repository Details */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">GitHub Audio File Location*</h3>
                
                <div>
                  <label className="block text-gray-300 mb-2">GitHub Username</label>
                  <input 
                    type="text"
                    value={repoInfo.username}
                    onChange={(e) => setRepoInfo({...repoInfo, username: e.target.value})}
                    placeholder="e.g. yourusername"
                    className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-music-accent/50"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Repository Name</label>
                  <input 
                    type="text"
                    value={repoInfo.repository}
                    onChange={(e) => setRepoInfo({...repoInfo, repository: e.target.value})}
                    placeholder="e.g. my-music-repo"
                    className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-music-accent/50"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Branch</label>
                  <input 
                    type="text"
                    value={repoInfo.branch}
                    onChange={(e) => setRepoInfo({...repoInfo, branch: e.target.value})}
                    placeholder="e.g. main or master"
                    className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-music-accent/50"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">File Path</label>
                  <input 
                    type="text"
                    value={repoInfo.filePath}
                    onChange={(e) => setRepoInfo({...repoInfo, filePath: e.target.value})}
                    placeholder="e.g. audio/my-song.mp3"
                    className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-music-accent/50"
                  />
                </div>
                
                <button
                  onClick={generatePreview}
                  className="w-full px-4 py-2 mt-2 bg-music-accent/20 text-music-accent rounded-md hover:bg-music-accent/30 transition-colors"
                >
                  Generate URL Preview
                </button>
                
                {previewUrl && (
                  <div className="p-3 bg-white/5 rounded-md break-all">
                    <p className="text-sm font-mono text-gray-300">{previewUrl}</p>
                    <p className="text-xs text-gray-400 mt-1">Make sure this file is publicly accessible</p>
                  </div>
                )}
              </div>
              
              {/* Optional Fields */}
              <div className="pt-4 border-t border-white/10">
                <h3 className="text-lg font-semibold mb-3">Optional Details</h3>
                
                <div>
                  <label className="block text-gray-300 mb-2">Duration</label>
                  <input 
                    type="text"
                    value={trackData.duration}
                    onChange={(e) => setTrackData({...trackData, duration: e.target.value})}
                    placeholder="e.g. 3:42"
                    className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-music-accent/50"
                  />
                </div>
                
                <div className="mt-3">
                  <label className="block text-gray-300 mb-2">Release Date</label>
                  <input 
                    type="date"
                    value={trackData.releaseDate}
                    onChange={(e) => setTrackData({...trackData, releaseDate: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-music-accent/50"
                  />
                </div>
                
                <div className="mt-3">
                  <label className="block text-gray-300 mb-2">Description</label>
                  <textarea 
                    value={trackData.description}
                    onChange={(e) => setTrackData({...trackData, description: e.target.value})}
                    placeholder="Enter track description"
                    rows={3}
                    className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-music-accent/50"
                  />
                </div>
                
                <div className="mt-3">
                  <label className="block text-gray-300 mb-2">Cover Art URL (optional)</label>
                  <input 
                    type="text"
                    value={trackData.coverArt || ""}
                    onChange={(e) => setTrackData({...trackData, coverArt: e.target.value})}
                    placeholder="https://example.com/image.jpg"
                    className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-music-accent/50"
                  />
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2 border border-white/20 rounded-md text-white hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-5 py-2 bg-music-accent text-white rounded-md hover:bg-music-accent/80 transition-colors"
                  disabled={isValidating || !previewUrl}
                >
                  {isValidating ? 'Validating...' : 'Add Track'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GitHubMusicUploader;
