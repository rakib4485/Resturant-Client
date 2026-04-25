import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

export const AdminDashboard = () => {
  // 📅 Default today date
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);

  // 🔥 Get token from localStorage
  const token = localStorage.getItem("token");

  // ===============================
  // 📥 FETCH DASHBOARD DATA (WITH DATE)
  // ===============================
  const fetchDashboard = async () => {
    const res = await fetch(
      `https://resturant-backend-chi.vercel.app/api/admin/dashboard?date=${date}`,
      {
      headers: {
        Authorization: `Bearer ${token}`, // 🔥 send token
      },
    }
    );
    if (!res.ok) throw new Error("Failed to load dashboard");
    return res.json();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-dashboard", date],
    queryFn: fetchDashboard,
  });

  if (isLoading) {
    return <p className="p-6">Loading dashboard...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-500">Error loading dashboard</p>;
  }


  return (
    <div className="p-6 space-y-6">

      {/* ===============================
          HEADER + DATE FILTER
      =============================== */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">
          📊 Dashboard Overview
        </h1>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border px-3 py-2 rounded shadow-sm"
        />
      </div>

      {/* ===============================
          STATS CARDS
      =============================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

        <Card
          title="Total Products"
          value={data?.totalProducts}
          color="from-blue-500 to-blue-400"
        />

        <Card
          title="Total Orders"
          value={data?.totalOrders}
          color="from-purple-500 to-purple-400"
        />

        <Card
          title="Revenue"
          value={`৳ ${data?.totalRevenue}`}
          color="from-green-500 to-green-400"
        />

        <Card
          title="Pending Orders"
          value={data?.pendingOrders}
          color="from-orange-500 to-orange-400"
        />

      </div>

      {/* ===============================
          RECENT ORDERS
      =============================== */}
      <div className="bg-white p-5 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          🧾 Recent Orders
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left">

            <thead>
              <tr className="border-b text-gray-500 text-sm">
                <th className="p-3">Token</th>
                <th className="p-3">Items</th>
                <th className="p-3">Total</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {data?.recentOrders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-3 font-semibold">
                    #{order.token}
                  </td>

                  <td className="p-3">
                    {order.items.length} items
                  </td>

                  <td className="p-3 font-bold text-green-600">
                    ৳ {order.total}
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : order.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

    </div>
  );
};

// ===============================
// 🎨 MODERN CARD
// ===============================
const Card = ({ title, value, color }) => {
  return (
    <div
      className={`p-5 rounded-xl text-white shadow-lg bg-gradient-to-r ${color} hover:scale-105 transition`}
    >
      <h3 className="text-sm opacity-80">{title}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
};