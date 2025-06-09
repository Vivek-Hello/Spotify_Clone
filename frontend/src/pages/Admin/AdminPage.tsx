import { useAuthStore } from "@/store/useAuthStore";
import Header from "./compnenet/Header";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Music } from "lucide-react";
import SongsTable from "./compnenet/SongsTable";
import AlbumsTable from "./compnenet/AlbumsTable";
import { useEffect } from "react";
import { useMusicStore } from "@/store/useMusicStore";

const AdminPage = () => {
  const { isAdmin, isLoading, error } = useAuthStore();
  const { featchAlbums, fetchSongs } = useMusicStore(); 

  useEffect(() => {
    featchAlbums();
    fetchSongs();
  }, [featchAlbums, fetchSongs]);

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="bg-background m-2">
      {isAdmin && (
        <div>
          <Header />
          <Tabs defaultValue="songs" className="px-4 py-6">
            <TabsList className="space-x-4">
              <TabsTrigger
                value="songs"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Music className="mr-2 size-4" />
                <span>Songs</span>
              </TabsTrigger>
              <TabsTrigger
                value="albums"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Music className="mr-2 size-4" />
                <span>Albums</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="songs">
              <SongsTable />
            </TabsContent>
            <TabsContent value="albums">
              <AlbumsTable />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
