import TopBar from "@/components/TopBar";
import { useMusicStore } from "@/store/useMusicStore";
import { useEffect } from "react";
import FeaturedSection from "./components/FeaturedSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import SectionGrid from "./components/SectionGrid";
const HomePage = () => {
  
  const {
    fetchMadeForYouSongs,
    fetchFeaturedSongs,
    fetchTrendingSongs,
    isLoading,
    error,
    trendingSongs,
    featuredSongs,
    madeForYouSongs,
  } = useMusicStore();


  useEffect(() => {
    const fetchAll = async () => {
      await fetchFeaturedSongs();
      await fetchMadeForYouSongs();
      await fetchTrendingSongs();
    };
  
    fetchAll();
  }, []); // ✅ Fetch only on initial mount
  
  // Separate useEffect for logging when store values update
  useEffect(() => {
    console.log("Featured Songs:", featuredSongs);
    console.log("Made For You Songs:", madeForYouSongs);
    console.log("Trending Songs:", trendingSongs);
  }, [featuredSongs, madeForYouSongs, trendingSongs]); // ✅ Logs when values update

     if (error) {
      return <div>Error: {error}</div>;
     }
  return (
    <div className=" rounded-md overflow-hidden">
      <TopBar />
      <ScrollArea className="h-[calc(100vh-100px)]">
        <div className="bg-zinc-900 p-4 rounded-md m-4 flex flex-col gap-4">
          <div>
          <h1 className="text-white text-3xl font-bold">Good Morning</h1>
          <p className="text-zinc-400">Here are some songs we recommend for you</p>
          </div>
          <FeaturedSection />
          <div className="flex flex-col gap-4 mt-4">
            <SectionGrid title="Made For You" songs={madeForYouSongs} isLoading={isLoading} />
            <SectionGrid title="Trending" songs={trendingSongs} isLoading={isLoading}  /> 
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default HomePage;
