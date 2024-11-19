import React from "react";
import DuaList from "./DuaList";

interface Subcategory {
  id: number;
  name: string;
  duas: { id: number; name: string; arabic: string; translation_en: string; audio: string }[];
}

interface SubcategoryListProps {
  subcategories: Subcategory[];
}

const SubcategoryList: React.FC<SubcategoryListProps> = ({ subcategories }) => {
  return (
    <div className="mt-2 space-y-2">
      {subcategories.map((subcategory) => (
        <div
          key={subcategory.id} // Use a unique key from the data
          className="p-2 border rounded-md bg-gray-100"
        >
          <h3 className="font-medium">{subcategory.name}</h3>
          <DuaList duas={subcategory.duas} />
        </div>
      ))}
    </div>
  );
};

export default SubcategoryList;
