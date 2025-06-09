import { ResizablePanelGroup, ResizablePanel } from "@/components/ui/resizable";
import { Outlet } from "react-router-dom";
import LeftSidebar from "./comp/LeftSidebar";
import AudioPlayer from "./comp/AudioPlayer";
import PlaybackController from "./comp/PlaybackController";
const MainLayout = () => {
  const isMobile = false;
  return (
    <div className="bg-black text-white flex flex-col">

     
      <ResizablePanelGroup direction="horizontal" className="flex-1 flex h-screen overflow-hidden p-2">
      <AudioPlayer />
        {/* left side */}
        <ResizablePanel
          defaultSize={20}
          minSize={isMobile ? 0 : 10}
          maxSize={30}
        >
          <LeftSidebar />
        </ResizablePanel>

        {/* main component */}
        <ResizablePanel defaultSize={80}>
          <Outlet />
        </ResizablePanel>
      </ResizablePanelGroup>
      <PlaybackController />
    </div>
  );
};

export default MainLayout;
