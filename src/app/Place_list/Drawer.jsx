import { Children, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Inner_compont from "./Inner_compont";

export default function CategoryTabs({children,tabs,change_category }) {

  const [activeTab, setActiveTab] = useState(tabs[0].id);
  
 useEffect(()=>{
  change_category(tabs[0].id)
 },[tabs])

 const new_tabs= function(tab){
  if(activeTab!=tab.id){
 setActiveTab(tab.id);
     change_category(tab.id);
  }  
 
 }

  return (
 <div className="overflow-y-auto ">
  
  {/* 🔒 고정 영역 */}
  <div className="
    sticky top-0 z-20 bg-white
    flex h-8 overflow-x-auto overflow-y-hidden no-scrollbar w-full
  ">
    {tabs.map((tab) => (
      <button
        key={tab.id}
        onClick={() => new_tabs(tab)}
        className={`relative shrink-0 px-4 mx-5 text-xs
          ${activeTab === tab.id ? "text-[#2BB67E]" : "text-gray-600"}`}
      >
        {tab.label}
        {activeTab === tab.id && (
          <span className="absolute top-0 left-0 w-full h-[6px] bg-[#fd81de]" />
        )}
      </button>
    ))}
  </div>

  {/* 🔽 스크롤 영역 */}
  <div className="flex-1 overflow-y-auto py-2">
    {children}
  </div>

</div>

  );
}