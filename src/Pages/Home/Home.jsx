import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { useSettings } from "../../context/SettingsContext";

export const Home = () => {
  const { settings, isLoading } = useSettings();
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 pb-24">

      {/* HERO SECTION */}
      <div className="flex flex-col items-center justify-center text-center px-4 py-10">
        <img src={settings?.logo || logo} className="w-24 mb-4" />

        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight">
          Welcome to <span className="text-orange-500">{settings?.storeName || "Foodie"}</span>
        </h1>

        <p className="text-gray-500 mt-3 max-w-md">
          Delicious food, fast service, and smooth ordering experience.
        </p>

        <Link
          to="/menu"
          className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-orange-600 transition"
        >
          Order Now 🍔
        </Link>
      </div>

      {/* CATEGORY SECTION */}
      <div className="px-4 md:px-10 mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          🍽 Popular Categories
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Pizza", icon: "🍕" },
            { name: "Burger", icon: "🍔" },
            { name: "Coffee", icon: "☕" },
            { name: "Meat Box", icon: "🍗" },
          ].map((cat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-xl transition cursor-pointer"
            >
              <div className="text-4xl">{cat.icon}</div>
              <p className="mt-2 font-semibold text-gray-700">
                {cat.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURED ITEMS */}
      <div className="px-4 md:px-10 mt-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          🔥 Featured Items
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
            >
              <div className="h-32 bg-orange-100 flex items-center justify-center text-4xl">
                🍔
              </div>

              <div className="p-3">
                <h3 className="font-bold text-gray-800">
                  Delicious Item
                </h3>

                <p className="text-sm text-gray-500">
                  Tasty and fresh food
                </p>

                <p className="text-orange-500 font-bold mt-2">
                  ৳ 250
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA SECTION */}
      <div className="mt-12 text-center px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Ready to order?
        </h2>

        <p className="text-gray-500 mt-2">
          Browse menu and place your order instantly
        </p>

        <Link
          to="/menu"
          className="inline-block mt-5 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-600 transition"
        >
          Go to Menu →
        </Link>
      </div>

    </div>
  );
};