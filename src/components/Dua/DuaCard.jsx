import React, { useState, useEffect, useRef } from "react";
import AudioPlayer from "./AudioPlayer";

import SkeletonDuaCard from "./SkeletonDuaCard";
import Setting from "../Settings/Setting";

const DuaCard = ({ categoryId, subCategoryId, duaId }) => {
  const [cardsData, setCardsData] = useState([]);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  
  const cardRefs = useRef([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://duaruqay-backend.onrender.com/api/v1/categories/duas?cat=${categoryId}`
        );
        const data = await response.json();
        if (data.success) {
          setCardsData(data.data);
        } else {
          console.error("Failed to load data:", data.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryId]);

  
  useEffect(() => {
   
    cardRefs.current = cardRefs.current.slice(0, cardsData.length); 
    cardsData.forEach((_, index) => {
      if (!cardRefs.current[index]) {
        cardRefs.current[index] = React.createRef();
      }
    });
  }, [cardsData]);

  
  useEffect(() => {
    if (cardsData.length > 0) {
     
      const parsedSubCategoryId = parseInt(subCategoryId);
      if (parsedSubCategoryId && cardRefs.current[parsedSubCategoryId]) {
        console.log("Scrolling to subCategoryId:", parsedSubCategoryId);
        cardRefs.current[parsedSubCategoryId].current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      
      if (duaId) {
        const parsedDuaId = parseInt(duaId); 
        console.log("Looking for duaId:", parsedDuaId);

        
        const duaIndex = cardsData.findIndex((card) => card.dua_id === parsedDuaId);
        console.log("Found duaIndex:", duaIndex);

       
        if (duaIndex !== -1 && cardRefs.current[duaIndex]) {
          console.log("Scrolling to card with duaId:", parsedDuaId);
          cardRefs.current[duaIndex].current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        } else {
          console.log("Card not found for duaId:", parsedDuaId);
        }
      }
    }
  }, [subCategoryId, duaId, cardsData]);

 

  if (loading) {
    return <SkeletonDuaCard />;
  }

  if (cardsData.length === 0) {
    return <p className="text-gray-500 text-center mt-10">No duas found.</p>;
  }

  return (
    <div className="flex w-[100%]">
      <div className="content">
        {cardsData.map((card, index) => (
          <div key={index} ref={cardRefs.current[index]}>
            {card?.subcat_name_en && (
              <div className="rounded-lg bg-white mb-4 p-4">
                <p className="text-gray-800 font-medium">
                  <span className="text-[#31ab69]">Section:</span> {card.subcat_name_en}
                </p>
              </div>
            )}

            <div className="p-6 bg-white rounded-lg mb-6 shadow-md">
              <div className="flex flex-row justify-start items-center">
                <img src="/assets/icon/duacard.svg" alt="duacard" className="mr-3" />
                <p className="text-[#31ab69] font-medium">
                  {index + 1}. {card.dua_name_en}
                </p>
              </div>

              <p
                dir="rtl"
                className="my-8 text-right leading-loose text-3xl"
                style={{ wordSpacing: "8px", fontSize: "26px", fontFamily: "me_quran" }}
              >
                {card.dua_arabic}
              </p>

              <p className="my-5 text-justify leading-8 italic" style={{ fontSize: "18px" }}>
                <span className="font-medium">Transliteration:</span> {card.transliteration_en}
              </p>

              <p className="my-5 text-title text-justify font-normal" style={{ fontSize: "18px" }}>
                <span className="font-medium">Translation:</span> {card.top_en}
              </p>

              <p className="mt-5 font-semibold text-[#31ab69] text-[18px]">Reference:</p>
              <div className="mt-1 font-normal text-[18px]">
                <span>{card.refference_en}</span>
              </div>

              <div className="flex items-center justify-between mt-5">
  <AudioPlayer audioSrc={card.audio} />

  <div className="flex space-x-4">
    <div className="group relative">
      <button className="p-2 text-white rounded-md" title="Copy">
        <img
          src="/assets/icon/copy.svg"
          alt="Copy"
          className="h-auto max-w-[100%]"
        />
      </button>
      {/* Tooltip */}
      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black text-white text-xs rounded py-1 px-2">
        Copy
      </div>
    </div>

    <div className="group relative">
      <button className="p-2 text-white rounded-md" title="Bookmark">
        <img
          src="/assets/icon/bookmark.svg"
          alt="Bookmark"
          className="h-auto max-w-[100%]"
        />
      </button>
      {/* Tooltip */}
      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black text-white text-xs rounded py-1 px-2">
        Bookmark
      </div>
    </div>

    <div className="group relative">
      <button className="p-2 text-white rounded-md" title="Plan">
        <img
          src="/assets/icon/plan.svg"
          alt="Plan"
          className="h-auto max-w-[100%]"
        />
      </button>
      {/* Tooltip */}
      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black text-white text-xs rounded py-1 px-2">
        Plan
      </div>
    </div>

    <div className="group relative">
      <button className="p-2 text-white rounded-md" title="Share">
        <img
          src="/assets/icon/share.svg"
          alt="Share"
          className="h-auto max-w-[100%]"
        />
      </button>
    
      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black text-white text-xs rounded py-1 px-2">
        Share
      </div>
    </div>

    <div className="group relative">
      <button className="p-2 text-white rounded-md" title="Report">
        <img
          src="/assets/icon/report.svg"
          alt="Report"
          className="h-auto max-w-[100%]"
        />
      </button>
 
      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black text-white text-xs rounded py-1 px-2">
        Report
      </div>
    </div>
  </div>
</div>

            </div>
          </div>
        ))}
      </div>
      <div className="w-[20%] settings-container">
        <Setting />
      </div>
    </div>
  );
};

export default DuaCard;
