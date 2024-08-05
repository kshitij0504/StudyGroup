import React from "react";
import Sidebar, { SidebarItem } from "../Components/Sidebar";
import {
  Calendar,
  Home as Home1,
  MessageCircle,
  Presentation,
} from "lucide-react";
import { RxUpdate } from "react-icons/rx";
import { Outlet } from "react-router-dom";
const LayoutwithSidebar = () => {
  return (
    <div className="flex bg-gray-900 text-white">
      <Sidebar>
        <SidebarItem
          icon={<Home1 size={20} />}
          text="Home"
          to="/home" // Path to navigate to Home
        />
        <SidebarItem
          icon={<MessageCircle size={20} />}
          text="Group"
          to="/group" // Path to navigate to Group
        />
        <SidebarItem
          icon={<Presentation size={20} />}
          text="Meeting"
          to="/meeting" // Path to navigate to Meeting
        />
        <SidebarItem
          icon={<RxUpdate size={20} />}
          text="Update Profile"
          to="/updateprofile" // Path to navigate to Update Profile
        />
        <SidebarItem
          icon={<Calendar size={20} />}
          text="Schedule"
          to="/schedule" // Path to navigate to Schedule
        />
      </Sidebar>
      <div className="flex-1 p-4">
        <Outlet /> {/* This will render the routed components like Home */}
      </div>
    </div>
  );
};

export default LayoutwithSidebar;
