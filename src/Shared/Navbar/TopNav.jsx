import React from "react";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";

export const TopNav = () => {
  return (
    <nav className="bg-[#2B3440] shadow-lg p-4">
      <div className="container mx-auto flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Food Logo" className="w-10 h-10" />
          <span className="text-white font-bold text-xl">Foodie</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6 text-white font-medium">
          <Link to="/" className="hover:text-orange-400 transition-colors">Home</Link>
          <Link to="/menu" className="hover:text-orange-400 transition-colors">Menu</Link>
          <Link to="/orders" className="hover:text-orange-400 transition-colors">Orders</Link>
          <Link to="/profile" className="hover:text-orange-400 transition-colors">Profile</Link>
          <Link to="/admin" className="hover:text-orange-400 transition-colors">Admin</Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="lg:hidden">
          <label htmlFor="menu-drawer" className="btn btn-ghost text-white">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </label>
        </div>

      </div>
    </nav>
  );
};