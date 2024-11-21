import React, { useRef, useState } from "react";
import { useClickAway } from "react-use";

interface SidebarProps {
  categories: any[];
  activeCategoryIndex: number | null;
  setActiveCategoryIndex: React.Dispatch<React.SetStateAction<number | null>>;
  handleCategoryClick: (index: number, categoryId: number, categoryName: string) => Promise<void>;
  handleSubcategoryClick: (categoryId: number, subcategoryId: number, subcategoryName: string) => void;
  handleSubSubcategoryClick: (categoryId: number, subcategoryId: number, subSubcategoryId: number, subSubcategoryName: string) => void;
  searchTerm: string;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isSidebarOpen: boolean;
  closeSidebar: () => void;
}

const CategorySidebar: React.FC<SidebarProps> = ({
  categories,
  activeCategoryIndex,
  setActiveCategoryIndex,
  handleCategoryClick,
  handleSubcategoryClick,
  handleSubSubcategoryClick,
  searchTerm,
  handleSearchChange,
  isSidebarOpen,
  closeSidebar
}) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [duas, setDuas] = useState<any[]>([]); 
  const [loadingDuas, setLoadingDuas] = useState(false);
  const [activeSubcategoryIndex, setActiveSubcategoryIndex] = useState<number | null>(null); // Active subcategory index

  
  useClickAway(sidebarRef, closeSidebar);

 
  const fetchDuas = async (categoryId: number, subcategoryId: number) => {
    setLoadingDuas(true); 
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/categories/subcategories/duas?cat=${categoryId}&subcat=${subcategoryId}`
      );
      const data = await response.json();
      if (data.success) {
        setDuas(data.data); 
      } else {
        setDuas([]); 
      }
    } catch (error) {
      console.error("Error fetching duas:", error);
      setDuas([]); 
    }
    setLoadingDuas(false); 
  };

 
  const handleCategoryItemClick = (index: number, categoryId: number, categoryName: string) => {
    handleCategoryClick(index, categoryId, categoryName);
    window.history.pushState({}, "", `?cat=${categoryId}`);
    closeSidebar();
  };

  
  const handleSubcategoryItemClick = (categoryId: number, subcategoryId: number, subcategoryName: string) => {
    handleSubcategoryClick(categoryId, subcategoryId, subcategoryName);
    window.history.pushState({}, "", `?cat=${categoryId}&subcat=${subcategoryId}`);
    fetchDuas(categoryId, subcategoryId); 
    setActiveSubcategoryIndex(subcategoryId); 
    closeSidebar();
  };

 
  const handleSubSubcategoryItemClick = (categoryId: number, subcategoryId: number, subSubcategoryId: number, subSubcategoryName: string) => {
    handleSubSubcategoryClick(categoryId, subcategoryId, subSubcategoryId, subSubcategoryName);
    window.history.pushState({}, "", `?cat=${categoryId}&subcat=${subcategoryId}&dua=${subSubcategoryId}`);
    closeSidebar();
  };

  return (
    <div>
      
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${isSidebarOpen ? "opacity-50 visible" : "opacity-0 invisible"}`}
        onClick={closeSidebar} 
      ></div>

    
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full bg-white transition-all duration-300 ease-in-out transform ${
          isSidebarOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
        } w-[450px] overflow-y-auto`}
      >
        <div className="bg-[#1fa45b] py-3 text-white text-center rounded-t-lg">
          <h1 className="text-lg font-normal">Categories</h1>
        </div>

        <div className="space-y-2 px-4 mt-6">
          {categories.map((category, index) => (
            <div key={category.cat_id}>
              <div
                className={`hover:bg-gray-200 flex flex-row gap-x-4 items-center w-full h-18 rounded-xl transition-all duration-200 ease-in-out px-3 ${
                  activeCategoryIndex === index ? "bg-[#e8f0f5] text-white" : "text-black"
                }`}
                onClick={() => handleCategoryItemClick(index, category.cat_id, category.cat_name_en)} // Pass category name here
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
                      <p className="text-gray-500 text-xs mt-1 xs:text-[11px]">Subcategory: {category.no_of_subcat}</p>
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
                              activeSubcategoryIndex === subcategory.subcat_id ? "text-[#1fa45b]" : "text-gray-600"
                            }`}
                            onClick={() => handleSubcategoryItemClick(category.cat_id, subcategory.subcat_id, subcategory.subcat_name_en)}
                          >
                            <span className="text-xl font-semibold text-[#1fa45b] ml-[-4px]">•</span>
                            <span className="text-sm font-semibold">{subcategory.subcat_name_en}</span>
                          </div>

                        
                          {activeSubcategoryIndex === subcategory.subcat_id && loadingDuas && (
                            <p>Loading duas...</p>
                          )}
                          {activeSubcategoryIndex === subcategory.subcat_id && !loadingDuas && duas.length > 0 && (
                            <ul className="ml-4 text-gray-600 text-sm">
                              {duas.map((dua: any) => (
                                <li
                                  key={dua.dua_id}
                                  className={`flex items-center cursor-pointer py-2`}
                                  onClick={() =>
                                    handleSubSubcategoryItemClick(
                                      category.cat_id,
                                      subcategory.subcat_id,
                                      dua.dua_id,
                                      dua.dua_name_en
                                    )
                                  }
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

export default CategorySidebar;
