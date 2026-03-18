import { create } from 'zustand';

interface Track {
  title: string;
  artist: string;
  cover: string;
  url: string;
}

interface AppState {
  isAudioOpen: boolean;
  isPlaying: boolean;
  currentTrack: Track;
  toggleAudio: () => void;
  setIsPlaying: (playing: boolean) => void;
  setCurrentTrack: (track: Track) => void;
  
  // For the login transition
  hasSeenIntro: boolean;
  setHasSeenIntro: (seen: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
  isAudioOpen: true,
  isPlaying: false,
  currentTrack: {
    title: "EP 13: Bisikan Hutan Blackwood",
    artist: "Sinar Gelap Podcast",
    cover: "https://images.unsplash.com/photo-1544923246-77307dd654ca?q=80&w=2070&auto=format&fit=crop",
    url: "#",
  },
  toggleAudio: () => set((state) => ({ isAudioOpen: !state.isAudioOpen })),
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setCurrentTrack: (track) => set({ currentTrack: track }),
  
  hasSeenIntro: false,
  setHasSeenIntro: (seen) => set({ hasSeenIntro: seen }),
}));
