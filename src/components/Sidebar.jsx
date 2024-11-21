import React from "react";
import { FaHandHoldingHeart } from "react-icons/fa";



const Sidebar= ({ isOpen, toggleSidebar }) => {
  // Replace icons with image paths
  const menuItems = [
    { image: "/assets/icon/home.svg", name: "Dashboard" },
    { image: "/assets/icon/alldua.svg", name: "Categories" },
    { image: "/assets/icon/memorize.svg", name: "Settings" },
    { image: "/assets/icon/bookmark.svg", name: "Settings" },
    { image: "/assets/icon/ruqyah.svg", name: "Settings" },
    { image: "/assets/icon/dua-info.svg", name: "Settings" },
    { image: "/assets/icon/books.svg", name: "Settings" }
  ];

  return (
    <div
      className={` max-h-[900px] m-6 fixed top-0 left-0 h-full bg-white rounded-3xl text-white transition-transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 w-64 md:w-[100px] overflow-y-auto  custom-scrollbar`}
    >
      {/* Close Button for Mobile */}
      <button className="p-4 text-gray-200 md:hidden" onClick={toggleSidebar}>
        ✕
      </button>

    <div className="flex flex-col items-center  md:px-4 md:py-6">
    <img
              src="/assets/icon/dua-logo.svg"
              alt=""
              className="max-w-[100%]  transition-transform duration-300 hover:scale-110"
            />
    </div>

      <div className="flex flex-col items-center  md:p-4">
        {/* Menu Items */}
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="p-3 bg-gray-100 text-gray-400 rounded-full mt-4 flex items-center md:justify-center cursor-pointer"
          >
          
            <img
              src={item.image}
              alt={item.name}
              className="max-w-[100%]  transition-transform duration-300 hover:scale-110"
            />
           
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center md:px-4 md:py-14">
      {/* Replace Image with Icon */}
      <div className="bg-[#31ab69] text-white p-3 rounded-md ">
        <FaHandHoldingHeart size={22} />
      </div>
    </div>
    </div>
  );
};

export default Sidebar;
