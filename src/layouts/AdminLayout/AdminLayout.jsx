import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { AdminSidebar } from "../../Shared/AdminSidebar/AdminSidebar";
import { AdminTopbar } from "../../Shared/AdminTopbar/AdminTopbar";

export const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen bg-gray-100 overflow-hidden">

      {/* ===============================
          SIDEBAR (responsive)
      =============================== */}
      <div
        className={`
          fixed md:static z-50 h-full bg-white shadow-lg
          transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:w-64
        `}
      >
        <AdminSidebar closeSidebar={() => setSidebarOpen(false)} />
      </div>

      {/* ===============================
          MAIN AREA
      =============================== */}
      <div className="flex flex-col flex-1 w-full">

        {/* TOPBAR */}
        <AdminTopbar openSidebar={() => setSidebarOpen(true)} />

        {/* CONTENT */}
        <main className="flex-1 overflow-y-auto p-3 md:p-6">
          <Outlet />
        </main>

      </div>

      {/* BACKDROP (mobile only) */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 md:hidden"
        />
      )}
    </div>
  );
};