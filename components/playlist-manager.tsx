"use client";

import { useState } from "react";
import { usePlayerStore } from "@/lib/store";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Plus, Trash } from "lucide-react";

export function PlaylistManager() {
  const { playlists, addPlaylist, removePlaylist } = usePlayerStore();
  const [newPlaylistName, setNewPlaylistName] = useState("");

  const handleCreatePlaylist = () => {
    if (!newPlaylistName.trim()) return;

    addPlaylist({
      id: Date.now().toString(),
      name: newPlaylistName,
      tracks: [],
    });
    setNewPlaylistName("");
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Input
          placeholder="New playlist name..."
          value={newPlaylistName}
          onChange={(e) => setNewPlaylistName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleCreatePlaylist()}
        />
        <Button onClick={handleCreatePlaylist}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-2">
        {playlists.map((playlist) => (
          <div
            key={playlist.id}
            className="flex items-center justify-between p-2 hover:bg-accent rounded-md"
          >
            <span>{playlist.name}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removePlaylist(playlist.id)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}