import Link from "next/link";
import React, { useState, useRef } from "react";
import { useClickAway } from "react-use";
import {
  FaSearch,
  FaCog,
  FaBars,
  FaCaretDown,
  FaDownload,
  FaShieldAlt,
  FaGratipay,
  FaInfoCircle,
  FaExclamationCircle,
  FaProjectDiagram,
  FaHeart,
} from "react-icons/fa";

const Header = ({ toggleSidebar, toggleSettings }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Use ref for the dropdown menu container
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside using react-use
  useClickAway(dropdownRef, () => setIsDropdownOpen(false));

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className="flex justify-between items-center p-4 max-w-[2400px] header">
      <div className="flex items-center header-img">
        <img src="/assets/icon/dua-logo.svg" alt="Icon" className="w-12 h-12 mr-3 hidden md:block" />
        <h1 className="text-2xl font-semibold my-4">Duas Page</h1>
      </div>
      <h1 className="text-2xl font-semibold my-4 header-title">Duas Page</h1>
      <div className="flex items-center">
       
        <div className="relative mr-16 hidden md:block">
          <input
            type="text"
            placeholder="Search By Dua Name"
            className="pr-14 pl-4 p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1fa45b] focus:border-[#1fa45b] w-[350px]"
          />
          <span className="absolute top-1/2 transform -translate-y-1/2 right-4 text-gray-400 bg-gray-100 py-3 px-5 rounded-lg mr-[-8px]">
            <FaSearch />
          </span>
        </div>

    
        <div className="relative hidden md:block" ref={dropdownRef}>
          <div className="flex items-center cursor-pointer space-x-2" onClick={toggleDropdown}>
            <img
              src="/assets/icon/profile.svg"
              alt="User"
              className="w-11 h-11 rounded-full object-cover"
            />
            <FaCaretDown size={18} className="text-gray-600" />
          </div>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-lg w-72">
              <div className="absolute top-[-10px] right-9 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[10px] border-b-white "></div>
              <ul className="py-4 px-3 text-sm text-gray-700">
                <li className="flex items-center px-4 py-2 hover:bg-gray-100 hover:rounded-lg cursor-pointer">
                  <FaHeart className="text-[#31ab69] mr-2 text-md" />
                  <Link href="/settings/support">Support Us</Link>
                </li>
                <li className="flex items-center px-4 py-2 hover:bg-gray-100 hover:rounded-lg cursor-pointer">
                  <FaDownload className="text-[#31ab69] mr-2 text-md" />
                  <Link href="/settings/download">Download Dua App</Link>
                </li>
                <li className="flex items-center px-4 py-2 hover:bg-gray-100 hover:rounded-lg cursor-pointer">
                  <FaShieldAlt className="text-[#31ab69] mr-2 text-md" />
                  <Link href="/settings/privacy">Privacy Policy</Link>
                </li>
                <li className="flex items-center px-4 py-2 hover:bg-gray-100 hover:rounded-lg cursor-pointer">
                  <FaGratipay className="text-[#31ab69] mr-2 text-md" />
                  <Link href="/settings/credit">Thanks & Credits</Link>
                </li>
                <li className="flex items-center px-4 py-2 hover:bg-gray-100 hover:rounded-lg cursor-pointer">
                  <FaInfoCircle className="text-[#31ab69] mr-2 text-md" />
                  <Link href="/settings/about">About Us</Link>
                </li>
                <li className="flex items-center px-4 py-2 hover:bg-gray-100 hover:rounded-lg cursor-pointer">
                  <FaExclamationCircle className="text-[#31ab69] mr-2 text-md" />
                  <Link href="/settings/copyright">Copyright Warning</Link>
                </li>
                <li className="flex items-center px-4 py-2 hover:bg-gray-100 hover:rounded-lg cursor-pointer">
                  <FaProjectDiagram className="text-[#31ab69] mr-2 text-md" />
                  <Link href="/settings/projects">Our Other Projects</Link>
                </li>
              </ul>
            </div>
          )}
        </div>

    
        <button onClick={toggleSettings}>
          <FaCog size={20} className="text-[#31ab69] mx-4 setting-btn" />
        </button>
      </div>
    </div>
  );
};

export default Header;
