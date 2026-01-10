
import React from "react";
import { useState ,useEffect } from "react";
import { Day_canlendar } from "./Day_Canceldner";
import Drawer from '../../../Place_list/Drawer'
import Inner_compont from "../../../Place_list/Inner_compont";
import { isDateRange } from "react-day-picker";
import { useSelector ,shallowEqual,useDispatch } from "react-redux";
 import { Time_Duration } from '@/app/Redux/store';

import{formatTime,count_day} from '.././geoUtils'
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import { Column } from "./Components/Column";
 import { change_selected_mark,chnage_original_route_data,change_check_Check  } from "../../../Redux/store";
export const Travel2= function(){

   const travel_data =useSelector(state => state.data_store.travel_Result);
    
    
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const getTaskPos = (id) => filter_comment.findIndex((task) => task.id === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id === over.id) return;

    set_filter_comment((tasks) => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);
      return arrayMove(tasks, originalPos, newPos);
    });
  };


     const tabs = [
    { id: 0, label: "Day 1" },
    { id: 1, label: "Day 2" },
    { id: 2, label: "Day 3" },
    { id: 3, label: "Day 4" },
  ];
  const dispatch= useDispatch();

    const [selectedDay, setSelectedDay] = useState(0);
     const[filter_comment, set_filter_comment]=useState([]);
    console.log(filter_comment,'데이2')
     
useEffect(() => {
  if (!travel_data?.tabs?.length) return;
  if (travel_data.daydata.length > 0) {
    //set_pick_day(selectedDay);
    set_filter_comment([...travel_data.daydata])
  
  }
}, []);
     const [ Check_day, setChek_day]=useState(0);
    
     const [range, setRange] = useState(isDateRange);

     const comment= useSelector((state)=>state.data_store.location_data,shallowEqual) 
       
     const { color_location } = useSelector((state) => state.data_store); 
              function Drawer_change(e){

              
                dispatch(Time_Duration({ first:1}))
                const resultKeys=Object.keys(color_location).filter(key => color_location[key] === e+1);
                

               const comment_filter = resultKeys
              .map((key) =>
                Object.values(comment)
                  .flat(Infinity)
                  .find((item) => item.id === key)
                 )
                 console.log(comment_filter,'뭐임?')
                
               set_filter_comment(comment_filter)
              setSelectedDay(e);
           
               }
             
useEffect(() => {
  Drawer_change(selectedDay);
}, [color_location])

const Travel_Day = function(){
       dispatch(Time_Duration({ first:filter_comment.length-1}))
       const Route_location= filter_comment.map((el)=>Object.values(el.location))

      //여기 뭔지 다시 확인해줘  
         console.log(Route_location,'뭐지? travel2')


       dispatch(chnage_original_route_data([Route_location]))
       dispatch(change_selected_mark(0))
       dispatch(change_check_Check())
 
}

    return(

        <>
         <div className=" flex flex-col h-full pt-4">
               

                 {
               <div className="h-full flex-1 pb-24  overflow-y-auto ">
               <Drawer change_category={(e) => Drawer_change(e)} tabs={tabs}>
                 <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
        <Column id="toDo" tasks={filter_comment} />
    
        {filter_comment.length>0 &&  <button 
         onClick={()=> Travel_Day()}
         className=" w-full
         hover:bg-green-500  
          h-8
          mt-5
         bg-[#47D6A2] rounded-md text-white  text-sm">
         Route generation
         </button>
          }
            </DndContext>
               </Drawer>        
       
         </div>
}
</div>
        </>
    )
}