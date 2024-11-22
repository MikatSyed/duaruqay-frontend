"use client"; 

import React, { useState, Suspense } from "react";
import Header from "../../components/Header/Header";
import SettingsPanel from "../../components/Settings/SettingsPanel";
import { useSearchParams } from "next/navigation";
import BottomSidebar from "../../components/Header/BottomSidebar";
import CategoryCard from "../../components/Category/CategoryCard";
import DuaCard from "../../components/Dua/DuaCard";
import Sidebar from "../../components/Header/Sidebar";

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSettingsOpen, setSettingsOpen] = useState(false);

  const searchParams = useSearchParams();
  const categoryId = searchParams.get("cat") || "1"; 
  const subCategoryId = searchParams.get("subcat");
  const duaId = searchParams.get("dua");

  return (
    <div className="flex bg-gray-100 min-h-screen ">
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

        <div className="main mx-4">
          <div className="category-card flex-shrink-0 height  rounded-lg">
            <CategoryCard />
          </div>

          <div className="dua-card flex-grow flex flex-col height overflow-y-auto custom-scrollbar">
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


export default function DashboardPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Dashboard />
    </Suspense>
  );
}
