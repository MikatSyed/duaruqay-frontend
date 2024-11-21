import React from "react";

const BottomSidebar: React.FC = () => {
  const navItems = [
    { image: "/assets/icon/home.svg", name: "Home" },
    { image: "/assets/icon/alldua.svg", name: "Categories" },
    { image: "/assets/icon/memorize.svg", name: "Memorize" },
    { image: "/assets/icon/bookmark.svg", name: "Bookmarks" },
    { image: "/assets/icon/settings.svg", name: "Settings" },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full z-10 bg-white shadow-xl border-t rounded-t-[60px]">
    <div className="flex justify-around items-center py-6">
      {navItems.map((item, index) => (
        <div
          key={index}
          className="flex flex-col items-center text-gray-600 hover:text-[#31ab69] transition-colors duration-300 cursor-pointer"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-6 h-6 transition-transform duration-300 hover:scale-110"
          />
          <span className="text-xs mt-1">{item.name}</span>
        </div>
      ))}
    </div>
  </div>
  
  );
};

export default BottomSidebar;
