import type { Song } from "@/types";
import PlayButton from "./PlayButton";
import SectionGridSkeleton from "./SectionGridSkeleton";

type SectionGridProps = {
  title: string;
  songs: Song[];
  isLoading: boolean;
};

const SectionGrid = ({ title, songs, isLoading }: SectionGridProps) => {
  if (isLoading) {
    return (
      <div className="p-6">
        <SectionGridSkeleton />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-6">{title}</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {songs.map((song) => (
          <div
            key={song._id}
            className="bg-zinc-700 rounded-lg p-4 shadow-lg hover:scale-105 hover:shadow-xl transition duration-300"
          >
            <img
              src={song.imageUrl}
              alt={song.title}
              className="w-full h-40 object-cover rounded-md"
            />
            <div className="mt-3">
              <h3 className="text-white font-semibold">{song.title}</h3>
              <p className="text-gray-400 text-sm">{song.artist}</p>
            </div>

            <PlayButton song={song} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionGrid;
