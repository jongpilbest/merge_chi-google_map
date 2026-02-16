import { useMemo } from "react";
import { useSelector, shallowEqual } from "react-redux";

export default function Total_time() {
   const Total_duration = useSelector(
    (state) => state.contorller.Duration_Time
  );

 const totalTime = Total_duration.reduce((acc, cur) => {
  const walk = Number(cur?.WALK) || 0;
  const transit = Number(cur?.TRANSIT) || 0;
  return acc + walk + transit;
}, 0);



 function time_changer( total_time){
   // total_time: 초 단위

  if (total_time >= 3600) {
    const hours = Math.floor(total_time / 3600);
    const minutes = Math.floor((total_time % 3600) / 60);
    return `${hours}시간 ${minutes}분`;
  } else {
    const minutes = Math.floor(total_time / 60);
    return `${minutes}분`;
  }
}


const time_total= time_changer(totalTime)

  return (
    <div className="flex h-10 p-2 justify-between shrink-0 bg-white">
      <p className="font-bold text-sm">전체 이동 시간</p>
      <p className="text-sm">{time_total}</p>
    </div>
  );
}
