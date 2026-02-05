
'use client'
import { useState } from 'react';
import {Travel__} from './Trabel/Travel'
import { Travel2 } from './Trabel/Travel2';
export default function DateRangePicker() {
  
  const [Auto,setAuto]=useState(
    'Auto'
  )


  return (
    <div className="flex flex-2 flex-col px-8 h-full overflow-hidden relative">
      {/* ✅ Start date */}
      
    <div className="pt-5 pb-3 flex gap-10 items-center border-b  justify-between border-gray-200">


        <p className="text-sm font-bold text-black">My itinerary</p>
          <div className="flex items-center shadow rounded-2xl px-1   ">
           

                  
                </div>

     </div>
     {
      Auto=='Auto'&&  <Travel__></Travel__>
     }
   
 
    </div>
  );
}