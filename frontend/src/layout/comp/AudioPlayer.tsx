import { usePlayerStore } from "@/store/usePlayerStore";
import { useEffect, useRef } from "react";

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const prevSongRef =  useRef<string|null>(null);

  const {isPlaying,currentSong,playNext} =  usePlayerStore(); 

  useEffect(()=>{
    if (isPlaying) {
      audioRef.current?.play();
    }else{
      audioRef.current?.pause();
    }
  },[isPlaying]);

// handling ended song 
  useEffect(()=>{
    const audio = audioRef.current;

     const handleEnding =()=>{
      playNext();
     }

    audio?.addEventListener("ended",handleEnding);

    return ()=> audio?.removeEventListener("ended",handleEnding);
  },[playNext]);

// handle changing song
  useEffect(()=>{

    if(!audioRef.current || !currentSong)return;
    
    const audio =  audioRef.current;

    const isSongChanged =  prevSongRef.current !== currentSong?.audioUrl;
    if (isSongChanged) {
      audio.src = currentSong?.audioUrl;

      audio.currentTime = 0;

      prevSongRef.current =  currentSong.audioUrl;

      if (isPlaying) {
        audio.play();
      }
    }
  },[currentSong,isPlaying]);


  return (
    <audio ref={audioRef} />
  );
}

export default AudioPlayer;
