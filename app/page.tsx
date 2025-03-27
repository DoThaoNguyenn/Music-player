import { Search } from "@/components/search";
import { PlayerControls } from "@/components/ui/player-controls";
import { PlaylistManager } from "@/components/playlist-manager";
import { Music } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Music className="h-8 w-8" />
            <h1 className="text-2xl font-bold">Music Player</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Search</h2>
            <Search />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Your Playlists</h2>
            <PlaylistManager />
          </div>
        </div>
      </main>

      <PlayerControls />
    </div>
  );
}