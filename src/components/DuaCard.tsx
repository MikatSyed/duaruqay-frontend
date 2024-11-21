import React, { useState, useEffect, useRef } from "react";
import AudioPlayer from "./AudioPlayer";
import Setting from "./Setting";
import SkeletonDuaCard from "./SkeletonDuaCard";

const DuaCard = ({ categoryId, subCategoryId, duaId }: any) => {
  const [cardsData, setCardsData] = useState([]);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  
  
  // Ref to store references to each card
  const cardRefs = useRef<any[]>([]);

  useEffect(() => {
    // Fetch data for the given category ID
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:5000/api/v1/categories/duas?cat=${categoryId}`
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

  // Scroll to specific card based on subCategoryId or duaId
  useEffect(() => {
    if (cardsData.length > 0) {
      // Scroll based on subCategoryId
      const parsedSubCategoryId = parseInt(subCategoryId);
      if (parsedSubCategoryId && cardRefs.current[parsedSubCategoryId]) {
        console.log("Scrolling to subCategoryId:", parsedSubCategoryId);
        cardRefs.current[parsedSubCategoryId].scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
  
      // Scroll based on duaId
      if (duaId) {
        const parsedDuaId = parseInt(duaId); // Ensure duaId is parsed as integer
        console.log("Looking for duaId:", parsedDuaId);
  
        // Find the card with the matching duaId in cardsData
        const duaIndex = cardsData.findIndex((card: any) => card.dua_id === parsedDuaId);
        console.log("Found duaIndex:", duaIndex);
  
        // If a matching dua is found, scroll to it
        if (duaIndex !== -1 && cardRefs.current[duaIndex]) {
          console.log("Scrolling to card with duaId:", parsedDuaId);
          cardRefs.current[duaIndex].scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        } else {
          console.log("Card not found for duaId:", parsedDuaId);
        }
      }
    }
  }, [subCategoryId, duaId, cardsData]);
  

  

  const handleCopy = (card: any) => {
    const content = `${card.dua_name_en}\n\n${card.dua_arabic}\n\nTransliteration: ${card.transliteration_en}\n\nTranslation: ${card.top_en}\n\nReference: ${card.refference_en}`;
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return <SkeletonDuaCard/>
  }

  if (cardsData.length === 0) {
    return <p className="text-gray-500 text-center mt-10">No duas found.</p>;
  }

  return (
    <div className="flex w-[100%]">
     <div className="content">
       {cardsData.map((card: any, index: number) => (
        <div
          key={index}
          ref={(el: any) => (cardRefs.current[index] = el)} 
         
        >
          {card?.subcat_name_en &&  <div className="rounded-lg bg-white mb-4 p-4">
        <p className="text-gray-800 font-medium "> <span className="text-[#31ab69]">Section:</span> {card.subcat_name_en}</p>
        </div> }
       


        <div  className="p-6 bg-white rounded-lg mb-6 shadow-md">
        <div className="flex flex-row justify-start items-center">
            <img src="/assets/icon/duacard.svg" alt="duacard" className="mr-3" />
            <p className="text-[#31ab69] font-medium">{index + 1 }. {card.dua_name_en}</p>
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
             
              <button
                onClick={() => handleCopy(card)}
                className="p-2 text-white rounded-md"
                title={copied ? "Copied!" : "Copy"}
              >
                <img
                  src={copied ? "/assets/icon/copy.svg" : "/assets/icon/copy.svg"}
                  alt={copied ? "Copied" : "Copy"}
                  className="h-6 w-6"
                />
              </button>

           
              <button className="p-2 text-white rounded-md" title="Bookmark">
                <img src="/assets/icon/bookmark.svg" alt="Bookmark" className="h-6 w-6" />
              </button>

             
              <button className="p-2 text-white rounded-md" title="Share">
                <img src="/assets/icon/share.svg" alt="Share" className="h-6 w-6" />
              </button>

              <button className="p-2 text-white rounded-md" title="Report">
                <img src="/assets/icon/report.svg" alt="Report" className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        </div>
      ))}</div>
      <div className="w-[20%] settings-container"><Setting/></div>
    </div>
  );
};

export default DuaCard;
