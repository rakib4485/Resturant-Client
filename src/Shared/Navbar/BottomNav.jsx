import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaUtensils, FaClipboardList, FaUser } from "react-icons/fa";

export const BottomNav = () => {
  const location = useLocation();

  const menuItems = [
    { id: 1, name: "Home", link: "/", icon: <FaHome /> },
    { id: 2, name: "Menu", link: "/menu", icon: <FaUtensils /> },
    { id: 3, name: "Orders", link: "/orders", icon: <FaClipboardList /> },
    { id: 4, name: "Profile", link: "/profile", icon: <FaUser /> },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[95%] max-w-md z-50">
      
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-2xl rounded-2xl px-2 py-2 border border-gray-200 dark:border-gray-700">
        
        <div className="grid grid-cols-4 gap-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.link;

            return (
              <Link
                key={item.id}
                to={item.link}
                className={`flex flex-col items-center justify-center py-2 rounded-xl transition-all duration-300 active:scale-95
                  ${
                    isActive
                      ? "bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-md scale-105"
                      : "text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
              >
                {/* ICON */}
                <div
                  className={`text-xl mb-1 ${
                    isActive ? "animate-pulse" : ""
                  }`}
                >
                  {item.icon}
                </div>

                {/* LABEL */}
                <span className="text-xs font-medium">
                  {item.name}
                </span>

                {/* 🔥 ACTIVE DOT */}
                {isActive && (
                  <div className="w-1.5 h-1.5 bg-white rounded-full mt-1"></div>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};