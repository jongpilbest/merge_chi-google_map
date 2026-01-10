import React, { useState } from "react";
import { LuMapPinned } from "react-icons/lu";
import { BiSolidDownArrow } from "react-icons/bi";
import{personal_color_place} from '../../Redux/store'
import { useDispatch, useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa";
import { url_out } from "../../Redux/store";
export default function VideoList({id_key}) {
  const dispatch= useDispatch();

const { url_list } = useSelector((state: any) => state.url);


  const [selected, setSelected] = useState<boolean>(false); 



  return (
    <>
     
       <div
  onClick={() => setSelected((el) => !el)}
  className={`py-1.5 
  relative
  flex-[0.5]
    px-2 rounded-md flex gap-2 items-center justify-between 
    bg-[#47D6A2]`}
>
  <div className="flex gap-2 items-center    ">
 
    <p
      className={`
        text-xs
      text-white`}
    >
    Videos
    </p>
  </div>

  <BiSolidDownArrow
    className={

   "text-white"}
  />
    {selected&&

        <div
         className="
    absolute 
    flex flex-col
    bg-white 
  w-full
    shadow-md 
    rounded-xl 
    top-10
    
    z-[1000] 
    mt-1.5
  "
        >
          {url_list.length>0&&url_list.map((day,index) => (
            <div
              key={day}
            
              onClick={(e) => {
                e.preventDefault();
                //dispatch()
                 dispatch(url_out(index))
              }}
              className="w-full h-8 bg-white flex items-center hover:bg-gray-300    justify-between p-2 "
            >
              <p className="font-bold text-xs ">{day}</p>
             
            </div>
          
          ))}
         
        </div>
      

}
</div>

        </>
  );
}
