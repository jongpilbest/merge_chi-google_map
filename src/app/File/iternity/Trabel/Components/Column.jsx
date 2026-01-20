
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { Task } from "./Task";

import "./Column.css";
import { useSelector } from "react-redux";
export const Column = ({ tasks }) => {

   const Total_duration = useSelector(
    (state) => state.contorller.Duration_Time
  );
  const totalTime = Total_duration.reduce((acc, cur) => {
  const walk = cur.WALK ?? 0;
  const transit = cur.TRANSIT ?? 0;
  return acc + walk + transit;
}, 0);

 function time_changer( total_time){
   if(total_time>=60*60){
    // 인 경우에만 
    const hours = Math.floor(total_time / 60);
    const minutes = total_time % 60;
     return `${hours}시간 ${minutes}분`
   }
   else{
         const hours = Math.floor(total_time / 60);
     return `${hours}분 `
   }
}


const time_total= time_changer(totalTime)



  return (
    <div className="column">
      <div className="flex  p-4  justify-between ">
        <p className="font-bold">Total Time </p>
         <p> {time_total}  </p>
      </div>
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        {tasks&&tasks.length>0&& tasks.map((task,index) => (
          <Task key={task.id} id={task.id} El={task}  idx={index} />
        ))}
      </SortableContext>
    </div>
  );
};