import React from "react";
import { FaHome, FaBook, FaCog } from "react-icons/fa";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const menuItems = [
    { icon: <FaHome size={20} />, name: "Dashboard" },
    { icon: <FaBook size={20} />, name: "Categories" },
    { icon: <FaCog size={20} />, name: "Settings" },
  ];

  return (
    <div
      className={` m-6 fixed top-0 left-0 h-full bg-white rounded-3xl text-white transition-transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 w-64 md:w-[90px]`}
    >
      <button
        className="p-4 text-gray-200 md:hidden"
        onClick={toggleSidebar}
      >
        ✕
      </button>
      <div className="flex flex-col items-center md:items-start md:p-4">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="p-4 bg-gray-100 text-gray-400 rounded-full mt-4 flex items-center md:justify-center cursor-pointer"
          >
            {item.icon}
            <span className="ml-2 md:hidden">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
