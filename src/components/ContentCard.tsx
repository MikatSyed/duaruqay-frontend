// components/ContentCard.js

import React, { useState } from "react";
import { FaClipboard, FaCheck, FaBookmark, FaShareAlt, FaFlag } from "react-icons/fa";

const ContentCard = ({ title, arabic, transliteration, translation, hadithReference }:any) => {
  const [copied, setCopied] = useState(false);

  // Function to copy text to clipboard
  const handleCopy = () => {
    const content = `${title}\n\n${arabic}\n\nTransliteration: ${transliteration}\n\nTranslation: ${translation}\n\nReference: ${hadithReference}`;
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
 
    <div
     
      className="flex mb-5 flex-row bg-white rounded-lg px-5 py-4 justify-start items-center "
    >
      <p className="text-title font-medium leading-[25px] text-gray-800">
        <span className="text-[#31ab69] font-medium leading-[25px] ">
          Section:&nbsp;
        </span>
        The servant is dependent on his Lord
      </p>
    </div>
  
  
    <div className="p-6 bg-white rounded-lg mb-6">
      <div className="flex flex-row justify-start items-center">
        <img src="/assets/icon/duacard.svg" alt="duacard" className="mr-3" />
        <p className="text-[#31ab69] font-medium">{title}</p>
      </div>
  
     
      <div className="flex flex-col justify-start items-start">
        <div className="w-full">
        
          <p
            dir="rtl"
            className="my-8 text-right leading-loose text-3xl"
            style={{ wordSpacing: "8px", fontSize: "26px", fontFamily: "me_quran" }}
          >
            {arabic}
          </p>
  
        
          <p
            className="my-5 text-justify leading-8 italic"
            style={{ fontSize: "18px" }}
          >
            <span className="font-medium">Transliteration:</span> {transliteration}
          </p>
  
          <p
            className="my-5 text-title text-justify font-normal"
            style={{ fontSize: "18px" }}
          >
            <span className="font-medium">Translation:</span> {translation}
          </p>
        </div>
  
      
        <div>
          <p className="mt-5 font-semibold text-[#31ab69] text-[18px]">Reference:</p>
          <div className="mt-1 font-normal text-[18px]">
            <span>{hadithReference}</span>
          </div>
        </div>
      </div>
  
      {/* Action Buttons */}
      <div className="flex items-center justify-between mt-5">
        <div>
          <div className="flex items-center space-x-2">
            <button className="text-white rounded-md" title="AudioBtn">
              <img
                src="/assets/icon/audiobtn.svg"
                alt="Audio Button"
                className="h-14 w-14"
              />
            </button>
            <input type="range" min="0" max="100" className="w-[20px]" />
          </div>
        </div>
        <div className="flex space-x-4">
          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="p-2 text-white rounded-md"
            title={copied ? "Copied!" : "Copy"}
          >
            <img
              src={copied ? "/assets/icon/copy.svg" : "/assets/icon/copy.svg"}
              alt={copied ? "Copied" : "Copy"}
              className="h-6 w-6"
            />
          </button>
  
          {/* Bookmark Button */}
          <button className="p-2 text-white rounded-md" title="Bookmark">
            <img
              src="/assets/icon/bookmark.svg"
              alt="Bookmark"
              className="h-6 w-6"
            />
          </button>
  
          {/* Share Button */}
          <button className="p-2 text-white rounded-md" title="Share">
            <img
              src="/assets/icon/plan.svg"
              alt="Share"
              className="h-6 w-6"
            />
          </button>
  
          {/* Report Buttons */}
          <button className="p-2 text-white rounded-md" title="Share">
            <img
              src="/assets/icon/share.svg"
              alt="Share"
              className="h-5 w-5"
            />
          </button>
          <button className="p-2 text-white rounded-md" title="Report">
            <img
              src="/assets/icon/report.svg"
              alt="Report"
              className="h-5 w-5"
            />
          </button>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default ContentCard;
