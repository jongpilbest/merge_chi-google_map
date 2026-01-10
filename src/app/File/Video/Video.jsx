"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { useSelector } from "react-redux";
import VideoList from './VideoList'

// forwardRef 된 컴포넌트를 dynamic import (SSR 끔)
const VideoPlayer = dynamic(() => import("./Videocomponents"), {
  ssr: false,
});

export default function Page() {
  const playerRef = useRef(null);
  const youtube_link = useSelector((state) => state.url.url_current);

  return (
    <div className=" flex-[1.2] px-8 bg-white flex flex-col" >
         <div className="
         justify-between
         pt-3 pb-3 flex gap-10 items-center border-b border-gray-200">

  
          <p className="text-sm font-bold text-black">Video</p>
          <VideoList></VideoList>


         </div>
         <div className="pt-3 h-full">
   <VideoPlayer
     
       ref={playerRef}
       url={`https://www.youtube.com/watch?v=${youtube_link}`}
     />
         </div>
       
  
   </div>
  );
}

