import React from "react";
import { Link, useLocation } from "react-router-dom";

export const BottomNav = () => {
  const location = useLocation();

  const menuItems = [
    { id: 1, name: "Home", link: "/", icon: "home" },
    { id: 2, name: "Menu", link: "/menu", icon: "menu" },
    { id: 3, name: "Orders", link: "/orders", icon: "orders" },
    { id: 4, name: "Profile", link: "/profile", icon: "user" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
      <div className="grid grid-cols-4">
        {menuItems.map((item) => (
          <Link
            key={item.id}
            to={item.link}
            className={`flex flex-col items-center justify-center p-2 ${
              location.pathname === item.link ? "bg-gray-200" : ""
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-xs mt-1">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};