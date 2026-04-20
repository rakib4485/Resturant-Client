// import React, { useEffect, useState } from "react";
// import { FaBoxOpen, FaPizzaSlice } from "react-icons/fa";
// import { PiHamburgerFill } from "react-icons/pi";
// import { GiCoffeeCup } from "react-icons/gi";
// import { OrderModal } from "../../components/OrderModal";
// import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";
// import logo from "../../assets/logo.svg";

// export const Menu = () => {
//   //   const [selectedMealTime, setSelectedMealTime] = useState(null);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const [selectedMealTime, setSelectedMealTime] = useState(null);
//   const [cartOpen, setCartOpen] = useState(true);
//   const [cartsItems, setCartItems] = useState([]);

//   useEffect(() => {
//     const hour = new Date().getHours();

//     const currentMeal = mealTimes.find((meal) => {
//       if (meal.start < meal.end) {
//         return hour >= meal.start && hour < meal.end;
//       }
//       return hour >= meal.start || hour < meal.end;
//     });

//     if (currentMeal) {
//       setSelectedMealTime(currentMeal.id);
//     }
//   }, []);

//   // State for order modal
//   const openModal = (item) => {
//     setSelectedItem(item);
//     setQuantity(1);
//     setIsModalOpen(true);
//   };
//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   // Sample data for menu items and meal times
//   const menuItems = [
//     {
//       id: 1,
//       name: "Pizza",
//       Icons: <FaPizzaSlice />,
//     },
//     {
//       id: 2,
//       name: "Burger",
//       Icons: <PiHamburgerFill />,
//     },
//     {
//       id: 3,
//       name: "Coffee",
//       Icons: <GiCoffeeCup />,
//     },
//     {
//       id: 4,
//       name: "Meat Box",
//       Icons: <FaBoxOpen />,
//     },
//   ];
//   const mealItems = [
//     {
//       id: 1,
//       name: "Margherita Pizza",
//       description: "A classic pizza with tomato sauce and mozzarella cheese.",
//       price: 12.99,
//       mealTimes: [2, 3],
//     },
//     {
//       id: 2,
//       name: "Cheeseburger",
//       description: "A juicy beef patty with cheese, lettuce, and tomato.",
//       price: 9.99,
//       mealTimes: [2, 3],
//     },
//     {
//       id: 3,
//       name: "Cappuccino",
//       description: "A rich espresso with steamed milk and foam.",
//       price: 4.99,
//       mealTimes: [1, 2],
//     },
//     {
//       id: 4,
//       name: "Meat Lovers Box",
//       description: "A hearty box filled with various meats and sides.",
//       price: 15.99,
//       mealTimes: [2, 3],
//     },
//     {
//       id: 1,
//       name: "Margherita Pizza",
//       description: "A classic pizza with tomato sauce and mozzarella cheese.",
//       price: 12.99,
//       mealTimes: [2, 3],
//     },
//     {
//       id: 2,
//       name: "Cheeseburger",
//       description: "A juicy beef patty with cheese, lettuce, and tomato.",
//       price: 9.99,
//       mealTimes: [2, 3],
//     },
//     {
//       id: 3,
//       name: "Cappuccino",
//       description: "A rich espresso with steamed milk and foam.",
//       price: 4.99,
//       mealTimes: [1, 2],
//     },
//     {
//       id: 4,
//       name: "Meat Lovers Box",
//       description: "A hearty box filled with various meats and sides.",
//       price: 15.99,
//       mealTimes: [2, 3],
//     },
//     {
//       id: 1,
//       name: "Margherita Pizza",
//       description: "A classic pizza with tomato sauce and mozzarella cheese.",
//       price: 12.99,
//       mealTimes: [2, 3],
//     },
//     {
//       id: 2,
//       name: "Cheeseburger",
//       description: "A juicy beef patty with cheese, lettuce, and tomato.",
//       price: 9.99,
//       mealTimes: [2, 3],
//     },
//     {
//       id: 3,
//       name: "Cappuccino",
//       description: "A rich espresso with steamed milk and foam.",
//       price: 4.99,
//       mealTimes: [1, 2],
//     },
//     {
//       id: 4,
//       name: "Meat Lovers Box",
//       description: "A hearty box filled with various meats and sides.",
//       price: 15.99,
//       mealTimes: [2, 3],
//     },
//     {
//       id: 1,
//       name: "Margherita Pizza",
//       description: "A classic pizza with tomato sauce and mozzarella cheese.",
//       price: 12.99,
//       mealTimes: [2, 3],
//     },
//     {
//       id: 2,
//       name: "Cheeseburger",
//       description: "A juicy beef patty with cheese, lettuce, and tomato.",
//       price: 9.99,
//       mealTimes: [2, 3],
//     },
//     {
//       id: 3,
//       name: "Cappuccino",
//       description: "A rich espresso with steamed milk and foam.",
//       price: 4.99,
//       mealTimes: [1, 2],
//     },
//     {
//       id: 4,
//       name: "Meat Lovers Box",
//       description: "A hearty box filled with various meats and sides.",
//       price: 15.99,
//       mealTimes: [2, 3],
//     },
//   ];
//   const mealTimes = [
//     {
//       id: 1,
//       name: "Breakfast",
//       start: 8,
//       end: 11,
//     },
//     {
//       id: 2,
//       name: "Lunch",
//       start: 12,
//       end: 15,
//     },
//     {
//       id: 3,
//       name: "Dinner",
//       start: 18,
//       end: 8,
//     },
//   ];

