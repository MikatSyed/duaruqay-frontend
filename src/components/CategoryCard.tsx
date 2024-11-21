"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { FaBars, FaSearch } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import SkeletonCategories from "./SkeletonCategories";
import CategorySidebar from "./CategorySidebar";

const CategoryCard = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number | null>(null);
  const [activeSubcategoryIndex, setActiveSubcategoryIndex] = useState<number | null>(null);
  const [activeSubSubcategoryIndex, setActiveSubSubcategoryIndex] = useState<number | null>(null);
  const [activeCategoryName, setActiveCategoryName] = useState<string | null>(null); // State to track active category name
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Fetch categories data
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true); // Start loading
        const response = await fetch("http://localhost:5000/api/v1/categories");
        const data = await response.json();
        if (data.success) {
          setCategories(data.data);
          setFilteredCategories(data.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false); // End loading
      }
    };
    fetchCategories();
  }, []);

  // Fetch subcategories for a specific category
  const fetchSubcategories = async (categoryId: number) => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/categories/${categoryId}/subcategories`);
      const data = await response.json();
      return data.success ? data.data : [];
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      return [];
    }
  };

  // Fetch duas for a specific subcategory
  const fetchDuas = async (categoryId: number, subcategoryId: number) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/categories/subcategories/duas?cat=${categoryId}&subcat=${subcategoryId}`
      );
      const data = await response.json();
      return data.success ? data.data : [];
    } catch (error) {
      console.error("Error fetching duas:", error);
      return [];
    }
  };

  // Handle category click
  const handleCategoryClick = async (index: number, categoryId: number, categoryName: string) => {
    setActiveCategoryIndex(activeCategoryIndex === index ? null : index);
    setActiveSubcategoryIndex(null); // Reset subcategory index
    setActiveSubSubcategoryIndex(null); // Reset sub-subcategory index

    // Set active category name
    setActiveCategoryName(categoryName);

    const searchParams = new URLSearchParams(window.location.search);

    // Remove the `subcat` and `dua` query parameters when changing the `cat` parameter
    searchParams.delete("subcat");
    searchParams.delete("dua");

    // Set or update the `cat` query parameter
    searchParams.set("cat", categoryId.toString());

    // Update the browser's URL without triggering a page reload
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}?${searchParams.toString()}`
    );

    if (activeCategoryIndex !== index) {
      // Check if subcategories are already loaded
      const subcategories = categories[index].subcategories
        ? categories[index].subcategories
        : await fetchSubcategories(categoryId);

      setCategories((prevCategories) => {
        const newCategories = [...prevCategories];
        newCategories[index].subcategories = subcategories;
        return newCategories;
      });
    }
  };

  // Handle subcategory click
  const handleSubcategoryClick = async (index: number, subcategoryId: number) => {
    // Toggle the active subcategory index
    setActiveSubcategoryIndex(activeSubcategoryIndex === index ? null : index);
    setActiveSubSubcategoryIndex(null); // Reset sub-subcategory index

    const currentCategory = categories[activeCategoryIndex!]; // Get the current category
    const existingDuas = currentCategory.subcategories[index].duas; // Check if duas are already loaded for this subcategory

    const searchParams = new URLSearchParams(window.location.search); // Get the current URL's query parameters

    // Remove the `dua` query parameter when changing the `subcat`
    searchParams.delete("dua");

    // Set or update the `cat` and `subcat` query parameters
    searchParams.set("cat", currentCategory.cat_id.toString());
    searchParams.set("subcat", subcategoryId.toString());

    // Update the browser's URL without triggering a page reload
    window.history.replaceState(
      null, // No state object
      "",  // No title
      `${window.location.pathname}?${searchParams.toString()}` // Updated URL
    );

    // Check if the duas for this subcategory are already loaded, if not, fetch them
    if (!existingDuas) {
      const duas = await fetchDuas(currentCategory.cat_id, subcategoryId);
      setCategories((prevCategories) => {
        const newCategories = [...prevCategories];
        newCategories[activeCategoryIndex!].subcategories[index].duas = duas; // Update the subcategory's duas
        return newCategories;
      });
    }
  };

  // Handle sub-subcategory click
  const handleSubSubcategoryClick = (index: number, duaId: number) => {
    setActiveSubSubcategoryIndex(activeSubSubcategoryIndex === index ? null : index);

    // Update the URL to include cat, subcat, and dua
    const currentCategory = categories[activeCategoryIndex!];
    const currentSubcategory = currentCategory.subcategories[activeSubcategoryIndex!];

    const searchParams = new URLSearchParams(window.location.search);

    // Set or update the `cat`, `subcat`, and `dua` query parameters
    searchParams.set("cat", currentCategory.cat_id.toString());
    searchParams.set("subcat", currentSubcategory.subcat_id.toString());
    searchParams.set("dua", duaId.toString());

    // Update the browser's URL without triggering a page reload
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}?${searchParams.toString()}`
    );
  };

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    const filtered = categories.filter((category) =>
      category.cat_name_en.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredCategories(filtered);
  };

  if (loading) {
    return <SkeletonCategories />;
  }

  const toggleSidebar = () => {
    console.log(isSidebarOpen,'179')
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);  // Close sidebar
  };

  return (
    <div>
      <div className="flex space-x-3 bg-white p-4 rounded-lg categories">
        <button className="text-gray-600 font-medium">
          <FaBars size={20}  onClick={toggleSidebar} className="cursor-pointer"/>
        </button>
        <p className="text-gray-700 font-medium">
          {activeCategoryName ? ` ${activeCategoryName}` : "Dua's Importance"}
        </p>
      </div>
      <CategorySidebar
        categories={categories}
        activeCategoryIndex={activeCategoryIndex}
        setActiveCategoryIndex={setActiveCategoryIndex}
        handleCategoryClick={handleCategoryClick}
        handleSubcategoryClick={handleSubcategoryClick} // Pass subcategory click handler
        handleSubSubcategoryClick={handleSubSubcategoryClick} // Pass sub-subcategory click handler
        searchTerm="" // Add functionality for search if needed
        handleSearchChange={() => {}} // Handle search change if needed
        isSidebarOpen={isSidebarOpen}
        closeSidebar={closeSidebar} // Pass the close sidebar function
      />
      <div className="bg-white w-[350px] categories-main">
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
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search Categories..."
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1fa45b] focus:border-[#1fa45b]"
            />
          </div>
        </div>

        <div className="space-y-2 px-4">
          {filteredCategories.map((category, index) => (
            <div key={category.cat_id}>
              <div
                className={`hover:bg-gray-200 flex flex-row gap-x-4 items-center w-full h-18 rounded-xl transition-all duration-200 ease-in-out px-3 ${
                  activeCategoryIndex === index ? "bg-[#e8f0f5] text-white" : "text-black"
                }`}
                onClick={() => handleCategoryClick(index, category.cat_id, category.cat_name_en)} // Pass category name here
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
                                    activeSubSubcategoryIndex === subSubIndex
                                      ? "text-[#1fa45b]"
                                      : "text-gray-600"
                                  }`}
                                  onClick={() => handleSubSubcategoryClick(subSubIndex, dua.dua_id)}
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
    </div>
  );
};

export default CategoryCard;
