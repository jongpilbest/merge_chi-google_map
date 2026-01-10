import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useSelector } from "react-redux";
import "./Task.css";
import React from "react";
import{formatTime,count_day} from '../../geoUtils'
import Inner_compont from "../../../../Place_list/Inner_compont";
 import { FaTrainSubway } from "react-icons/fa6";
import { FaPersonWalking } from "react-icons/fa6";
export const Task = ({ id, El, idx }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id,
    activationConstraint: {
      distance: 6, // 클릭/드래그 구분 안정화
    },
  });

  const Total_duration = useSelector(
    (state) => state.contorller.Duration_Time
  );

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="task flex flex-col"
    >
      {/* ✅ 드래그 핸들 */}
      <div
        {...attributes}
        {...listeners}
        className=" text-gray-400 text-xs w-full bg-gray-100 "
      >
        ☰
      </div>

      {/* ✅ Inner_compont 클릭 정상 */}
      <Inner_compont data={El} />

      {/* 다음 장소가 존재할 때만 시간 표시 */}
      {Total_duration?.[idx] && (
        <div className="flex flex-row gap-4 items-center my-2 text-gray-600 text-sm justify-center">
          {Total_duration[idx].WALK > 0 && (
            <span className="flex text-xs items-center gap-1">
              <FaPersonWalking />
              {formatTime(Total_duration[idx].WALK)}
            </span>
          )}

          {Total_duration[idx].TRANSIT > 0 && (
            <span className="flex text-xs items-center gap-1">
              <FaTrainSubway />
              {formatTime(Total_duration[idx].TRANSIT)}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
