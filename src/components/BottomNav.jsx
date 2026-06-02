import React from "react";
import { motion } from "framer-motion";

export default function BottomNav({ tabs, activeTab, setActiveTab }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-50 border-t border-slate-200">
      <ul className="flex justify-around items-center p-0 m-0 w-full max-w-4xl mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <li key={tab.id} className="flex-1">
              <button
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex flex-col items-center justify-center py-3 px-1 transition-colors duration-200 relative ${
                  isActive ? "text-indigo-600" : "text-slate-400 hover:text-indigo-500 hover:bg-slate-50"
                }`}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-[10px] sm:text-xs font-medium">{tab.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="bottomNavIndicator"
                    className="absolute top-0 w-1/2 h-1 bg-indigo-600 rounded-b-md"
                  />
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
