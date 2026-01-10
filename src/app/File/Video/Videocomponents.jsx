"use client";

import ReactPlayer from 'react-player'
import { forwardRef ,useState,useEffect, useRef} from "react";
import { useSelector,shallowEqual, useDispatch } from "react-redux"
import { set_video_mareker_id } from '../../Redux/store';
// ref가 ReactPlayer 인스턴스에 '직접' 붙도록 반드시 forwardRef 사용
const VideoPlayer = forwardRef(function VideoPlayer({ url }, ref) {

          
    const comment= useSelector((state)=>state.data_store.location_data,shallowEqual) 
    const dispatch= useDispatch();
    const youtube_link = useSelector((state) => state.url.current_video);
    const youtube_cuurent_url= useSelector((state)=> state.url.url_current);

     const [ready, setReady] = useState(false);
       const [playing, setPlaying] = useState(false);

   useEffect(() => {
    setReady(false);
  }, [url]);

    const [currentTime, setCurrentTime] = useState(0);
    console.log(currentTime,'현재시간? ')
  
  useEffect(() => {
    if (ready && ref.current && youtube_link != null) {
      const seekTime = Number(youtube_link);
      // 약간 딜레이 후 실행 (iframe 갱신 대기)
      const timer = setTimeout(() => {
        try {
            setPlaying(false); 
          ref.current.seekTo(seekTime, "seconds");
           setPlaying(true); 
        } catch (err) {
          console.warn("Seek failed:", err);
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [ready, youtube_link]);

  const getActiveMarkerId= function(playedSeconds,comment){
   console.log(youtube_cuurent_url,'현재 링크 뭐시어')
    if(comment){
        // comment.
      
        const comment_filter=comment&&Object.values(comment).map(arr => arr[0]).flat().filter((el)=>el.url==youtube_cuurent_url).filter((el)=>el.startTime <= playedSeconds &&
         playedSeconds <= el.endTime);
       
        if(comment_filter[0]){
              return comment_filter[0].id
        }
       
    }

    return false
   
  }
  const lastActiveId =useRef(null);

  const handleProgress = ({ playedSeconds }) => {
  const activeId = getActiveMarkerId(playedSeconds, comment);

      if (activeId&& activeId !== lastActiveId.current) {
        lastActiveId.current = activeId;
        dispatch(set_video_mareker_id(activeId))
      }
      else if( lastActiveId.current!=false && activeId==false){
         dispatch(set_video_mareker_id(null))
      }
};

  return (
    <ReactPlayer
      ref={ref}
      url={url}
      controls
      width="100%"
      height="100%"
      onProgress={(el)=>handleProgress(el)}
      progressInterval={1000}
      playing={playing}
      onReady={() => setReady(true)}

  
    />
  );
});

export default VideoPlayer;
