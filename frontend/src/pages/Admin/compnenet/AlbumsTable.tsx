import { useMusicStore } from "@/store/useMusicStore";
import { Trash2, LibraryBig, SquarePlus } from "lucide-react";
import AddAlbumDialog from "./AddAlbumDialog";

const AlbumsTable = () => {
  const { albums, deleteAlbum } = useMusicStore();

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
          <LibraryBig />
          <span>All Albums</span>
        </div>

        <AddAlbumDialog>
          <button
            className="bg-green-400 px-4 py-2 rounded-lg flex items-center gap-2 text-black hover:bg-green-300 transition"
            aria-label="Add new album"
          >
            <SquarePlus className="size-4" />
            <span>Add Album</span>
          </button>
        </AddAlbumDialog>
      </div>

      {/* Table Head */}
      <div className="grid grid-cols-3 gap-4 text-sm text-gray-400 border-b border-gray-700 pb-2 mb-4 font-semibold">
        <div>Album</div>
        <div>Released</div>
        <div>Action</div>
      </div>

      {/* Table Body */}
      <div className="flex flex-col gap-4">
        {albums.map((album) => (
          <div
            key={album?._id}
            className="grid grid-cols-3 items-center gap-4 bg-zinc-800 p-3 rounded-md hover:bg-zinc-700 transition"
          >
            {/* Title + Cover */}
            <div className="flex items-center gap-3">
              <img
                src={album.imageUrl}
                alt={album.title}
                className="h-12 w-12 rounded object-cover"
              />
              <span className="text-white">{album.title}</span>
            </div>

            {/* Release Date */}
            <div className="text-gray-400">{formatDate(album.createdAt)}</div>

            {/* Delete Button */}
            <div className="text-right">
              <button
                onClick={() => deleteAlbum(album._id)}
                className="p-2 rounded hover:bg-red-500/10 cursor-pointer"
                aria-label={`Delete ${album.title}`}
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

export default AlbumsTable;
