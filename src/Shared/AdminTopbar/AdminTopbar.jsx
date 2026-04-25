import React, { useEffect, useState } from "react";
import { FaBars, FaBell, FaMoon, FaSun } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const AdminTopbar = ({ openSidebar }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // 🔥 Load user
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  // 🌙 Dark Mode Toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // 🔓 Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/auth/login");
  };

  return (
    <div className="h-16 bg-white dark:bg-gray-900 shadow-md flex items-center justify-between px-4 md:px-6 sticky top-0 z-40">

      {/* LEFT */}
      <div className="flex items-center gap-4">
        <button
          className="md:hidden text-xl text-gray-700 dark:text-white"
          onClick={openSidebar}
        >
          <FaBars />
        </button>

        <h1 className="font-bold text-lg text-gray-800 dark:text-white">
          Admin Dashboard
        </h1>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {/* 🔔 Notification */}
        <button className="relative text-gray-600 dark:text-gray-200 text-lg">
          <FaBell />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
            3
          </span>
        </button>

        {/* 🌙 Dark Mode */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="text-gray-600 dark:text-gray-200 text-lg"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

        {/* 👤 Profile */}
        {user && (
          <div className="relative">
            <div
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 cursor-pointer bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full"
            >
              <img
                src={user.image}
                alt="user"
                className="w-8 h-8 rounded-full object-cover"
              />

              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-800 dark:text-white">
                  {user.name}
                </p>
                <span className="text-xs text-orange-500">
                  {user.role || "User"}
                </span>
              </div>
            </div>

            {/* 🔽 Dropdown */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
                
                <button
                  onClick={() => navigate("/profile")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
                >
                  Profile
                </button>

                <button
                  onClick={() => navigate("/admin/settings")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
                >
                  Settings
                </button>

                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
                >
                  Logout
                </button>

              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};