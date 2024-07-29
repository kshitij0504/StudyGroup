import React, { createContext, useContext, useState } from "react";
import image from "../assets/logo1.png";
import { ChevronFirst, ChevronLast, MoreVertical } from "lucide-react";

const SidebarContext = createContext();
const Sidebar = ({ children }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-gray-800 text-white border-r-0 shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src={image}
            alt="Logo Here"
            className={`overflow-hidden transition-all ${
              expanded ? "h-20 w-20" : "w-0"
            }`}
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-[#5271ff]"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>
        <SidebarContext.Provider value={expanded}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>
        <div className="border-t flex p-3">
          <img src={image} alt="" className="w-10 h-10 rounded-md" />
          <div
            className={`flex justify-between items-center overflow-hidden transition-all ${
              expanded ? "w-40 ml-3" : "w-0"
            } `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">Kshitij</h4>
              <span className="text-xs text-gray-50">kshitij@gmail.com</span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
};

export function SidebarItem({ icon, text, active }) {
    const expanded = useContext(SidebarContext)
  return (
    <li
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
        active ? "bg-yellow-500 text-gray-900" : "hover:bg-[#5271ff] text-white"
      }`}
    >
      {icon}
      <span className={`overflow-hidden transition-all ${expanded ? "ml-2" : "w-0"}`}>{text}</span>
      {!expanded && (
        <div className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-[#5271ff] text-white text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>{text}</div>
      )}
    </li>
  );
}

export default Sidebar;
