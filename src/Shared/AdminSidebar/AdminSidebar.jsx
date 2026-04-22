import React from "react";
import { Link, useLocation } from "react-router-dom";

export const AdminSidebar = () => {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/admin" },
    { name: "Products", path: "/admin/products" },
    { name: "Orders", path: "/admin/orders" },
    { name: "Users", path: "/admin/users" },
    { name: "Settings", path: "/admin/settings" },
    { name: "Add Product", path: "/admin/add-product" }
  ];

  return (
    <div className="w-64 bg-white shadow-lg h-full p-4">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>

      <div className="flex flex-col gap-2">
        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`p-2 rounded hover:bg-orange-100 ${
              location.pathname === item.path ? "bg-orange-500 text-white" : ""
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};