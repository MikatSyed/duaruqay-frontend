import React from "react";

interface SettingsPanelProps {
  isOpen: boolean;
  toggleSettings: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ isOpen, toggleSettings }) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full bg-gray-100 shadow-lg transition-transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } w-64`}
    >
      <button
        className="p-4 text-gray-600"
        onClick={toggleSettings}
      >
        ✕
      </button>
      <div className="p-4">
        <h2 className="font-bold text-lg">Settings</h2>
        <ul className="space-y-2 mt-4">
          <li className="p-2 bg-gray-200 rounded-lg">Profile</li>
          <li className="p-2 bg-gray-200 rounded-lg">Notifications</li>
          <li className="p-2 bg-gray-200 rounded-lg">Privacy</li>
        </ul>
      </div>
    </div>
  );
};

export default SettingsPanel;
