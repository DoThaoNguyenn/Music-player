"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { usePlayerStore } from "@/lib/store";
import { Button } from "./ui/button";
import { Search as SearchIcon } from "lucide-react";
import { searchVideos } from "@/lib/youtube";

export function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const { setCurrentTrack, setIsPlaying } = usePlayerStore();

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      const videos = await searchVideos(query);
      setResults(videos);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  const playTrack = (track: any) => {
    setCurrentTrack({
      id: track.id,
      name: track.name,
      artist: track.artist,
      albumArt: track.albumArt,
      duration: track.duration,
      uri: track.uri,
    });
    setIsPlaying(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Input
          placeholder="Tìm kiếm video YouTube..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <Button onClick={handleSearch}>
          <SearchIcon className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-2">
        {results.map((track) => (
          <div
            key={track.id}
            className="flex items-center space-x-4 p-2 hover:bg-accent rounded-md cursor-pointer"
            onClick={() => playTrack(track)}
          >
            <img
              src={track.albumArt}
              alt={track.name}
              className="w-10 h-10 rounded-md"
            />
            <div>
              <p className="font-medium">{track.name}</p>
              <p className="text-sm text-muted-foreground">
                {track.artist}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}