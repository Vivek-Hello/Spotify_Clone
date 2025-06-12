import type { Song } from "@/types";
import { create } from "zustand";

interface PlayerStore {
    currentSong:Song | null;
    isPlaying:boolean;
    queue:Song[];
    currentIndex:number;

    initializeQueue:(songs:Song[])=>void;
    playAlbum:(songs:Song[],startIndex:number)=>void;
    setCurrentSong:(song:Song | null)=>void;
    togglePlay:()=>void;
    playNext:()=>void;
    playPrevious :()=>void;
}


export const usePlayerStore = create<PlayerStore>((set,get)=>({
    currentSong:null,
    isPlaying:false,
    queue:[],
    currentIndex:-1,

    initializeQueue:(songs:Song[])=>{
        set({
            queue:songs,
            currentSong:get().currentSong || songs[0],
            currentIndex: get().currentIndex === -1 ? 0 : get().currentIndex,
        })
    },
    playAlbum:(songs:Song[],startIndex:number)=>{
        startIndex = 0;
        if (songs.length ===0) {
            return;
        }
        const song =  songs[startIndex];

        set({
            queue:songs,
            currentSong:song,
            isPlaying:true,
            currentIndex:startIndex
        })
    },
    setCurrentSong:(song:Song | null)=>{
        if (!song) {
            return;
        }
        const songIndex =  get().queue.findIndex(s => s._id === song._id);
        set({
            currentSong : song,
            currentIndex : songIndex !== -1? songIndex: get().currentIndex,
            isPlaying:true,
        })
    },
    togglePlay:()=>{
        const toggel =  !get().isPlaying;
        set({
            isPlaying:toggel,
        })
    },
    playNext:()=>{
        const {currentIndex,queue} = get();
        const nextIndex =  currentIndex +1;

        // if next exist then
        if (nextIndex < queue.length) {
            const nextSong =  queue[nextIndex];
            set({
                currentSong : nextSong,
                currentIndex :nextIndex,
                isPlaying:true,
            })
        }
        else{
            set({isPlaying:false})
        }
    },
    playPrevious :()=>{
        const {currentIndex,queue} = get();
        const prevIndex =  currentIndex -1;

        // if next exist then
        if (prevIndex >= 0) {
            const prevSong =  queue[prevIndex];
            set({
                currentSong : prevSong,
                currentIndex :prevIndex,
                isPlaying:true,
            })
        }
        else{
            set({isPlaying:false})
        }
    },
}))