//   // printer
//   const handlePrint = () => {
//   if (cartsItems.length === 0) return;

//   const date = new Date().toLocaleString();

//   const kitchenItems = cartsItems.map(item => `
//     <div style="display:flex; justify-content:space-between;">
//       <span>${item.name}</span>
//       <span>x${item.quantity}</span>
//     </div>
//   `).join("");

//   const customerItems = cartsItems.map(item => `
//     <div style="display:flex; justify-content:space-between;">
//       <span>${item.name} x${item.quantity}</span>
//       <span>$${item.total}</span>
//     </div>
//   `).join("");

//   const total = cartsItems
//     .reduce((acc, item) => acc + parseFloat(item.total), 0)
//     .toFixed(2);

//   const printContent = `
// <html>
// <head>
//   <style>
//     body { width: 80mm; font-family: monospace; padding: 10px; }
//     .center { text-align: center; }
//     .line { border-top: 1px dashed #000; margin: 8px 0; }
//     .bold { font-weight: bold; }
//     .cut { margin: 20px 0; border-top: 2px dashed #000; }
//     img { display: block; margin: 0 auto; }
//   </style>
// </head>
// <body>

//   <div class="center">
//     <h3>KITCHEN COPY</h3>
//     <p>Token: 01</p>
//     <p>${date}</p>
//   </div>

//   <div class="line"></div>
//   ${kitchenItems}
//   <div class="line"></div>

//   <div class="center bold">Prepare Order</div>

//   <div class="cut"></div>

//   <div class="center">
//     <img src="/logo.png" width="80" />
//     <p><b>Foodie</b></p>
//     <p>Customer Copy</p>
//     <p>Token: 01</p>
//     <p>${date}</p>
//   </div>

//   <div class="line"></div>
//   ${customerItems}
//   <div class="line"></div>

//   <div class="bold" style="display:flex; justify-content:space-between;">
//     <span>Total</span>
//     <span>$${total}</span>
//   </div>

//   <div class="line"></div>

//   <div class="center">Thank You ❤️</div>

// </body>
// </html>
// `;

//   const win = window.open("", "", "width=300,height=600");

//   win.document.write(printContent);
//   win.document.close();

//   setTimeout(() => {
//     win.print();
//     win.close();
//     setCartItems([]);
//   }, 300);
// };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white p-6">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-4xl font-extrabold text-gray-800">🍽 Food Menu</h1>

//         {/* Meal Switcher */}
//         <div className="flex bg-white shadow-xl rounded-full border p-1 gap-1">
//           {mealTimes.map((meal) => (
//             <button
//               key={meal.id}
//               onClick={() => setSelectedMealTime(meal.id)}
//               className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200
//             ${
//               selectedMealTime === meal.id
//                 ? "bg-orange-500 text-white shadow-md scale-105"
//                 : "text-gray-600 hover:bg-orange-100"
//             }`}
//             >
//               {meal.name}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Section Title */}
//       <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
//         {mealTimes.find((m) => m.id === selectedMealTime)?.name} Specials
//       </h2>

//       <div className="flex gap-6">
//         {/* Food Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 flex-1">
//         {mealItems
//           .filter((meal) => meal.mealTimes.includes(selectedMealTime))
//           .map((meal) => (
//             <div
//               key={meal.id}
//               onClick={() => openModal(meal)}
//               className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer
//             transform hover:scale-105 hover:shadow-2xl transition duration-300"
//             >
//               {/* Image */}
//               <div className="h-40 bg-orange-100 flex items-center justify-center text-6xl">
//                 🍕
//               </div>

