import React from "react";
import { FaBars } from "react-icons/fa";

export const AdminTopbar = ({ openSidebar }) => {
  return (
    <div className="h-16 bg-white shadow flex items-center justify-between px-4 md:px-6">

      {/* Mobile menu button */}
      <button
        className="md:hidden text-xl"
        onClick={openSidebar}
      >
        <FaBars />
      </button>

      <h1 className="font-bold text-lg">Admin Dashboard</h1>

      <div className="w-8 h-8 bg-orange-500 rounded-full"></div>
    </div>
  );
};