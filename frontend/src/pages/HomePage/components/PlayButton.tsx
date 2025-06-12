import { Button } from "@/components/ui/button";
import { usePlayerStore } from "@/store/usePlayerStore";
import { Pause, Play } from "lucide-react";


const PlayButton = ({ song }: any) => {
  const { currentSong, isPlaying, setCurrentSong, togglePlay } = usePlayerStore();
  const isCurrentSong = currentSong?._id === song._id;

  const handlePlay = () => {
    if (isCurrentSong) {
      togglePlay();
    } else {
      setCurrentSong(song);
    }
  };

  return (
    <Button
      size="icon"
      onClick={handlePlay}
      className={`absolute bottom-3 right-2 bg-green-500 hover:bg-green-400 transition-all
        opacity-0 translate-y-2 group-hover:translate-y-0 ${
          isCurrentSong ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      aria-label={isPlaying ? "Pause song" : "Play song"}
    >
      {isCurrentSong && isPlaying ? (
        <Pause className="w-6 h-6 text-black" />
      ) : (
        <Play className="w-6 h-6 text-black" />
      )}
    </Button>
  );
};

export default PlayButton;	