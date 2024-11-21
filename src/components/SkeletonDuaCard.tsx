import React from "react";
import Setting from "./Setting";

const SkeletonDuaCard = ({ showSettings = true }: { showSettings?: boolean }) => {
  return (
    <div className="flex w-[100%]">
      {/* Content Skeleton */}
      <div className={`content ${showSettings ? "w-[80%]" : "w-[100%]"} space-y-6`}>
        {/* Loop to generate multiple skeleton cards */}
        {Array(5)
          .fill(null)
          .map((_, index) => (
            <div key={index} className="animate-pulse">
              {/* Subcategory Section Skeleton */}
              <div className="rounded-lg bg-gray-200 mb-4 p-4">
                <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
              </div>

              {/* Card Skeleton */}
              <div className="p-6 bg-white rounded-lg mb-6 shadow-md">
                {/* Title Skeleton */}
                <div className="flex flex-row items-center mb-4">
                  <div className="h-10 w-10 bg-gray-200 rounded-full mr-3"></div>
                  <div className="h-4 w-2/3 bg-gray-300 rounded"></div>
                </div>

                {/* Arabic Text Skeleton */}
                <div className="my-8 text-right">
                  <div className="h-6 w-full bg-gray-200 rounded mb-2"></div>
                  <div className="h-6 w-5/6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-6 w-3/4 bg-gray-200 rounded"></div>
                </div>

                {/* Transliteration Skeleton */}
                <div className="my-5">
                  <div className="h-4 w-1/3 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 w-full bg-gray-200 rounded"></div>
                </div>

                {/* Translation Skeleton */}
                <div className="my-5">
                  <div className="h-4 w-1/3 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
                </div>

                {/* Reference Skeleton */}
                <div className="mt-5">
                  <div className="h-4 w-1/4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
                </div>

                {/* Buttons Skeleton */}
                <div className="flex items-center justify-between mt-5">
                  {/* Audio Player Skeleton */}
                  <div className="h-10 w-32 bg-gray-200 rounded"></div>

                  {/* Icon Buttons Skeleton */}
                  <div className="flex space-x-4">
                    {Array(4)
                      .fill(null)
                      .map((_, btnIndex) => (
                        <div
                          key={btnIndex}
                          className="h-10 w-10 bg-gray-200 rounded-md"
                        ></div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Settings Component */}
      {showSettings && (
        <div className="w-[20%] settings-container">
          <Setting />
        </div>
      )}
    </div>
  );
};

export default SkeletonDuaCard;
