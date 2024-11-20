"use client";

import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

const CategoryCard = () => {
  // States for categories, active category, subcategory, and dua indices
  const [categories, setCategories] = useState<any[]>([]);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number | null>(null);
  const [activeSubcategoryIndex, setActiveSubcategoryIndex] = useState<number | null>(null);
  const [activeSubSubcategoryIndex, setActiveSubSubcategoryIndex] = useState<number | null>(null);

  // Fetch categories data
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/categories"); // Replace with actual API endpoint
        const data = await response.json();
        if (data.success) {
          setCategories(data.data); // Set categories from API response
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch subcategories for a specific category
  const fetchSubcategories = async (categoryId: number) => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/categories/subcategories/${categoryId}`);
      const data = await response.json();
      return data.success ? data.data : [];
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      return [];
    }
  };

  // Fetch duas for a specific subcategory
  const fetchDuas = async (subcategoryId: number) => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/categories/subcategories/duas/${subcategoryId}`);
      const data = await response.json();
      return data.success ? data.data : [];
    } catch (error) {
      console.error("Error fetching duas:", error);
      return [];
    }
  };

  // Handle category click
  const handleCategoryClick = async (index: number, categoryId: number) => {
    // Toggle active category
    setActiveCategoryIndex(activeCategoryIndex === index ? null : index);

    // Reset subcategory and dua selection
    setActiveSubcategoryIndex(null);
    setActiveSubSubcategoryIndex(null);

    // Fetch and set subcategories for the selected category
    if (activeCategoryIndex !== index) {
      const subcategories = await fetchSubcategories(categoryId);
      setCategories((prevCategories) => {
        const newCategories = [...prevCategories];
        newCategories[index].subcategories = subcategories;
        return newCategories;
      });
    }
  };

  // Handle subcategory click
  const handleSubcategoryClick = async (index: number, subcategoryId: number) => {
    // Toggle active subcategory
    setActiveSubcategoryIndex(activeSubcategoryIndex === index ? null : index);
    setActiveSubSubcategoryIndex(null); // Reset sub-subcategory

    // Fetch and set duas for the selected subcategory
    const duas = await fetchDuas(subcategoryId);
    setCategories((prevCategories) => {
      const newCategories = [...prevCategories];
      newCategories[activeCategoryIndex!].subcategories[index].duas = duas;
      return newCategories;
    });
  };

  // Handle sub-subcategory click
  const handleSubSubcategoryClick = (index: number) => {
    setActiveSubSubcategoryIndex(activeSubSubcategoryIndex === index ? null : index);
  };

  return (
    <div className="bg-white w-[350px] rounded-lg shadow-md">
      <div className="bg-[#1fa45b] py-3 text-white text-center rounded-t-lg">
        <h1 className="text-lg font-normal">Categories</h1>
      </div>

      <div className="p-4">
        <div className="relative">
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
          <div key={category.cat_id}>
            <div
              className={`hover:bg-gray-200 flex flex-row gap-x-4 items-center w-full h-18 rounded-xl transition-all duration-200 ease-in-out px-3 ${
                activeCategoryIndex === index ? "bg-[#e8f0f5] text-white" : "text-black"
              }`}
              onClick={() => handleCategoryClick(index, category.cat_id)}
            >
              <div className="py-3">
                <div className="flex flex-row w-70 items-center xs:w-full sm:w-full md:w-full">
                  <div className="bg-gray-100 flex rounded-lg items-center h-[56px] w-[56px] xs:w-12 xs:h-12">
                    <img
                      src={`/assets/icon/${category.cat_icon}.svg`}
                      alt={category.cat_name_en}
                      className="p-3"
                    />
                  </div>
                  <div className="text-left ml-2">
                    <p className="font-semibold text-gray-800">{category.cat_name_en}</p>
                    <p className="text-gray-500 text-xs mt-1 xs:text-[11px]">
                      Subcategory: {category.no_of_subcat}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {activeCategoryIndex === index && category.subcategories && (
              <div className="mt-2 flex gap-x-4">
                <div className="flex flex-row items-start">
                  <ul className="list-none border-l-2 border-dotted border-[#1fa45b] ml-8 z-0">
                    {category.subcategories.map((subcategory: any, subIndex: number) => (
                      <li key={subcategory.subcat_id}>
                        <div
                          className={`flex items-center gap-x-2 cursor-pointer z-[10] py-2 ${
                            activeSubcategoryIndex === subIndex ? "text-[#1fa45b]" : "text-gray-600"
                          }`}
                          onClick={() => handleSubcategoryClick(subIndex, subcategory.subcat_id)}
                        >
                          <span className="text-xl font-semibold text-[#1fa45b] ml-[-4px]">•</span>
                          <span className="text-sm font-semibold">{subcategory.subcat_name_en}</span>
                        </div>

                        {activeSubcategoryIndex === subIndex && subcategory.duas && (
                          <ul className="ml-4 text-gray-600 text-sm">
                            {subcategory.duas.map((dua: any, subSubIndex: number) => (
                              <li
                                key={dua.dua_id}
                                className={`flex items-center cursor-pointer ${
                                  activeSubSubcategoryIndex === subSubIndex ? "text-[#1fa45b]" : "text-gray-600"
                                }`}
                                onClick={() => handleSubSubcategoryClick(subSubIndex)}
                              >
                                <img
                                  src="/assets/icon/duaarrow.svg"
                                  alt="arrow"
                                  className="w-4 h-4 text-[#1fa45b] mr-2 mb-2"
                                />
                                <span className="my-2">{dua.dua_name_en}</span>
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
