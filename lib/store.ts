import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Track {
  id: string;
  name: string;
  artist: string;
  albumArt: string;
  duration: number;
  uri: string;
}

interface Playlist {
  id: string;
  name: string;
  tracks: Track[];
}

interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  queue: Track[];
  playlists: Playlist[];
  volume: number;
  setCurrentTrack: (track: Track | null) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setQueue: (queue: Track[]) => void;
  addToQueue: (track: Track) => void;
  removeFromQueue: (trackId: string) => void;
  setVolume: (volume: number) => void;
  addPlaylist: (playlist: Playlist) => void;
  removePlaylist: (playlistId: string) => void;
  updatePlaylist: (playlist: Playlist) => void;
}

export const usePlayerStore = create<PlayerState>()(
  persist(
    (set) => ({
      currentTrack: null,
      isPlaying: false,
      queue: [],
      playlists: [],
      volume: 1,
      setCurrentTrack: (track) => set({ currentTrack: track }),
      setIsPlaying: (isPlaying) => set({ isPlaying }),
      setQueue: (queue) => set({ queue }),
      addToQueue: (track) => set((state) => ({ queue: [...state.queue, track] })),
      removeFromQueue: (trackId) =>
        set((state) => ({
          queue: state.queue.filter((track) => track.id !== trackId),
        })),
      setVolume: (volume) => set({ volume }),
      addPlaylist: (playlist) =>
        set((state) => ({ playlists: [...state.playlists, playlist] })),
      removePlaylist: (playlistId) =>
        set((state) => ({
          playlists: state.playlists.filter((p) => p.id !== playlistId),
        })),
      updatePlaylist: (playlist) =>
        set((state) => ({
          playlists: state.playlists.map((p) =>
            p.id === playlist.id ? playlist : p
          ),
        })),
    }),
    {
      name: 'player-storage',
    }
  )
);