import { useDispatch,useSelector,shallowEqual } from 'react-redux';

import { useCallback , useState} from 'react';
import {
useAdvancedMarkerRef,
  useMapsLibrary,
  AdvancedMarker,
  Pin
} from "@vis.gl/react-google-maps";

//음식
import './custom-advanced-marker.css';

import { map_click_toggle } from '@/app/Redux/store'


import {Place} from './MapType'

const colors = {"pink":"bg-[#FA25F0]", 
  "purple":"bg-[#974AF7]",
  "gradient_green":"bg-conic/decreasing from-violet-700 via-lime-300 to-violet-700",
  "gradient_category":"bg-gradient-to-r from-teal-400 to-yellow-200",
   1:"bg-[#FF0000]",
   2:"bg-[#FEFD48]",
   3:"bg-[#6CFD33]",
   4:"bg-[#0EFCFE]"
};

import Map_viewer from './Map_viewer';



export function Make_Marker({ location,id,color,opacity,emozi }) {

    const [markerRef, marker] = useAdvancedMarkerRef();

    const dispatch= useDispatch()
  
  
  const Mark_Pin_set = useSelector((state) => state.contorller.selectedMark)
  const { map_click, clicked_marker_id } = useSelector((state) => state.data_store);
  const collisionBehavior =
  google.maps.CollisionBehavior.REQUIRED;


   const indexWithId = Mark_Pin_set.findIndex((set) => {
   return set.has(id)});




   
   const handleMarkerClick = ()=>{
      dispatch(map_click_toggle(null));
      // 여기 코드 보니까 넣은거 같은데?
    }


     useMapsLibrary('places');
     // Handle marker click to select this place

    // Handle info window close by deselecting this place
  
 const isOpen = map_click && clicked_marker_id === id;
  return(
   <>
        <AdvancedMarker
          ref={markerRef}
          zIndex={opacity >= 1 ? 1000 : 1}
          position={location}
          collisionBehavior={collisionBehavior}
          onClick={()=>dispatch(map_click_toggle(id))}  
        >
          
   <div className={`flex flex-row items-center group cursor-pointer radius absolute
 
    `}>
    {/* 동그라미 부분 */}
    <div className={`flex 
    ${color ? 'w-15' : 'w-10'}
    items-center justify-center  border-green-800 border-2  bg-white text-white  transition-transform group-hover:scale-110`}>
     <div className={`flex items-center justify-center ${color ? `${colors[color]}` : 'bg-white'}`}>
       
<span
  className={`${
    color ? 'text-[20px]' : 'text-[13px]'
  } 
   
   duration-200`}
>
  {emozi}
</span>
        </div>
  
    </div>


 
  </div>

  </AdvancedMarker>



   {

   isOpen &&  <Map_viewer id={id} handleMarkerClick={handleMarkerClick}></Map_viewer>
   

   }


      
      </>
  )
 
}
