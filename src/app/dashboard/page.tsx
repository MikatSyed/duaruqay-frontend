"use client";

import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import CategoryCard from "../../components/CategoryCard";
import SettingsPanel from "../../components/SettingsPanel";
import ContentCard from "@/components/ContentCard";
import Setting from "@/components/Setting";
import { useRouter, useSearchParams } from "next/navigation";
import BottomSidebar from "@/components/BottomSidebar";

const Dashboard: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  

  // Extract category ID from URL query parameters, default to 1
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("cat") || "1";
  const subCategoryId = searchParams.get("subcat") ;
  const duaId = searchParams.get("dua") ;

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
     <div className="sidebar">
     <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
      />
     </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col main-content ">
        <Header
          toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
          toggleSettings={() => setSettingsOpen(!isSettingsOpen)}
        />

        <div className="flex space-x-6 mx-5">
          {/* Category Card Section */}
          <div className="flex-shrink-0 max-h-[550px] overflow-y-auto custom-scrollbar">
            <CategoryCard />
          </div>

          {/* Cards Section */}
          <div className="flex-grow flex flex-col max-h-[550px] overflow-y-auto custom-scrollbar">
            {/* Pass categoryId to ContentCard */}
            <ContentCard categoryId={categoryId} subCategoryId={subCategoryId} duaId={duaId}/>
          </div>

          {/* Settings Panel Section */}
          {/* <div className="flex-shrink-0 settings-container">
            <Setting />
          </div> */}
        </div>
       <div className="bottom-sidebar">
       <BottomSidebar/>
       </div>
      </div>
      

      {/* Settings Panel */}
      <SettingsPanel
        isOpen={isSettingsOpen}
        toggleSettings={() => setSettingsOpen(!isSettingsOpen)}
      />
    </div>
  );
};

export default Dashboard;