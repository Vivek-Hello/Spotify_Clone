import { useMusicStore } from "@/store/useMusicStore";
import { Trash2,  Music } from "lucide-react";
import AddSongDialog from "./AddSongDialog";

const SongsTable = () => {
  const { allSongs, deleteSong } = useMusicStore();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-zinc-900 p-6 rounded-lg shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3 text-green-400 text-2xl font-semibold">
          <Music />
          <span>All Songs</span>
        </div>

        <AddSongDialog />
         
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-4 gap-4 text-sm text-gray-400 border-b border-gray-700 pb-2 mb-4 font-semibold">
        <div>Title</div>
        <div>Artist</div>
        <div>Released</div>
        <div>Action</div>
      </div>

      {/* Table Content */}
      <div className="flex flex-col gap-4">
        {allSongs.map((song) => (
          <div
            key={song._id}
            className="grid grid-cols-4 items-center gap-4 bg-zinc-800 p-3 rounded-md hover:bg-zinc-700 transition"
          >
            {/* Title + Image */}
            <div className="flex items-center gap-3">
              <img
                src={song.imageUrl}
                alt={song.title}
                className="h-12 w-12 rounded object-cover"
              />
              <span className="text-white">{song.title}</span>
            </div>

            {/* Artist */}
            <div className="text-gray-300">{song.artist}</div>

            {/* Release Date */}
            <div className="text-gray-400">{formatDate(song.createdAt)}</div>

            {/* Delete Button */}
            <div className="text-right">
              <button
                onClick={() => deleteSong(song._id)}
                className="p-2 rounded hover:bg-red-500/10 cursor-pointer"
                aria-label={`Delete ${song.title}`}
              >
                <Trash2 className="size-5 text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SongsTable;
