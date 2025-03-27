"use client";

import { usePlayerStore } from "@/lib/store";
import { Button } from "./button";
import { Slider } from "./slider";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";

export function PlayerControls() {
  const {
    currentTrack,
    isPlaying,
    setIsPlaying,
    volume,
    setVolume,
  } = usePlayerStore();
  const [progress, setProgress] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (currentTrack && iframeRef.current) {
      const videoId = currentTrack.uri.split('v=')[1];
      iframeRef.current.src = `https://www.youtube.com/embed/${videoId}?autoplay=${isPlaying ? 1 : 0}&controls=0&volume=${volume * 100}`;
    }
  }, [currentTrack, isPlaying, volume]);

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src={currentTrack.albumArt}
              alt={currentTrack.name}
              className="w-12 h-12 rounded-md"
            />
            <div>
              <h3 className="font-medium">{currentTrack.name}</h3>
              <p className="text-sm text-muted-foreground">
                {currentTrack.artist}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-2 flex-1 max-w-xl mx-8">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  // Handle previous track
                }}
              >
                <SkipBack className="h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  // Handle next track
                }}
              >
                <SkipForward className="h-5 w-5" />
              </Button>
            </div>

            <Slider
              value={[progress]}
              max={100}
              step={1}
              className="w-full"
              onValueChange={(value) => setProgress(value[0])}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setVolume(volume === 0 ? 1 : 0)}
            >
              {volume === 0 ? (
                <VolumeX className="h-5 w-5" />
              ) : (
                <Volume2 className="h-5 w-5" />
              )}
            </Button>
            <Slider
              value={[volume * 100]}
              max={100}
              step={1}
              className="w-24"
              onValueChange={(value) => setVolume(value[0] / 100)}
            />
          </div>
        </div>
      </div>
      <iframe
        ref={iframeRef}
        className="hidden"
        width="0"
        height="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}