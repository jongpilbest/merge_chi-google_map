
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { Task } from "./Task";

import "./Column.css";

export const Column = ({ tasks }) => {

    console.log(tasks,'여기 컬럼에서 확인좀 부탁')
  return (
    <div className="column">
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        {tasks&&tasks.length>0&& tasks.map((task,index) => (
          <Task key={task.id} id={task.id} El={task}  idx={index} />
        ))}
      </SortableContext>
    </div>
  );
};