//               {/* Content */}
//               <div className="p-4">
//                 <h3 className="text-xl font-bold text-gray-800 mb-1">
//                   {meal.name}
//                 </h3>

//                 <p className="text-gray-500 text-sm mb-3">{meal.description}</p>

//                 <div className="flex justify-between items-center">
//                   <span className="text-lg font-bold text-orange-500">
//                     ${meal.price.toFixed(2)}
//                   </span>

//                   <button className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm hover:bg-orange-600">
//                     Order
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//       </div>

//       {/* carts */}
//       <div
//         className={`sticky top-[150px] right-4 bg-white px-4 py-2 rounded-lg shadow-lg h-screen ${cartOpen ? "w-64" : "w-16"} transition-transform duration-300`}
//       >
//         {
//           cartOpen ? (
//             <IoIosArrowDropleftCircle
//               onClick={() => setCartOpen(false)}
//               className="text-4xl text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
//             />
//           ) : (
//             <IoIosArrowDroprightCircle
//               onClick={() => setCartOpen(true)}
//               className="text-4xl text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
//             />
//           )

//         }
//         {cartOpen && 
//         <div className="mt-4 sticky top-0">
//           <div className="text-center ">
//             <img src={logo} alt="Logo" className="w-24 h-24 mx-auto" />
//           <span className="font-bold text-xl">Foodie</span>
//           <p className="text-center font-bold">Token Number: 01</p>
//           </div>
//           {
//             cartsItems.length > 0 ? (
//               <div className="mt-6">
//                 <h3 className="text-lg font-bold text-gray-800 mb-2">Your Cart</h3>
//                 <ul>
//                   {cartsItems.map((item, index) => (
//                     <li key={index} className="flex justify-between items-center mb-2">
//                       <span>{item.name}</span>
//                       <span>{item.quantity}</span>
//                       <span>${item.total}</span>
//                     </li>
//                   ))}
//                 </ul>
//                 <div className="mt-4">
//                   <p className="text-lg font-bold text-gray-800">
//                     Total: ${cartsItems.reduce((acc, item) => acc + parseFloat(item.total), 0).toFixed(2)}
//                   </p>
//                 </div>
//                   <button className="bg-green-500 text-white px-4 py-2 rounded w-full hover:bg-green-600" onClick={handlePrint}>
//                     Checkout
//                   </button>
//               </div>
//             ) : (
//               <p className="text-gray-500">Your cart is empty.</p>
//             )
//           }
//         </div>
//         }

//       </div>
//       </div>

//       {/* Order Modal */}
//       <OrderModal
//         isModalOpen={isModalOpen}
//         selectedItem={selectedItem}
//         setQuantity={setQuantity}
//         closeModal={closeModal}
//         quantity={quantity}
//         setCartOpen={setCartOpen}
//         cartItems={cartsItems}
//         setCartItems={setCartItems}
//       />
//     </div>
//   );
// };


import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { OrderModal } from "../../components/OrderModal";
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";
import logo from "../../assets/logo.svg";

