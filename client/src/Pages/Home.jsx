import React from "react";
import Sidebar, { SidebarItem } from "../Components/Sidebar";
import {
  Calendar,
  Home as Home1,
  MessageCircle,
  Presentation,
} from "lucide-react";
import { RxUpdate } from "react-icons/rx";
const Home = () => {
  return (
    <div className="flex bg-gray-900 text-white">
      <Sidebar>
        <SidebarItem icon={<Home1 size={20} />} text="Home" alert />
        <SidebarItem icon={<MessageCircle size={20} />} text="Group" alert />
        <SidebarItem icon={<Presentation size={20} />} text="Meeting" alert />
        <SidebarItem
          icon={<RxUpdate size={20} />}
          text="Update Profile"
          alert
        />
        <SidebarItem icon={<Calendar size={20} />} text="Schedule" alert />
      </Sidebar>
    </div>
  );
};
export default Home;
