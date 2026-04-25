import React from "react";
import { useQuery } from "@tanstack/react-query";
import { authHeader } from "../../utils/API";

export const TodayOrders = () => {
  // ===============================
  // 📥 FETCH TODAY ORDERS
  // ===============================
  const fetchTodayOrders = async () => {
    const res = await fetch("https://resturant-backend-chi.vercel.app/api/orders/today", {
      headers: authHeader(),
    });
    if (!res.ok) throw new Error("Failed to fetch orders");
    return res.json();
  };

  const { data: orders = [], isLoading, error } = useQuery({
    queryKey: ["today-orders"],
    queryFn: fetchTodayOrders,
  });

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">Error loading orders</p>;

  // ===============================
  // 📊 STATS CALCULATION
  // ===============================
  const totalOrders = orders.length;

  const totalCollection = orders.reduce(
    (acc, order) => acc + (order.total || 0),
    0
  );

  const pendingOrders = orders.filter(
    (o) => o.status === "pending"
  ).length;

  const completedOrders = orders.filter(
    (o) => o.status === "completed"
  ).length;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* ===============================
          HEADER STATS
      =============================== */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

        <StatCard title="Total Orders" value={totalOrders} color="blue" />
        <StatCard title="Total Collection" value={`$${totalCollection.toFixed(2)}`} color="green" />
        <StatCard title="Pending" value={pendingOrders} color="yellow" />
        <StatCard title="Completed" value={completedOrders} color="emerald" />

      </div>

      {/* ===============================
          TITLE
      =============================== */}
      <h1 className="text-2xl font-bold mb-6">
        📦 Today's Orders
      </h1>

      {/* ===============================
          ORDERS LIST
      =============================== */}
      <div className="grid gap-4">

        {orders.length === 0 ? (
          <p className="text-gray-500">No orders today</p>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow rounded-xl p-4 flex justify-between"
            >

              {/* LEFT */}
              <div>
                <h2 className="font-bold">
                  Token #{order.token}
                </h2>

                <div className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleTimeString()}
                </div>

                <div className="text-sm mt-2">
                  {order.items.map((item, i) => (
                    <div key={i}>
                      🍔 {item.name} × {item.quantity}
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT */}
              <div className="text-right">
                <p className="font-bold text-orange-500 text-lg">
                  ${order.total}
                </p>

                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    order.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : order.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>

            </div>
          ))
        )}

      </div>
    </div>
  );
};

// ===============================
// 📦 STAT CARD COMPONENT
// ===============================
const StatCard = ({ title, value, color }) => {
  const colors = {
    blue: "text-blue-600",
    green: "text-green-600",
    yellow: "text-yellow-600",
    emerald: "text-emerald-600",
  };

  return (
    <div className="bg-white shadow rounded-xl p-4">
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className={`text-2xl font-bold ${colors[color]}`}>
        {value}
      </p>
    </div>
  );
};