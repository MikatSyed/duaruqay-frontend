"use client";

import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

const CategoryCard = () => {
  // Static data
  const categories = [
    {
      icon: "/assets/icon/duar_gurutto.svg",
      name: "Dua's Importance",
      subcategoriesCount: 7,
      duasCount: 21,
      category: [
        {
          name: "Dua while hearing the adhaan",
          subcategories: [
            "Dua while hearing the adhaan",
            "Dua after the adhaan",
            "Dua between Adhaan and Iqamahe",
          ],
        },
        {
          name: "Dua after the adhaan",
          subcategories: [
            "Subcategory 1: Point of importance",
            "Subcategory 2: Another important point",
          ],
        },
        {
          name: "Dua between Adhaan and Iqamahe",
          subcategories: [
            "Subcategory 1: The prayer for protection",
            "Subcategory 2: The prayer for paradise",
          ],
        },
      ],
    },
    {
      icon: "/assets/icon/duar_gurutto.svg",
      name: "Dua's Excellence",
      subcategoriesCount: 5,
      duasCount: 15,
      category: [
        {
          name: "The reward of freeing the four slaves of Bani Ismail (AS)",
          subcategories: [
            "Subcategory 1: Explanation of the reward",
            "Subcategory 2: The importance of this act",
          ],
        },
        {
          name: "The reward of freeing the four slaves of Bani Ismail (AS)",
          subcategories: [
            "Subcategory 1: Explanation of the reward",
            "Subcategory 2: The importance of this act",
          ],
        },
      ],
    },
  ];

  // States for active category, subcategory, and sub-subcategory (sub)
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number | null>(null);
  const [activeSubcategoryIndex, setActiveSubcategoryIndex] = useState<number | null>(null);
  const [activeSubSubcategoryIndex, setActiveSubSubcategoryIndex] = useState<number | null>(null);

  // Handle category click
  const handleCategoryClick = (index: number) => {
    setActiveCategoryIndex(activeCategoryIndex === index ? null : index); // Toggle active state
    setActiveSubcategoryIndex(null); // Reset subcategory when category switches
    setActiveSubSubcategoryIndex(null); // Reset sub-subcategory when category switches
  };

  // Handle subcategory click
  const handleSubcategoryClick = (index: number) => {
    setActiveSubcategoryIndex(activeSubcategoryIndex === index ? null : index); // Toggle active state for subcategories
    setActiveSubSubcategoryIndex(null); // Reset sub-subcategory when subcategory switches
  };

  // Handle sub-subcategory click
  const handleSubSubcategoryClick = (index: number) => {
    setActiveSubSubcategoryIndex(activeSubSubcategoryIndex === index ? null : index); // Toggle active state for sub-subcategories
  };

  return (
    <div className="bg-white w-[350px] rounded-lg shadow-md">
     
      <div className="bg-[#1fa45b] py-3 text-white text-center rounded-t-lg">
        <h1 className="text-lg font-normal">Categories</h1>
      </div>

     
      <div className="p-4">
        <div className="relative">
          {/* Search Icon at the beginning */}
          <span className="absolute top-1/2 transform -translate-y-1/2 left-4 text-gray-400">
            <FaSearch />
          </span>

         
          <input
            type="text"
            placeholder="Search Categories..."
            className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1fa45b] focus:border-[#1fa45b]"
          />
        </div>
      </div>

     
      <div className="space-y-2 px-4">
        {categories.map((category, index) => (
          <div key={index}>
           
            <div
              className={`hover:bg-gray-200 flex flex-row gap-x-4 items-center w-full h-18 rounded-xl transition-all duration-200 ease-in-out px-3 ${
                activeCategoryIndex === index ? "bg-[#e8f0f5] text-white" : "text-black"
              }`}
              onClick={() => handleCategoryClick(index)} 
            >
           
              <div className="py-3">
                <div className="flex flex-row w-70 items-center xs:w-full sm:w-full md:w-full">
                  <div className="bg-gray-100 flex rounded-lg items-center h-[56px] w-[56px] xs:w-12 xs:h-12">
                    <img
                      src={category.icon}
                      alt={category.name}
                      className="p-3"
                    />
                  </div>
                 
                  <div className="text-left ml-2">
                    <p className="font-semibold text-gray-800">
                      {category.name}
                    </p>
                    <p className="text-gray-500 text-xs mt-1 xs:text-[11px]">
                      Subcategory: {category.subcategoriesCount}
                    </p>
                  </div>
                </div>

               
                <div className="flex flex-row w-12 items-center xl:hidden">
                  <div className="bg-devider w-0.1 mr-3 h-12 dark:hidden"></div>
                  <div className="flex flex-col gap-y-1 justify-center items-center">
                    <p className="text-base dark:text-dark-text xs:text-sm sm:text-mss">
                      {category.duasCount}
                    </p>
                    <p className="text-mute-grey text-xs dark:text-dark-text xs:text-[11px]">
                      Duas
                    </p>
                  </div>
                </div>
              </div>
            </div>

          
            {activeCategoryIndex === index && (
              <div className="mt-2 flex gap-x-4">
             
                <div className="flex flex-row items-start">
                 
                  <ul className="list-none border-l-2 border-dotted border-[#1fa45b] ml-8 z-0">
                    {category.category.map((subcategory, subIndex) => (
                      <li key={subIndex}>
                        <div
                          className={`flex items-center gap-x-2 cursor-pointer z-[10] py-2 ${
                            activeSubcategoryIndex === subIndex
                              ? "text-[#1fa45b]" 
                              : "text-gray-600"
                          }`}
                          onClick={() => handleSubcategoryClick(subIndex)} 
                        >
                          <span className="text-xl font-semibold text-[#1fa45b] ml-[-4px]">•</span>
                          <span className="text-sm font-semibold">{subcategory.name}</span>
                        </div>

                        {activeSubcategoryIndex === subIndex && (
                          <ul className="ml-4 text-gray-600 text-sm m">
                            {subcategory.subcategories.map((sub, subSubIndex) => (
                              <li
                                key={subSubIndex}
                                className={`flex items-center cursor-pointer ${
                                  activeSubSubcategoryIndex === subSubIndex
                                    ? "text-[#1fa45b]" 
                                    : "text-gray-600"
                                }`}
                                onClick={() => handleSubSubcategoryClick(subSubIndex)} // 
                              >
                                <img
                                  src="/assets/icon/duaarrow.svg"
                                  alt="arrow"
                                  className="w-4 h-4 text-[#1fa45b] mr-2 mb-2"
                                />
                                <span className="my-2">{sub}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryCard;
