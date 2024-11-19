import React from "react";

interface Dua {
  id: number;
  name: string;
  arabic: string;
  translation_en: string;
  audio: string;
}

interface DuaListProps {
  duas: Dua[];
}

const DuaList: React.FC<DuaListProps> = ({ duas }) => {
  return (
    <ul className="mt-2 space-y-1">
      {duas.map((dua) => (
        <li
          key={dua.id} // Use a unique key from the data
          className="p-2 rounded-lg hover:bg-gray-200"
        >
          <h4 className="font-medium">{dua.name}</h4>
          <p className="text-sm">{dua.arabic}</p>
          <p className="text-sm text-gray-600">{dua.translation_en}</p>
          <audio controls src={dua.audio} className="mt-2 w-full"></audio>
        </li>
      ))}
    </ul>
  );
};

export default DuaList;
