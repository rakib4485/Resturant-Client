import React from "react";
import { useQuery } from "@tanstack/react-query";

export const AdminDashboard = () => {
  // ===============================
  // 📥 FETCH DASHBOARD DATA
  // ===============================
  const fetchDashboard = async () => {
    const res = await fetch("http://localhost:5000/api/admin/dashboard");
    if (!res.ok) throw new Error("Failed to load dashboard");
    return res.json();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-dashboard"],
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
          STATS CARDS
      =============================== */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        <Card title="Total Products" value={data.totalProducts} />
        <Card title="Total Orders" value={data.totalOrders} />
        <Card title="Revenue" value={`৳ ${data.totalRevenue}`} />
        <Card title="Pending Orders" value={data.pendingOrders} />

      </div>

      {/* ===============================
          RECENT ORDERS
      =============================== */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Recent Orders</h2>

        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="p-2">Token</th>
              <th className="p-2">Items</th>
              <th className="p-2">Total</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>

          <tbody>
            {data.recentOrders.map((order) => (
              <tr key={order._id} className="border-b">
                <td className="p-2">#{order.token}</td>

                <td className="p-2">
                  {order.items.length} items
                </td>

                <td className="p-2">
                  ৳ {order.total}
                </td>

                <td className="p-2">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      order.status === "pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : order.status === "completed"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
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
  );
};

// ===============================
// 📦 CARD COMPONENT
// ===============================
const Card = ({ title, value }) => {
  return (
    <div className="bg-white p-4 rounded shadow hover:shadow-lg transition">
      <h3 className="text-gray-500">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};