import React, { useEffect, useState } from "react";
import { FaBoxOpen, FaPizzaSlice } from "react-icons/fa";
import { PiHamburgerFill } from "react-icons/pi";
import { GiCoffeeCup } from "react-icons/gi";
import { OrderModal } from "../../components/OrderModal";

export const Menu = () => {
//   const [selectedMealTime, setSelectedMealTime] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedMealTime, setSelectedMealTime] = useState(null);

useEffect(() => {
  const hour = new Date().getHours();

const currentMeal = mealTimes.find((meal) => {
  if (meal.start < meal.end) {
    return hour >= meal.start && hour < meal.end;
  }
  return hour >= meal.start || hour < meal.end;
});

  if (currentMeal) {
    setSelectedMealTime(currentMeal.id);
  }
}, []);

  // State for order modal
  const openModal = (item) => {
    setSelectedItem(item);
    setQuantity(1);
    setIsModalOpen(true);
  };
  const closeModal = () => {
  setIsModalOpen(false);
};

  // Sample data for menu items and meal times
  const menuItems = [
    {
      id: 1,
      name: "Pizza",
      Icons: <FaPizzaSlice />,
    },
    {
      id: 2,
      name: "Burger",
      Icons: <PiHamburgerFill />,
    },
    {
      id: 3,
      name: "Coffee",
      Icons: <GiCoffeeCup />,
    },
    {
      id: 4,
      name: "Meat Box",
      Icons: <FaBoxOpen />,
    },
  ];
  const mealItems = [
    {
      id: 1,
      name: "Margherita Pizza",
      description: "A classic pizza with tomato sauce and mozzarella cheese.",
      price: 12.99,
      mealTimes: [2, 3],
    },
    {
      id: 2,
      name: "Cheeseburger",
      description: "A juicy beef patty with cheese, lettuce, and tomato.",
      price: 9.99,
      mealTimes: [2, 3],
    },
    {
      id: 3,
      name: "Cappuccino",
      description: "A rich espresso with steamed milk and foam.",
      price: 4.99,
      mealTimes: [1, 2],
    },
    {
      id: 4,
      name: "Meat Lovers Box",
      description: "A hearty box filled with various meats and sides.",
      price: 15.99,
      mealTimes: [2, 3],
    },
  ];
  const mealTimes = [
    {
      id: 1,
      name: "Breakfast",
      start: 8,
      end: 11,
    },
    {
      id: 2,
      name: "Lunch",
      start: 12,
      end: 15,
    },
    {
      id: 3,
      name: "Dinner",
      start: 18,
      end: 8,
    },
  ];
  return (
  <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white p-6">

    {/* Header */}
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-4xl font-extrabold text-gray-800">
        🍽 Food Menu
      </h1>

      {/* Meal Switcher */}
      <div className="flex bg-white shadow-xl rounded-full border p-1 gap-1">
        {mealTimes.map((meal) => (
          <button
            key={meal.id}
            onClick={() => setSelectedMealTime(meal.id)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200
            ${
              selectedMealTime === meal.id
                ? "bg-orange-500 text-white shadow-md scale-105"
                : "text-gray-600 hover:bg-orange-100"
            }`}
          >
            {meal.name}
          </button>
        ))}
      </div>
    </div>

    {/* Section Title */}
    <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
      {mealTimes.find((m) => m.id === selectedMealTime)?.name} Specials
    </h2>

    {/* Food Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

      {mealItems
        .filter((meal) => meal.mealTimes.includes(selectedMealTime))
        .map((meal) => (
          <div
            key={meal.id}
            onClick={() => openModal(meal)}
            className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer
            transform hover:scale-105 hover:shadow-2xl transition duration-300"
          >

            {/* Image */}
            <div className="h-40 bg-orange-100 flex items-center justify-center text-6xl">
              🍕
            </div>

            {/* Content */}
            <div className="p-4">

              <h3 className="text-xl font-bold text-gray-800 mb-1">
                {meal.name}
              </h3>

              <p className="text-gray-500 text-sm mb-3">
                {meal.description}
              </p>

              <div className="flex justify-between items-center">

                <span className="text-lg font-bold text-orange-500">
                  ${meal.price.toFixed(2)}
                </span>

                <button className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm hover:bg-orange-600">
                  Order
                </button>

              </div>

            </div>

          </div>
        ))}

    </div>

    {/* Order Modal */}
    <OrderModal
      isModalOpen={isModalOpen}
      selectedItem={selectedItem}
      setQuantity={setQuantity}
      closeModal={closeModal}
      quantity={quantity}
    />

  </div>
);
};
