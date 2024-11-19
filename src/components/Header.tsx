import React from "react";
import { FaSearch, FaCog, FaBars } from "react-icons/fa";

interface HeaderProps {
  toggleSidebar: () => void;
  toggleSettings: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, toggleSettings }) => {
  return (
    <div className="flex justify-between items-center p-4  ">
      <button
        className="text-gray-600 md:hidden"
        onClick={toggleSidebar}
      >
        <FaBars size={20} />
      </button>
      <h1 className="text-2xl font-semibold my-4">Duas Page</h1>
      <div className="flex items-center space-x-4">
      <div className="">
  <div className="relative mr-36">
    <input
      type="text"
      placeholder="Search By Dua Name"
      className=" pr-14 pl-4 p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1fa45b] focus:border-[#1fa45b] w-[350px]"
    />

    <span className="absolute top-1/2 transform -translate-y-1/2 right-4 text-gray-400 bg-gray-100 py-3 px-5 rounded-lg mr-[-8px]">
      <FaSearch />
    </span>
  </div>
</div>

        <img
          src="/assets/icon/profile.svg" 
          alt="User"
          className="w-11 h-11 rounded-full object-cover"
        />
        <button onClick={toggleSettings}>
          <FaCog size={20} className="text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default Header;
