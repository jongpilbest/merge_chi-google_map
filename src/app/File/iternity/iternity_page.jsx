
'use client'
import { useState } from 'react';
import {Travel__} from './Trabel/Travel'
import { Travel2 } from './Trabel/Travel2';
export default function DateRangePicker({active}) {
  
  const [Auto,setAuto]=useState(
    'Auto'
  )

  console.log(active,'엥')

  return (
    <div  className={`${active ? 'block' : 'hidden'} flex flex-2 flex-col px-8 h-full overflow-hidden relative`}  >
      {/* ✅ Start date */}
      
    <div className="pt-3 pb-2 flex gap-10 items-center border-b  justify-between border-gray-200">


        <p className="text-sm font-bold text-black">선호 장소 기반 일정 만들기</p>
          <div className="flex items-center shadow rounded-2xl px-1   ">
           

                  
                </div>

     </div>
     {
      Auto=='Auto'&&  <Travel__></Travel__>
     }
   
 
    </div>
  );
}