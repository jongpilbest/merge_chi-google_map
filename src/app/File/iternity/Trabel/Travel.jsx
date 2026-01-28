import React, { use, useRef, useState } from "react";

import "react-day-picker/style.css";
import { kMeans, runKMeansWithOptimalInertia } from "k-means-clustering-js";
import { Cluster } from "k-means-clustering-js/dist/types";
import { useDispatch } from "react-redux";
import { Column } from "./Components/Column";
import { isDateRange } from "react-day-picker";
import { useSelector } from "react-redux";
import Drawer from '../../../Place_list/Drawer'
import Inner_compont from "../../../Place_list/Inner_compont";
import { FaTrainSubway } from "react-icons/fa6";
import { FaPersonWalking } from "react-icons/fa6";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
 import { useEffect } from "react";
import { FaSpinner } from "react-icons/fa6";
 import { Time_Duration } from '@/app/Redux/store';
import { Suspense } from "react";
import { chnage_original_route_data ,change_check_Check,personal_color_place} from "../../../Redux/store";
import { change_selected_mark ,set_SelectedDay} from "../../../Redux/store";
import { shallowEqual } from "react-redux";
import{formatTime ,makeOrderedRoute,find_key} from '.././geoUtils'
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import {Day_canlendar} from './Day_Canceldner'

