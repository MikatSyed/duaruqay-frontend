"use client";

import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import CategoryCard from "../../components/CategoryCard";
import SettingsPanel from "../../components/SettingsPanel";
import ContentCard from "@/components/ContentCard";
import Setting from "@/components/Setting";

// Define categories as a sample data structure with unique IDs
const cardsData = [
  {
    title: "2. The servant is dependent on his Lord #2",
    arabic:
      "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيْكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، اَللَّهُمَّ لَا مَانِعَ لِمَا أَعْطَيْتَ وَلَا مُعْطِيَ لِمَا مَنَعْتَ وَلَا يَنْفَعُ ذَا الْجَدِّ مِنْكَ الْجَدُّ",
    transliteration:
      "Laa ilaaha illallahu wahdahu laa sharika lahu, lahul-mulku wa lahul-hamdu wa huwa 'alaa kulli shay'in qadir. Allaahumma laa maani'a limaa a'taita wa laa mu'tia limaa mana'ta wa laa yanfa'u dhal-jaddi minka al-jaddu",
    translation:
      "There is none worthy of worship except Allah alone with no partner or associate. He is the Dominion and to Him be all praise, and He is able to do all things. O Allah, one can withhold what You have given and none can give what You have withheld, and no wealth or fortune can benefit anyone for from You comes all wealth and fortune.",
    hadithReference: "Bukhari: 844",
  },
  {
    title: "3. The reward of freeing of a slave",
    arabic:
      "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ، وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
    transliteration:
      "Laa ilahaa illAllahu wahdahu laa sharika lahu, lahul-mulku wa lahul-hamdu wa huwa 'alaa kulli shay'in qadir",
    translation:
      "None has the right to be worshipped but Allah alone, Who has no partner. His is the dominion and His is the praise, and He is Able to do all things. The Prophet (ﷺ) said: The person who says the above statement 10 times It would be as if he had freed four of Ishmael's (As) children from slavery.",
    hadithReference: "Bukhari: 6404",
  },
];


const Dashboard: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSettingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-32">
        <Header
          toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
          toggleSettings={() => setSettingsOpen(!isSettingsOpen)}
        />

<div className="flex space-x-6 mx-5">
  {/* Category Card Section */}
  <div className="flex-shrink-0  max-h-[550px] overflow-y-auto custom-scrollbar">
    <CategoryCard />
  </div>

  {/* Cards Section */}
  <div className="flex-grow flex flex-col  max-h-[550px] overflow-y-auto custom-scrollbar">
    {cardsData.map((card, index) => (
      <ContentCard
        key={index}
        title={card.title}
        arabic={card.arabic}
        transliteration={card.transliteration}
        translation={card.translation}
        hadithReference={card.hadithReference}
      />
    ))}
  </div>

  {/* Settings Panel Section */}
  <div className="flex-shrink-0 settings-container">
    <Setting />
  </div>
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
