import React from "react";
import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <div className="min-h-screen flex">

      {/* LEFT SIDE (Branding / Visual) */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-orange-500 to-orange-600 text-white flex-col justify-center items-center p-10">

        <h1 className="text-5xl font-extrabold mb-4">
          🍽 Foodie POS
        </h1>

        <p className="text-lg text-center max-w-md opacity-90">
          Smart restaurant management system.  
          Take orders, manage kitchen, track sales — all in one place.
        </p>

        {/* Optional Illustration */}
        <div className="mt-10">
          <img
            src="https://illustrations.popsy.co/orange/digital-nomad.svg"
            alt="illustration"
            className="w-80"
          />
        </div>
      </div>

      {/* RIGHT SIDE (FORM) */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 p-6">

        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">

          {/* LOGO / TITLE */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">
              Welcome 👋
            </h2>
            <p className="text-gray-500 text-sm">
              Login or create an account
            </p>
          </div>

          {/* 🔥 Dynamic Content */}
          <Outlet />

        </div>

      </div>
    </div>
  );
};