export const Travel__= function(){
    
     const { color_location } = useSelector((state) => state.data_store); 

     const travel_data =useSelector(state => state.data_store.travel_Result);
     let original_route= useSelector((state) => state.contorller.original_route_data);
    
     const dispatch= useDispatch()
      
      const comment= useSelector((state)=>state.data_store.location_data,shallowEqual) 
      const Total_duration=useSelector((state)=>state.contorller.Duration_Time)
      const total = Total_duration.reduce(
  (sum, d) => sum + (d.WALK ?? 0) + (d.TRANSIT ?? 0),
  0
);

    
     const[filter_comment, set_filter_comment]=useState([]);
     const [pick_day, set_pick_day]=useState(0);
     const [range, setRange] = useState(isDateRange);
      const [total_travel, settotal_Travel] = useState({
        day:0,
        tabs:[]
      });
      const[Daydata,setDaydata]=useState([]);
      

useEffect(() => {
  if (!travel_data?.tabs?.length) return;
  if (travel_data.daydata.length > 0   ) {
     settotal_Travel(prev => ({
    ...prev,
    tabs: [...travel_data.tabs],
  }));
    //set_pick_day(selectedDay);
    set_filter_comment([...travel_data.daydata])
  
  }
}, []);

    
       useEffect(() => {
      if ( Total_duration.every(obj => Object.keys(obj).length !=0) ) {
        // Duration이 갱신되면 강제로 렌더링 트리거 (state sync)
      
        set_filter_comment([...filter_comment]);
      }
    }, [Total_duration]);
    
  
      
    const { like_location } = useSelector((state) => state.data_store);
    
    


      const Travel_Day= function(){
    
          if(Object.values(like_location).length==0 || range.from ==null|| range.to ==null  ) return;
        const startDate = new Date(range.from);
        const endDate = new Date(range.to) 
        
        //  시간 차(밀리초 단위) 계산
        const diffTime = endDate - startDate; // 밀리초(ms)
        
        //  일(day) 단위로 변환
        const diffDays = diffTime / (1000 * 60 * 60 * 24);
      
        // 여기 객체로 넣는법
        let tabs=[]
        for(var i=0; i<=Number(diffDays); i++){
         tabs.push({
           "id":i+1, "label":`${i+1} Day`
         })
        }
        
     settotal_Travel(prev => ({
  ...prev,
  day: diffDays,
  tabs: [...tabs],
}));


        set_filter_comment([])
           dispatch( set_SelectedDay({
         tabs: [...tabs],
         })
        )
       Make_travel(Object.values(like_location),diffDays)
      
        // 두개보내지말고 걍 .. 인덱스 보낼까..귀찮네 
 
      }
    
      const Make_travel= async function(places,day){
    
      const results = runKMeansWithOptimalInertia({
          data:places,
          k: day+1,
        });
    
       const final_data=results.map((el)=>makeOrderedRoute(el.points))
       
        final_data.map((el,index)=>{
        const place_id= find_key(el, like_location)
        //redux 으로 그 인덱스 값 뒤에 바꾸기 
          // 이건 색 매칭하는거임  
        place_id.map((el)=> dispatch(personal_color_place({key:el,index:index+1})))
       })
        
        setDaydata(final_data)
        dispatch(change_check_Check())
        dispatch(chnage_original_route_data(final_data))
        dispatch(change_selected_mark(pick_day-1))
      

    
      }
      function Drawer_change(e){
     // ✅ undefined 검사 먼저
        set_pick_day(e)
       // 여기 기존이랑 똑같아서 안생기는거임. 그래서 이걸 고치ㅕㄴ되ㅣㄽ ;;
        dispatch(change_selected_mark(e-1))
        const filter_data_day= Daydata[e-1] 
        /// 
        if(!filter_data_day || !Array.isArray(filter_data_day)) return;
    
        dispatch(Time_Duration({ first:filter_data_day.length-1}))
        // 길이 구색 맞추기 
    
      // ✅ 두 번째 방어: 비어 있는 배열 확인
      if (!Array.isArray(filter_data_day) || filter_data_day.length === 0) {
       // console.warn("⚠️ Drawer_change: filter_data_day is empty", filter_data_day);
        return;
      }
       
    
       const resultKeys = find_key(filter_data_day,like_location)
      const comment_filter = resultKeys
      .map((key) =>
        Object.values(comment)
          .flat(Infinity)
          .find((item) => item.id === key)
      )
      .filter(Boolean);
     
       if(comment_filter.length>0){
        set_filter_comment(comment_filter)
        //여기에 그냥 크기만 입력하는거 하나 만들???
       }
     


       
    
      }

  useEffect(() => {
  //.log(pick_day,'픽데이')
  if (!color_location || pick_day< 0) return;

  // 1. 현재 날짜의 장소만 추출

  const today_keys = Object.entries(color_location)
    .filter(([_, value]) => value === pick_day)
    .map(([key]) => key);

  if (today_keys.length === 0) {
   // console.log("❗ 선택된 날짜에 장소 없음");
    return;
  }

  // 2. 해당 장소들의 좌표 가져오기
  const today_places = today_keys
    .map((key) => like_location[key])
    .filter(Boolean);

  if (today_places.length === 0) {
    //console.log("❗ 장소 좌표 없음");
    return;
  }

  // 3. 해당 날짜의 경로 새로 계산
  const result = runKMeansWithOptimalInertia({
    data: today_places,
    k: 1, // 하루치만 계산
  });

  const newRoute = makeOrderedRoute(result[0].points);
      dispatch(Time_Duration({ first:1}))

  // 4. 기존 Daydata에 반영
  const updatedDaydata = [...Daydata];
  //console.log('업데이트된 daydata라는데 뭐가?',updatedDaydata,Daydata,'데이데이터')
  updatedDaydata[pick_day - 1] = newRoute;

//  console.log('업데이트 된데이터라는데 ', updatedDaydata)
  dispatch(chnage_original_route_data(updatedDaydata));
  setDaydata(updatedDaydata); // local state도 업데이트

  // 5. 장소 ID 추출 + 코멘트 필터링
  const resultKeys = find_key(newRoute, like_location);

  const comment_filter = resultKeys
    .map((key) =>
      Object.values(comment)
        .flat(Infinity)
        .find((item) => item.id === key)
    )
    .filter(Boolean);

  set_filter_comment(comment_filter);
 dispatch( set_SelectedDay({
           daydata: comment_filter,
           selectedDay:pick_day-1
         })
        )
    

}, [color_location,pick_day]);


    
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

const Travel_Day2 = function(){

       const Route_location= filter_comment.map((el)=>Object.values(el.location))

      //여기 뭔지 다시 확인해줘  
   //   console.log(Route_location, original_route,pick_day)
   
  const hey = [...original_route];
  hey[pick_day-1] = Route_location;
 console.log(hey,'값')

      dispatch(chnage_original_route_data(hey));
      dispatch(Time_Duration({ first: filter_comment.length - 1 }));
      dispatch(change_check_Check())
 
}


    return(
   <>
   
         <div className=" flex flex-col">
         <Day_canlendar range={range} setRange_fun={(e)=>setRange(e)}   ></Day_canlendar>
     
         <button 
         onClick={()=> Travel_Day()}
         className="
         hover:bg-green-500
         bg-[#47D6A2] rounded-md text-white py-2 text-sm">
          Distance-driven itinerary planning
         </button>
           </div>
           <div className="h-full flex-1  overflow-y-auto">
           {total_travel.tabs.length>0&&
               <Drawer change_category={(e) => Drawer_change(e)} tabs={total_travel.tabs}>
                 <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
        <Column id="toDo" tasks={filter_comment} />
    
        {filter_comment.length>0 &&  <button 
         onClick={()=> Travel_Day2()}
         className=" w-full
         hover:bg-green-500  
          h-8
          mt-5
         bg-[#47D6A2] rounded-md text-white  text-sm">
          Itinerary restructuring
         </button>
          }
            </DndContext>
               </Drawer>        
       
   }
       </div>
   </>

    )
}