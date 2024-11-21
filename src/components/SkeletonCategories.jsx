import React from "react";
import { FaSearch } from "react-icons/fa";



const SkeletonCategories = () => {
    const count = 10;
  return (
    <div className="bg-white w-[350px] animate-pulse">
      {/* Skeleton Header */}
      <div className="bg-[#1fa45b] py-3 text-white text-center rounded-t-lg">
        <h1 className="text-lg font-normal">Categories</h1>
      </div>

      {/* Skeleton Search Bar */}
      <div className="p-4">
        <div className="relative">
          <span className="absolute top-1/2 transform -translate-y-1/2 left-4 text-gray-300">
            <FaSearch />
          </span>
          <div className="w-full h-10 bg-gray-200 rounded-lg"></div>
        </div>
      </div>

      {/* Skeleton Categories List */}
      <div className="space-y-2 px-4">
        {Array(count)
          .fill(null)
          .map((_, index) => (
            <div key={index} className="flex flex-col gap-2">
              {/* Skeleton Category Item */}
              <div className="flex flex-row gap-x-4 items-center w-full h-18 rounded-xl px-3 bg-gray-100">
                <div className="bg-gray-300 rounded-lg h-[56px] w-[56px]"></div>
                <div className="flex flex-col flex-grow">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mt-2"></div>
                </div>
              </div>

           
              <div className="ml-8 flex gap-x-4">
                <div className="flex flex-row items-start">
                
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SkeletonCategories;
