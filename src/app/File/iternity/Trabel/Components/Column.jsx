
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
const hours = Math.floor(totalTime / 60);
const minutes = totalTime % 60;
  return (
    <div className="column">
      <div>
        <p className="font-bold py-4">Total Time </p>
         <p>${hours}시간 ${minutes}분 </p>
      </div>
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        {tasks&&tasks.length>0&& tasks.map((task,index) => (
          <Task key={task.id} id={task.id} El={task}  idx={index} />
        ))}
      </SortableContext>
    </div>
  );
};