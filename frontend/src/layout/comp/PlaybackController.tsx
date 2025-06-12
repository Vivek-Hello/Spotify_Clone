import { usePlayerStore } from "@/store/usePlayerStore";
import { useEffect, useRef, useState } from "react";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";

const PlaybackController = () => {
  const {  isPlaying, togglePlay, playNext, playPrevious } = usePlayerStore();
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleEnded = () => {
    usePlayerStore.setState({ isPlaying: false });
  };

  useEffect(() => {
    audioRef.current = document.querySelector("audio");
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.volume = volume;

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [volume]);

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
    }
  };

  const toggleMute = () => {
    setIsMuted((prev) => {
      const newMuted = !prev;
      if (audioRef.current) {
        audioRef.current.muted = newMuted;
      }
      return newMuted;
    });
  };

  const formatTime = (time: number = 0) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-[#181818] text-white px-6 py-4 flex items-center justify-between border-t border-gray-800">
      {/* Controls */}
      <div className="flex items-center gap-6">
        <button onClick={playPrevious} className="hover:scale-110 transition-transform duration-200 text-2xl">
          ⏮
        </button>
        <button onClick={togglePlay} className="hover:scale-110 transition-transform duration-200 text-3xl">
          {isPlaying ? "⏸" : "▶️"}
        </button>
        <button onClick={playNext} className="hover:scale-110 transition-transform duration-200 text-2xl">
          ⏭
        </button>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center gap-4 w-1/2">
        <span className="text-sm w-10 text-right">{formatTime(currentTime)}</span>
        <input
          type="range"
          min={0}
          max={duration || 0}
          value={currentTime}
          onChange={(e) => handleSeek([Number(e.target.value)])}
          className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-green-500"
        />
        <span className="text-sm w-10">{formatTime(duration)}</span>
      </div>

      {/* Volume Bar */}
      <div className="flex items-center gap-2 w-40 justify-end">
        <button onClick={toggleMute}>
          {isMuted ? <FaVolumeMute className="text-xl" /> : <FaVolumeUp className="text-xl" />}
        </button>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={isMuted ? 0 : volume}
          onChange={(e) => {
            setVolume(Number(e.target.value));
            if (audioRef.current) audioRef.current.muted = false;
            setIsMuted(false);
          }}
          className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-green-500"
        />
      </div>
    </footer>
  );
};

export default PlaybackController;