export const Menu = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedMealTime, setSelectedMealTime] = useState(null);
  const [cartOpen, setCartOpen] = useState(true);
  const [cartsItems, setCartItems] = useState([]);

  // ===============================
  // 📥 FETCH MEAL TIMES
  // ===============================
  const fetchMealTimes = async () => {
    const res = await fetch("https://resturant-backend-chi.vercel.app/api/time/meal-times");
    if (!res.ok) throw new Error("Failed to fetch meal times");
    return res.json();
  };

  const { data: mealTimes = [] } = useQuery({
    queryKey: ["meal-times"],
    queryFn: fetchMealTimes,
  });

  // ===============================
  // 📥 FETCH MENU ITEMS
  // ===============================
  const fetchMenuItems = async () => {
    const res = await fetch("https://resturant-backend-chi.vercel.app/api/menu/menu-items");
    if (!res.ok) throw new Error("Failed to fetch menu items");
    return res.json();
  };

  const { data: menuItems = [] } = useQuery({
    queryKey: ["menu-items"],
    queryFn: fetchMenuItems,
  });

  // ===============================
  // 🧠 AUTO SELECT CURRENT MEAL
  // ===============================
  useEffect(() => {
    if (!mealTimes.length) return;

    const hour = new Date().getHours();

    const currentMeal = mealTimes.find((meal) => {
      if (meal.start < meal.end) {
        return hour >= meal.start && hour < meal.end;
      }
      return hour >= meal.start || hour < meal.end;
    });

    if (currentMeal) {
      setSelectedMealTime(currentMeal._id); // 👈 ObjectId
    }
  }, [mealTimes]);

  // ===============================
  // MODAL
  // ===============================
  const openModal = (item) => {
    setSelectedItem(item);
    setQuantity(1);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  // ===============================
  // 🖨️ PRINT (same as yours)
  // ===============================
  const handlePrint = () => {
    if (cartsItems.length === 0) return;

    const date = new Date().toLocaleString();

    const kitchenItems = cartsItems.map(item => `
      <div style="display:flex; justify-content:space-between;">
        <span>${item.name}</span>
        <span>x${item.quantity}</span>
      </div>
    `).join("");

    const customerItems = cartsItems.map(item => `
      <div style="display:flex; justify-content:space-between;">
        <span>${item.name} x${item.quantity}</span>
        <span>$${item.total}</span>
      </div>
    `).join("");

    const total = cartsItems
      .reduce((acc, item) => acc + parseFloat(item.total), 0)
      .toFixed(2);

    const win = window.open("", "", "width=300,height=600");

    win.document.write(`
      <body style="width:80mm;font-family:monospace">
        <h3 style="text-align:center">KITCHEN COPY</h3>
        <p>Token: 01</p>
        <p>${date}</p>
        ${kitchenItems}
        <hr/>
        ${customerItems}
        <h4>Total: $${total}</h4>
      </body>
    `);

    win.document.close();

    setTimeout(() => {
      win.print();
      win.close();
      setCartItems([]);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold">🍽 Food Menu</h1>

        {/* 🍽️ MEAL SWITCH */}
        <div className="flex bg-white shadow-xl rounded-full p-1 gap-1">
          {mealTimes.map((meal) => (
            <button
              key={meal._id}
              onClick={() => setSelectedMealTime(meal._id)}
              className={`px-4 py-2 rounded-full ${
                selectedMealTime === meal._id
                  ? "bg-orange-500 text-white"
                  : "text-gray-600"
              }`}
            >
              {meal.name}
            </button>
          ))}
        </div>
      </div>

      {/* TITLE */}
      <h2 className="text-2xl font-bold text-center mb-6">
        {mealTimes.find((m) => m._id === selectedMealTime)?.name} Specials
      </h2>

      <div className="flex gap-6">

        {/* 🍔 MENU GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 flex-1">
          {menuItems
            .filter((item) =>
              item.mealTimes.includes(selectedMealTime)
            )
            .map((item) => (
              <div
                key={item._id}
                onClick={() => openModal(item)}
                className="bg-white p-4 rounded-xl shadow cursor-pointer hover:scale-105"
              >
                {/* 🖼️ IMAGE */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-32 w-full object-cover rounded"
                />

                <h3 className="font-bold mt-2">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.description}</p>

                <p className="text-orange-500 font-bold mt-1">
                  ${item.price}
                </p>
              </div>
            ))}
        </div>

        {/* 🛒 CART (same as yours) */}
        <div className={`bg-white p-4 rounded shadow ${cartOpen ? "w-64" : "w-16"}`}>
          {cartOpen ? (
            <IoIosArrowDropleftCircle onClick={() => setCartOpen(false)} />
          ) : (
            <IoIosArrowDroprightCircle onClick={() => setCartOpen(true)} />
          )}

          {cartOpen && (
            <div>
              <img src={logo} className="w-20 mx-auto" />
              <h3 className="text-center font-bold">Cart</h3>

              {cartsItems.map((item, i) => (
                <div key={i} className="flex justify-between">
                  <span>{item.name}</span>
                  <span>x{item.quantity}</span>
                </div>
              ))}

              <button
                onClick={handlePrint}
                className="bg-green-500 text-white w-full mt-4"
              >
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* MODAL */}
      <OrderModal
        isModalOpen={isModalOpen}
        selectedItem={selectedItem}
        setQuantity={setQuantity}
        closeModal={closeModal}
        quantity={quantity}
        setCartOpen={setCartOpen}
        cartItems={cartsItems}
        setCartItems={setCartItems}
      />
    </div>
  );
};