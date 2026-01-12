import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci";
import Glance_section from './Glance_section';
import { FaArrowLeft } from "react-icons/fa6";
import Drawer from './Drawer'
import { useSelector ,shallowEqual} from 'react-redux';
import Inner_compont from './Inner_compont';
import PAris_Data from '../../app/../../public/Paris_Data'
import { set_category_name } from '../Redux/store';
  const tabs = [
    {id:'All', label:'All'},
   
    { id: "Food and Beverage", label: "Food and Beverage" },
     { id: "Shopping", label: "Shopping" },
       { id: "Attraction", label: "Attraction" },
        { id: "Transportation", label: "Transportation" },
    { id: "Accommodation", label: "Accommodation" },
       {id:'cancel',label:'cancel'},
         {id: "Experimental Data",label:"Experimental Data"},

  ];


import { useDispatch } from 'react-redux';

export default function page_list() {
  
  const comment= useSelector((state)=>state.data_store.location_data,shallowEqual) 
  const category_name= useSelector((state)=>state.data_store.category_name);
 const[filter_comment, set_filter_comment]=useState([]);

 const dispatch=useDispatch();


 const[setting,Setsetting]=useState('Glance');

  const [modal,setmodal]=useState({
    modal:false,
    name:''
  });
 
 /* 여기 둘다 , */
  function modal_change(name){

  
    setmodal({
      modal:true,
      name:name
    })
    const comment_filter=Object.values(comment).map(arr => arr[0]).flat().filter((el)=>el.city==name)    
    
    set_filter_comment(comment_filter)
  }

  function Drawer_change(activeTab){
    // 전체 데이터에서 그부분만 세팅해서 뽑는다는데  , 데이터 comment_filter 에서 2중 필터링 되나 확인해봐야될거같은데 
      if(activeTab!=undefined&&activeTab!=category_name){
      
        dispatch(set_category_name(activeTab))
      }
      if(activeTab=='All'){
        const comment_filter=comment&&Object.values(comment).map(arr => arr[0]).flat()   
         set_filter_comment(comment_filter)
      }
      else if( activeTab=="Experimental Data"){
         const comment_filter=comment&&Object.values(comment).map(arr => arr[0]).flat().filter((el)=>el.Data==1)   
         set_filter_comment(comment_filter)
      }
      else{
         const comment_filter=comment&&Object.values(comment).map(arr => arr[0]).flat().filter((el)=>el.category==activeTab)   
         set_filter_comment(comment_filter)
      }
     
  

  }

  
  
  return (
    <div className="flex flex-2 flex-col px-8 h-full overflow-hidden relative">

      <div className="pt-3 pb-3 flex gap-10 items-center border-b border-gray-200">
       {modal.modal && (
  <div className="absolute inset-0 z-50 bg-white flex flex-col px-8 rounded-md">
    <div className="w-full h-full shadow-xl flex flex-col">

      <header className="h-14 py-4 bg-gray-100 flex justify-between items-center px-3 border-b border-gray-200">
        <p className="
        text-black
        font-bold text-sm">{modal.name}</p>
        <button
          onClick={() =>
            setmodal({
              modal: false,
              name: '',
            })
          }
          className="bg-[#47D6A2] p-1 rounded-md"
        >
          <FaArrowLeft className="text-white" />
        </button>
      </header>

        <Drawer change_category={(e)=>Drawer_change(e)}     tabs={tabs} >
            
             
      <div className=" flex-1 overflow-y-auto p-3">
        { filter_comment.map((El) => (
          <Inner_compont key={El.describe} data={El} />
        ))}
      </div>

       </Drawer>
    </div>
  </div>
)}


        <p className="text-sm font-bold">Place</p>
       {/*
        <div className="flex items-center flex-1 bg-gray-100 shadow rounded-md px-3 py-1">
          <input
            placeholder="Find Place"
            className="text-xs h-6 px-2 w-full text-gray-800 bg-transparent outline-none placeholder-gray-400"
          />
          <button className="text-white w-5 h-5 flex justify-center items-center hover:text-green-700 transition-colors bg-[#47D6A2] rounded-md">
            <CiSearch className="text-sm" />
          </button>
        </div>
       */}
      </div>


   
      <div className="flex w-full gap-8 justify-between pt-3">

        {
          /*
           <button 
        onClick={()=>Setsetting('Glance')}
       className={`flex-1 py-1.5 ${
  setting === 'Glance' ? 'bg-[#47D6A2] text-white' : 'bg-gray-100 text-gray-400'
} text-sm  rounded-md hover:bg-green-600 hover:text-white`}
       >
          Glance
        </button>
        <button 
         onClick={()=>Setsetting('Concise')}
       className={`flex-1 py-1.5 ${
  setting === 'Concise' ? 'bg-[#47D6A2] text-white' : 'bg-gray-100 text-gray-400'
} text-sm  rounded-md hover:bg-green-600 hover:text-white`}
       >
          Concise
        </button>
          */

        }
       
        
      </div>
   



{/* 아래 콘텐츠 영역 */}
<div className="flex flex-1 h-full min-h-0 w-full">
  {/* 왼쪽: Glance */}
  {setting === 'Glance' && (
    <div className="flex-1 h-full min-h-0 min-w-0 overflow-y-auto grid grid-cols-2 gap-4 pb-5">
      { PAris_Data.map((el, index) => (
        <Glance_section
          key={el + index}
          city_data={el}
          modal_change={(el) => modal_change(el)}
        />
      ))
      }
    </div>
  )}

  {/* 오른쪽: Concise */}
  {setting === 'Concise' && (
    <div className="flex-1 min-h-0 min-w-0 overflow-y-auto bg-white">


      
      <Drawer change_category={(e)=>Drawer_change(e)}     tabs={tabs} >
         {
        filter_comment.map((El)=>
              <Inner_compont key={El.describe}  data={El} />
        )
       }
        </Drawer>
    </div>
  )}
</div>


     
    </div>
  );
}