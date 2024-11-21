"use client";

import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import CategoryCard from "../../components/CategoryCard";
import SettingsPanel from "../../components/SettingsPanel";
import DuaCard from "@/components/DuaCard";
import { useSearchParams } from "next/navigation";
import BottomSidebar from "@/components/BottomSidebar";

const Dashboard: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSettingsOpen, setSettingsOpen] = useState(false);

  const searchParams = useSearchParams();
  const categoryId = searchParams.get("cat") || "1";
  const subCategoryId = searchParams.get("subcat");
  const duaId = searchParams.get("dua");

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <div className="sidebar">
        <Sidebar
          isOpen={isSidebarOpen}
          toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
        />
      </div>

      <div className="flex-1 flex flex-col main-content ">
        <Header
          toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
          toggleSettings={() => setSettingsOpen(!isSettingsOpen)}
        />

        <div className="flex space-x-6 mx-5">
          <div className="flex-shrink-0 max-h-[750px] overflow-y-auto custom-scrollbar  rounded-lg ">
            <CategoryCard />
          </div>

          <div className="flex-grow flex flex-col max-h-[750px] overflow-y-auto custom-scrollbar">
            <DuaCard
              categoryId={categoryId}
              subCategoryId={subCategoryId}
              duaId={duaId}
            />
          </div>
        </div>
        <div className="bottom-sidebar shadow-md">
          <BottomSidebar />
        </div>
      </div>

      <SettingsPanel
        isOpen={isSettingsOpen}
        toggleSettings={() => setSettingsOpen(!isSettingsOpen)}
      />
    </div>
  );
};

export default Dashboard;
