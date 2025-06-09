import PlaylistSkeleton from "@/components/skeletons/PlaylistSkeleton";
import { useMusicStore } from "@/store/useMusicStore";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { BookAudio, HomeIcon } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const LeftSidebar = () => {
  const { albums, isLoading, error, featchAlbums } = useMusicStore();

  useEffect(() => {
    featchAlbums();
  }, [featchAlbums]);

 
  return (
    <div className="h-screen  bg-zinc-900 p-4 flex flex-col gap-4 shadow-lg">
      {/* Navigation Section */}
      <div className="w-full bg-zinc-800 rounded-lg p-3 hover:bg-zinc-700 transition-all cursor-pointer">
        <Link
          to="/"
          className="flex items-center gap-3 text-white focus:outline-none"
        >
          <HomeIcon size={20} className="text-gray-400" />
          <span className="hidden md:inline font-medium">Home</span>
        </Link>
      </div>

      {/* Library Section */}
      <div className="w-full flex flex-col bg-zinc-700 rounded-lg p-3 transition-all gap-3">
        <div className="flex items-center gap-3 text-gray-400">
          <BookAudio size={20} />
          <span className="font-medium">Library</span>
        </div>

        {/* Scrollable Playlist Area */}
        <ScrollArea className="h-[calc(100vh-300px)] overflow-y-auto">
          <div className="p-2 space-y-2">
            {isLoading ? (
              <PlaylistSkeleton />
            ) : (
              albums.map((album) => (
                <Link
                  to={`/album/${album?._id}`}
                  key={album._id}
                  className="flex items-center gap-3 p-3 bg-zinc-800 rounded-md transition-all hover:bg-zinc-700 hover:shadow-md group cursor-pointer"
                >
                  {/* Album Image */}
                  <img
                    src={album.imageUrl}
                    alt="Playlist image"
                    className="size-12 rounded-md object-cover"
                  />

                  {/* Album Details */}
                  <div className="flex-1 min-w-0 hidden md:block">
                    <p className="text-white font-medium truncate">
                      {album.title}
                    </p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default LeftSidebar;
