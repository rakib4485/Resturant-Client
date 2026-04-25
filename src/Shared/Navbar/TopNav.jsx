import React from "react";
import logo from "../../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { useSettings } from "../../context/SettingsContext";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

export const TopNav = () => {
  const { settings } = useSettings();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // const [user, setUser] = useState(null);

  // 🔥 Get user from localStorage
  // useEffect(() => {
  //   const storedUser = JSON.parse(localStorage.getItem("user"));
  //   setUser(storedUser);
  // }, []);

  // // 🔥 Logout function
  // const handleLogout = () => {
  //   localStorage.removeItem("user");
  //   localStorage.removeItem("token");

  //   setUser(null);

  //   // redirect
  //   navigate("/auth/login");
  // };

  return (
    <nav className="bg-[#2B3440] shadow-lg px-4 py-3 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">

        {/* 🔷 Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={settings?.logo || logo}
            alt="Food Logo"
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="text-white font-bold text-xl">
            {settings?.storeName || "Foodie"}
          </span>
        </Link>

        {/* 🔷 Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6 text-white font-medium">

          <Link to="/" className="hover:text-orange-400">Home</Link>
          <Link to="/menu" className="hover:text-orange-400">Menu</Link>
          <Link to="/orders" className="hover:text-orange-400">Orders</Link>

          {/* 🔥 If logged in */}
          {user ? (
            <div className="flex items-center gap-3">
              <Link to="/admin" className="hover:text-orange-400">Admin</Link>

              {/* 👤 User Info */}
              <div className="flex items-center gap-2 bg-gray-700 px-3 py-1 rounded-full">
                <img
                  src={user.image}
                  alt="user"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-sm">{user.name}</span>
              </div>

              {/* 🔓 Logout */}
              <button
                onClick={logout}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 text-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/auth/login"
              className="bg-orange-500 px-4 py-1 rounded hover:bg-orange-600"
            >
              Login
            </Link>
          )}
        </div>

        {/* 🔷 Mobile Menu */}
        <div className="lg:hidden dropdown dropdown-end">
          <label tabIndex={0} className="text-white cursor-pointer">
            ☰
          </label>

          <ul className="dropdown-content menu p-3 shadow bg-white rounded-box w-52 mt-3">

            <li><Link to="/">Home</Link></li>
            <li><Link to="/menu">Menu</Link></li>
            <li><Link to="/orders">Orders</Link></li>

            {user ? (
              <>
                <li className="flex items-center gap-2 p-2">
                  <img
                    src={user.image}
                    alt="user"
                    className="w-8 h-8 rounded-full"
                  />
                  <span>{user.name}</span>
                </li>

                <li>
                  <button onClick={logout} className="text-red-500">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/auth/login">Login</Link>
              </li>
            )}
          </ul>
        </div>

      </div>
    </nav>
  );
};