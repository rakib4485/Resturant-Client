import React, { useState, useEffect } from "react";
import { FaBoxOpen, FaPizzaSlice } from "react-icons/fa";
import { PiHamburgerFill } from "react-icons/pi";
import { GiCoffeeCup } from "react-icons/gi";
import { useCart } from "../../context/CartContext";
import { Cart } from "../../components/Cart";
import { PosReceipt } from "../../components/PosReceipt";

export const POS = () => {
  const { addToCart } = useCart();
  const [selectedMealTime, setSelectedMealTime] = useState(2); // default Lunch
  const [printOrder, setPrintOrder] = useState(null);

  const mealTimes = [
    { id:1, name:"Breakfast", start:8, end:11 },
    { id:2, name:"Lunch", start:12, end:15 },
    { id:3, name:"Dinner", start:18, end:8 },
  ];

  const mealItems = [
    { id:1, name:"Margherita Pizza", description:"Classic pizza", price:12.99, mealTimes:[2,3] },
    { id:2, name:"Cheeseburger", description:"Juicy burger", price:9.99, mealTimes:[2,3] },
    { id:3, name:"Cappuccino", description:"Rich coffee", price:4.99, mealTimes:[1,2] },
    { id:4, name:"Meat Lovers Box", description:"Hearty meat box", price:15.99, mealTimes:[2,3] },
  ];

  // auto select current meal time
  useEffect(() => {
    const hour = new Date().getHours();
    const currentMeal = mealTimes.find(m => {
      if(m.start < m.end) return hour>=m.start && hour<m.end;
      return hour>=m.start || hour<m.end;
    });
    if(currentMeal) setSelectedMealTime(currentMeal.id);
  }, []);

  const filteredItems = mealItems.filter(i => 
    selectedMealTime ? i.mealTimes.includes(selectedMealTime) : true
  );

  return (
    <div className="min-h-screen bg-orange-50 p-6 flex">

      {/* Menu Grid */}
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {/* Meal Time Switcher */}
        <div className="col-span-full flex gap-2 mb-4">
          {mealTimes.map(m => (
            <button
              key={m.id}
              onClick={() => setSelectedMealTime(m.id)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200
              ${selectedMealTime===m.id ? "bg-orange-500 text-white shadow-md scale-105" : "text-gray-600 hover:bg-orange-100"}`}
            >
              {m.name}
            </button>
          ))}
        </div>

        {filteredItems.map(i => (
          <div
            key={i.id}
            className="bg-white rounded-2xl shadow-lg p-4 cursor-pointer hover:scale-105 transition transform"
          >
            <div className="h-40 bg-orange-100 flex items-center justify-center text-6xl">
              🍕
            </div>
            <h3 className="text-xl font-bold mt-2">{i.name}</h3>
            <p className="text-gray-500 text-sm">{i.description}</p>
            <div className="flex justify-between items-center mt-2">
              <span className="text-orange-500 font-bold">${i.price.toFixed(2)}</span>
              <button
                onClick={() => addToCart(i)}
                className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600"
              >
                Add
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Sidebar */}
      <Cart setPrintOrder={setPrintOrder} />

      {/* POS Receipt */}
      {printOrder && <PosReceipt order={printOrder} onClose={() => setPrintOrder(null)} />}
    </div>
  );
};