"use client";
import React, { useState } from "react";
import { FaCog, FaFont, FaPaintBrush } from "react-icons/fa";
import { TbLanguage } from "react-icons/tb";

const Setting: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string | null>("language");

  const handleSectionClick = (section: string) => {
    setActiveSection(section);
  };

  const isActive = (section: string) => activeSection === section;

  return (
    <div className="fixed   h-[550px] bg-white md:w-[340px] rounded-3xl">
      <div className=" pb-6 xs:pt-0 sm:pt-0">
        <p className="text-center text-xl xs:hidden sm:hidden">Settings</p>
      </div>
      <div className="xs:pb-4 sm:pb-4 w-full">
        {/* Language Settings */}
        <div className="mx-4 my-4" onClick={() => handleSectionClick("language")}>
          <div
            className={`border rounded-lg ${
              isActive("language") ? "border-l-4 border-[#31ab69]" : "border-transparent"
            }`}
          >
            <div
              className={`flex flex-row w-full rounded-lg ${
                isActive("language") ? "bg-green-50" : "bg-gray-100"
              }`}
            >
              <div className="p-2 flex flex-row items-center w-full">
                <div
                  className={`bg-gray-200 flex p-[10px] items-center rounded-full mr-5 justify-center ${
                    isActive("language") ? "bg-[#31ab69]" : ""
                  }`}
                >
                  <TbLanguage
                    className={`text-[22px] font-normal ${
                      isActive("language") ? "text-[#31ab69]" : "text-gray-400"
                    }`}
                  />
                </div>
                <p
                  className={`font-medium text-start text-base leading-5 xs:text-sm lg-min:text-sm ${
                    isActive("language") ? "text-[#31ab69]" : "text-gray-700"
                  }`}
                >
                  Language Settings
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* General Settings */}
        <div className="mx-4 my-4" onClick={() => handleSectionClick("general")}>
          <div
            className={`border rounded-lg ${
              isActive("general") ? "border-l-4 border-[#31ab69]" : "border-transparent"
            }`}
          >
            <div
              className={`flex flex-row w-full rounded-lg ${
                isActive("general") ? "bg-green-50" : "bg-gray-100"
              }`}
            >
              <div className="p-2 flex flex-row items-center w-full">
                <div
                  className={`bg-gray-200 flex p-[10px] items-center rounded-full mr-5 justify-center ${
                    isActive("general") ? "bg-[#31ab69]" : ""
                  }`}
                >
                  <FaCog
                    className={`text-[22px] font-normal ${
                      isActive("general") ? "text-[#31ab69]" : "text-gray-400"
                    }`}
                  />
                </div>
                <p
                  className={`font-medium text-start text-base leading-5 xs:text-sm lg-min:text-sm ${
                    isActive("general") ? "text-[#31ab69]" : "text-gray-700"
                  }`}
                >
                  General Settings
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Font Settings */}
        <div className="mx-4 my-4" onClick={() => handleSectionClick("font")}>
          <div
            className={`border rounded-lg ${
              isActive("font") ? "border-l-4 border-[#31ab69]" : "border-transparent"
            }`}
          >
            <div
              className={`flex flex-row w-full rounded-lg ${
                isActive("font") ? "bg-green-50" : "bg-gray-100"
              }`}
            >
              <div className="p-2 flex flex-row items-center w-full">
                <div
                  className={`bg-gray-200 flex p-[10px] items-center rounded-full mr-5 justify-center ${
                    isActive("font") ? "bg-[#31ab69]" : ""
                  }`}
                >
                  <FaFont
                    className={`text-[22px] font-normal ${
                      isActive("font") ? "text-[#31ab69]" : "text-gray-400"
                    }`}
                  />
                </div>
                <p
                  className={`font-medium text-start text-base leading-5 xs:text-sm lg-min:text-sm ${
                    isActive("font") ? "text-[#31ab69]" : "text-gray-700"
                  }`}
                >
                  Font Settings
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="mx-4 my-4" onClick={() => handleSectionClick("appearance")}>
          <div
            className={`border rounded-lg ${
              isActive("appearance") ? "border-l-4 border-[#31ab69]" : "border-transparent"
            }`}
          >
            <div
              className={`flex flex-row w-full rounded-lg ${
                isActive("appearance") ? "bg-green-50" : "bg-gray-100"
              }`}
            >
              <div className="p-2 flex flex-row items-center w-full">
                <div
                  className={`bg-gray-200 flex p-[10px] items-center rounded-full mr-5 justify-center ${
                    isActive("appearance") ? "bg-[#31ab69]" : ""
                  }`}
                >
                  <FaPaintBrush
                    className={`text-[22px] font-normal ${
                      isActive("appearance") ? "text-[#31ab69]" : "text-gray-400"
                    }`}
                  />
                </div>
                <p
                  className={`font-medium text-start text-base leading-5 xs:text-sm lg-min:text-sm ${
                    isActive("appearance") ? "text-[#31ab69]" : "text-gray-700"
                  }`}
                >
                  Appearance Settings
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;