import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export const Home = () => {

  const [todaySales, setTodaySales] = useState(0);
  const [todayOrders, setTodayOrders] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [topItems, setTopItems] = useState([]);

  useEffect(() => {

    // 🔥 Dummy Orders (simulate backend data)
    const dummyOrders = [
      {
        total: 25,
        createdAt: "2026-04-07T09:00:00",
        items: [{ name: "Pizza", quantity: 2 }]
      },
      {
        total: 15,
        createdAt: "2026-04-07T10:00:00",
        items: [{ name: "Burger", quantity: 1 }]
      },
      {
        total: 30,
        createdAt: "2026-04-07T12:00:00",
        items: [{ name: "Pizza", quantity: 3 }]
      },
      {
        total: 10,
        createdAt: "2026-04-07T13:00:00",
        items: [{ name: "Coffee", quantity: 2 }]
      },
      {
        total: 20,
        createdAt: "2026-04-07T15:00:00",
        items: [{ name: "Burger", quantity: 2 }]
      }
    ];

    processData(dummyOrders);

  }, []);

  const processData = (data) => {

    const today = new Date().toDateString();

    let total = 0;
    let count = 0;
    let hourly = {};
    let itemCount = {};

    data.forEach(order => {

      const orderDate = new Date(order.createdAt);

      if (orderDate.toDateString() === today) {

        total += order.total;
        count++;

        // 📊 Hourly sales
        const hour = orderDate.getHours();
        hourly[hour] = (hourly[hour] || 0) + order.total;

        // 🔥 Item count
        order.items.forEach(item => {
          itemCount[item.name] =
            (itemCount[item.name] || 0) + item.quantity;
        });

      }

    });

    setTodaySales(total);
    setTodayOrders(count);

    // Chart format
    const chart = Object.keys(hourly).map(h => ({
      hour: `${h}:00`,
      sales: hourly[h]
    }));

    setChartData(chart);

    // Top items
    const sorted = Object.entries(itemCount)
      .sort((a, b) => b[1] - a[1]);

    setTopItems(sorted);
  };

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold mb-6">
        📊 Dashboard (Dummy Data)
      </h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Today's Sales</h3>
          <p className="text-2xl font-bold text-green-500">
            ${todaySales}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Orders Today</h3>
          <p className="text-2xl font-bold text-blue-500">
            {todayOrders}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Avg Order Value</h3>
          <p className="text-2xl font-bold text-orange-500">
            $
            {todayOrders
              ? (todaySales / todayOrders).toFixed(2)
              : 0}
          </p>
        </div>

      </div>

      {/* Chart + Top Items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Chart */}
        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-xl font-semibold mb-4">
            📈 Sales Today
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" />
            </BarChart>
          </ResponsiveContainer>

        </div>

        {/* Top Items */}
        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-xl font-semibold mb-4">
            🔥 Top Items
          </h2>

          {topItems.map((item, i) => (

            <div
              key={i}
              className="flex justify-between border-b py-2"
            >

              <span>{item[0]}</span>
              <span>{item[1]}</span>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
};

