import axiosConfig from "@/lib/axios";
import type { Album, Song } from "@/types";
import { create } from "zustand";
import toast from "react-hot-toast";


interface MusicStore {
  albums: Album[];
  songs: Song[];
  allSongs:Song[];
  isLoading: boolean;
  error: string | null;
  currentAlbum: Album | null;
  featuredSongs: Song[];
	madeForYouSongs: Song[];
	trendingSongs: Song[];

  featchAlbums: () => Promise<void>;
  featchAlbumById: (id: string) => Promise<void>;

  fetchFeaturedSongs: () => Promise<void>;
	fetchMadeForYouSongs: () => Promise<void>;
	fetchTrendingSongs: () => Promise<void>;

	fetchSongs: () => Promise<void>;
	deleteSong: (id: string) => Promise<void>;
	deleteAlbum: (id: string) => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set) => ({
  albums: [],
  songs: [],
  isLoading: false,
  error: null,
  currentAlbum: null,
  allSongs:[],
  madeForYouSongs: [],
	featuredSongs: [],
	trendingSongs: [],


  deleteSong: async (id) => {
		set({ isLoading: true, error: null });
		try {
			await axiosConfig.delete(`/admin/deletesong/${id}`);

			set((state) => ({
				songs: state.songs.filter((song) => song._id !== id),
			}));
			toast.success("Song deleted successfully");
		} catch (error: any) {
			console.log("Error in deleteSong", error);
			toast.error("Error deleting song");
		} finally {
			set({ isLoading: false });
		}
	},

	deleteAlbum: async (id) => {
		set({ isLoading: true, error: null });
		try {
			await axiosConfig.delete(`/admin/deletealbum/${id}`);
			set((state) => ({
				albums: state.albums.filter((album) => album._id !== id),
				songs: state.songs.map((song) =>
          song.albumId === state.albums.find((a) => a._id === id)?.title
            ? { ...song, album: null }
            : song
        ),
        
			}));
			toast.success("Album deleted successfully");
		} catch (error: any) {
			toast.error("Failed to delete album: " + error.message);
		} finally {
			set({ isLoading: false });
		}
	},

  featchAlbums: async () => {
    set({
      isLoading: true,
      error: null,
    });
    try {
      const res = await axiosConfig.get("/album");
      set({ albums: res.data.albums });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchSongs: async() => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosConfig.get("/song/getallsong");
      set({ allSongs: res.data.songs });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  featchAlbumById: async (id: string) => {
    set({ isLoading: true, error: null });
  
    try {
      const res = await axiosConfig.get(`/album/getalbum/${id}`);
      set({ currentAlbum: res.data.album });
  
      return res.data.album; // ✅ Return the Album object
    } catch (error: any) {
      set({ error: error.response.data.message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  }
  ,


  fetchFeaturedSongs: async() => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosConfig.get(`/song/featuredsong`);

      set({ featuredSongs: res.data.songs });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },


	fetchMadeForYouSongs: async() => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosConfig.get(`/song/made-for-you`);

      set({ madeForYouSongs: res.data.songs });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  
	fetchTrendingSongs: async() => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosConfig.get(`/song/trending`);

      set({ trendingSongs: res.data.songs });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },




}));
