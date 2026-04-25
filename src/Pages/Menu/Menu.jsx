import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { OrderModal } from "../../components/OrderModal";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import { useMutation } from "@tanstack/react-query";
import logo from "../../assets/logo.svg";
import { FaTrash } from "react-icons/fa";
import { authHeader } from "../../utils/API";

export const Menu = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedMealTime, setSelectedMealTime] = useState(null);
  const [cartOpen, setCartOpen] = useState(true);
  const [cartsItems, setCartItems] = useState([]);
  const [token, setToken] = useState(0);

  // ===============================
  // 📥 FETCH MEAL TIMES
  // ===============================
  const fetchMealTimes = async () => {
    const res = await fetch("https://resturant-backend-chi.vercel.app/api/time/meal-times", {
      headers: authHeader(),
    });
    if (!res.ok) throw new Error("Failed to fetch meal times");
    return res.json();
  };

  const { data: mealTimes = [] } = useQuery({
    queryKey: ["meal-times"],
    queryFn: fetchMealTimes,
  });

  //carts
  const handleRemoveFromCart = (index) => {
    const updatedCart = cartsItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
  };

  // ===============================
  // 📥 FETCH MENU ITEMS
  // ===============================
  const fetchMenuItems = async () => {
    const res = await fetch("https://resturant-backend-chi.vercel.app/api/menu/menu-items", {
      headers: authHeader(),
    });
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

  // =============================
  // Order Items
  // =============================
  const createOrderMutation = useMutation({
    mutationFn: async (orderData) => {
      console.log("Creating order with data:", orderData);
      const res = await fetch("https://resturant-backend-chi.vercel.app/api/orders/create", {
        method: "POST",
        headers: authHeader(),
        body: JSON.stringify(orderData),
      });

      if (!res.ok) throw new Error("Order failed");

      return res.json();
    },

    onSuccess: (data) => {
      alert(`✅ Order confirmed! Token: ${data.token}`);
      console.log("Order response data:", data);
      setToken(data.token); // Set the token from response
      console.log("Token set to:", token);
      // ✅ DB success হলে print
      handlePrint();

      // clear cart
      setCartItems([]);
    },

    onError: (err) => {
      alert("❌ Order failed: " + err.message);
    },
  });

  const handleCheckout = () => {
    if (cartsItems.length === 0) return;

    const orderPayload = {
      items: cartsItems.map((item) => ({
        productId: item.productId, // 🔥 important
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        total: item.total,
      })),
      totalAmount: cartsItems.reduce(
        (acc, item) => acc + parseFloat(item.total),
        0,
      ),
    };

    createOrderMutation.mutate(orderPayload);
  };

  // ==============================
  // 🧠 Token Calculation
  // ===============================
  const fetchTodayLastOrder = async () => {
    const res = await fetch("https://resturant-backend-chi.vercel.app/api/orders/today-last", {
      headers: authHeader(),
    });
    if (!res.ok) throw new Error("Failed to fetch last order");
    return res.json();
  };

  const { data: lastOrderToday } = useQuery({
    queryKey: ["today-last-order"],
    queryFn: fetchTodayLastOrder,
  });

  const getNextToken = () => {
    if (!lastOrderToday?.token) return 1;
    return lastOrderToday.token + 1;
  };

  // ===============================
  // 🖨️ PRINT (same as yours)
  // ===============================

  const handlePrint = () => {
    if (cartsItems.length === 0) return;

    const date = new Date().toLocaleString();

    const kitchenItems = cartsItems
      .map(
        (item) => `
     <div style="display:flex; justify-content:space-between;">
       <span>${item.name}</span>
       <span>x${item.quantity}</span>
     </div>
   `,
      )
      .join("");

    const customerItems = cartsItems
      .map(
        (item) => `
     <div style="display:flex; justify-content:space-between;">
       <span style="font-weight: bold; width: 60%;">${item.name} x${item.quantity}</span>
       <span>৳ ${item.total}</span>
     </div>
   `,
      )
      .join("");

    const total = cartsItems
      .reduce((acc, item) => acc + parseFloat(item.total), 0)
      .toFixed(2);

    const printContent = `
 <html>
 <head>
   <style>
     body { width: 80mm; font-family: monospace; padding: 10px; }
     .center { text-align: center; }
     .line { border-top: 1px dashed #000; margin: 8px 0; }
     .bold { font-weight: bold; }
     .cut { margin: 20px 0; border-top: 2px dashed #000; }
     img { display: block; margin: 0 auto; }
   </style>
 </head>
 <body>

   <div class="center">
     <h3>KITCHEN COPY</h3>
     <p>Token: ${token}</p>
     <p>${date}</p>
   </div>

   <div class="line"></div>
   ${kitchenItems}
   <div class="line"></div>

   <div class="center bold">Prepare Order</div>

   <div class="cut"></div>

   <div class="center">
     <img src="logo.png" width="80" />
     <p><b>Foodie</b></p>
     <p>Customer Copy</p>
     <p>Token: ${token}</p>
     <p>${date}</p>
   </div>

   <div class="line"></div>
   ${customerItems}
   <div class="line"></div>

   <div class="bold" style="display:flex; justify-content:space-between;">
     <span>Total</span>
     <span>$${total}</span>
   </div>

   <div class="line"></div>

   <div class="center">Thank You ❤️</div>

 </body>
 </html>
 `;

    const win = window.open("", "", "width=300,height=600");

    win.document.write(printContent);
    win.document.close();

    setTimeout(() => {
      win.print();
      win.close();
      setCartItems([]);
    }, 300);
  };

  return (
    // <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white p-6">
    //   {/* HEADER */}
    //   <div className="flex flex-col md:flex-row md:justify-between items-center gap-6 mb-8">
    //     <h1 className="text-4xl font-extrabold">🍽 Food Menu</h1>

    //     {/* 🍽️ MEAL SWITCH */}
    //     <div className="flex bg-white shadow-xl rounded-full p-1 gap-1">
    //       {mealTimes.map((meal) => (
    //         <button
    //           key={meal._id}
    //           onClick={() => setSelectedMealTime(meal._id)}
    //           className={`px-4 py-2 rounded-full ${
    //             selectedMealTime === meal._id
    //               ? "bg-orange-500 text-white"
    //               : "text-gray-600"
    //           }`}
    //         >
    //           {meal.name}
    //         </button>
    //       ))}
    //     </div>
    //   </div>

    //   {/* TITLE */}
    //   <h2 className="text-2xl font-bold text-center mb-6">
    //     {mealTimes.find((m) => m._id === selectedMealTime)?.name} Specials
    //   </h2>

    //   <div className="flex gap-6">
    //     {/* 🍔 MENU GRID */}
    //     <div className="grid grid-cols-2 md:grid-cols-4 gap-6 flex-1">
    //       {menuItems
    //         .filter((item) => item.mealTimes.includes(selectedMealTime))
    //         .map((item) => (
    //           <div
    //             key={item._id}
    //             onClick={() => openModal(item)}
    //             className="bg-white p-4 rounded-xl shadow cursor-pointer hover:scale-105 h-[250px] flex flex-col"
    //           >
    //             {/* 🖼️ IMAGE */}
    //             <img
    //               src={item.image}
    //               alt={item.name}
    //               className="h-32 w-full object-cover rounded"
    //             />

    //             <h3 className="font-bold mt-2">{item.name}</h3>
    //             <p className="text-sm text-gray-500">{item.description}</p>

    //             <p className="text-orange-500 font-bold mt-1">৳ {item.price}</p>
    //           </div>
    //         ))}
    //     </div>

    //     {/* 🛒 CART  */}
    //     <div
    //       className={`bg-white p-4 rounded shadow ${cartOpen ? "w-64" : "w-16"}`}
    //     >
    //       {cartOpen ? (
    //         <IoIosArrowDropleftCircle onClick={() => setCartOpen(false)} />
    //       ) : (
    //         <IoIosArrowDroprightCircle onClick={() => setCartOpen(true)} />
    //       )}
    //       {/* CART CONTENT */}
    //       {cartOpen && (
    //         <div className="mt-4 sticky top-0">
    //           <div className="text-center ">
    //             <img src={logo} alt="Logo" className="w-24 h-24 mx-auto" />
    //             <span className="font-bold text-xl">Foodie</span>
    //             <p className="text-center font-bold">
    //               Token Number: {getNextToken()}
    //             </p>
    //           </div>
    //           {cartsItems.length > 0 ? (
    //             <div className="mt-6">
    //               <h3 className="text-lg font-bold text-gray-800 mb-2">
    //                 Your Cart
    //               </h3>
    //               <ul>
    //                 {cartsItems.map((item, index) => (
    //                   <li
    //                     key={index}
    //                     className="flex justify-between items-center mb-2 border-b pb-1"
    //                   >
    //                     <div className="flex flex-col">
    //                       <span className="font-medium">{item.name}</span>
    //                       <span className="text-xs text-gray-500">
    //                         x{item.quantity}
    //                       </span>
    //                     </div>

    //                     <span className="font-semibold">৳ {item.total}</span>

    //                     {/* 🗑️ DELETE BUTTON */}
    //                     <button
    //                       onClick={() => handleRemoveFromCart(index)}
    //                       className="text-red-500 hover:text-red-700 ml-2"
    //                     >
    //                       <FaTrash />
    //                     </button>
    //                   </li>
    //                 ))}
    //               </ul>
    //               <div className="mt-4">
    //                 <p className="text-lg font-bold text-gray-800">
    //                   Total: ৳{" "}
    //                   {cartsItems
    //                     .reduce((acc, item) => acc + parseFloat(item.total), 0)
    //                     .toFixed(2)}
    //                 </p>
    //               </div>
    //               <button
    //                 className="bg-green-500 text-white px-4 py-2 rounded w-full hover:bg-green-600"
    //                 onClick={handleCheckout}
    //               >
    //                 Checkout
    //               </button>
    //             </div>
    //           ) : (
    //             <p className="text-gray-500">Your cart is empty.</p>
    //           )}
    //         </div>
    //       )}
    //     </div>
    //   </div>

    //   {/* MODAL */}
    //   <OrderModal
    //     isModalOpen={isModalOpen}
    //     selectedItem={selectedItem}
    //     setQuantity={setQuantity}
    //     closeModal={closeModal}
    //     quantity={quantity}
    //     setCartOpen={setCartOpen}
    //     cartItems={cartsItems}
    //     setCartItems={setCartItems}
    //   />
    // </div>
<div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 p-4 md:p-6 pb-24">

  {/* HEADER */}
  <div className="flex flex-col md:flex-row md:justify-between items-center gap-4 mb-6">
    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
      🍽 Food Menu
    </h1>

    {/* MEAL SWITCH */}
    <div className="flex flex-wrap justify-center bg-white shadow-md rounded-full p-1 gap-1">
      {mealTimes.map((meal) => (
        <button
          key={meal._id}
          onClick={() => setSelectedMealTime(meal._id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all
          ${
            selectedMealTime === meal._id
              ? "bg-orange-500 text-white shadow"
              : "text-gray-600 hover:bg-orange-100"
          }`}
        >
          {meal.name}
        </button>
      ))}
    </div>
  </div>

  {/* TITLE */}
  <h2 className="text-xl md:text-2xl font-bold text-center mb-6 text-gray-700">
    {mealTimes.find((m) => m._id === selectedMealTime)?.name} Specials
  </h2>

  {/* MAIN */}
  <div className="flex flex-col lg:flex-row gap-6">

    {/* MENU GRID */}
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 flex-1">
      {menuItems
        .filter((item) => item.mealTimes.includes(selectedMealTime))
        .map((item) => (
          <div
            key={item._id}
            onClick={() => openModal(item)}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 cursor-pointer overflow-hidden group"
          >
            <div className="h-32 overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition"
              />
            </div>

            <div className="p-3">
              <h3 className="font-bold text-gray-800">{item.name}</h3>
              <p className="text-xs text-gray-500 line-clamp-2">
                {item.description}
              </p>

              <p className="text-orange-500 font-bold mt-2">
                ৳ {item.price}
              </p>
            </div>
          </div>
        ))}
    </div>

    {/* CART */}
    <div
      className={`
        bg-white/90 backdrop-blur-md border rounded-2xl shadow-xl shadow-orange-200
        transition-all duration-300
        
        ${cartOpen ? "w-[90%] sm:w-72" : "w-14"}
        
        fixed bottom-20 right-4 z-50   /* MOBILE FIX */
        lg:sticky lg:top-4 lg:bottom-auto lg:right-auto
      `}
    >
      {/* TOGGLE */}
      <div className="flex justify-end p-2">
        {cartOpen ? (
          <IoIosArrowDropleftCircle
            onClick={() => setCartOpen(false)}
            className="text-3xl text-gray-400 cursor-pointer hover:text-gray-700"
          />
        ) : (
          <IoIosArrowDroprightCircle
            onClick={() => setCartOpen(true)}
            className="text-3xl text-gray-400 cursor-pointer hover:text-gray-700"
          />
        )}
      </div>

      {/* CART CONTENT */}
      {cartOpen && (
        <div className="px-4 pb-4">

          {/* HEADER */}
          <div className="text-center border-b pb-3">
            <img src={logo} className="w-16 mx-auto mb-1" />
            <h3 className="font-bold text-lg text-gray-800">Foodie</h3>

            <p className="text-sm font-semibold text-orange-500 mt-1">
              Token #{getNextToken()}
            </p>
          </div>

          {cartsItems.length > 0 ? (
            <>
              {/* ITEMS */}
              <div className="mt-4 max-h-64 overflow-y-auto pr-1">
                {cartsItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center border-b py-2"
                  >
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <span className="text-xs text-gray-500">
                        x{item.quantity}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold">
                        ৳ {item.total}
                      </span>

                      <button
                        onClick={() => handleRemoveFromCart(index)}
                        className="text-red-400 hover:text-red-600"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* TOTAL */}
              <div className="mt-4 border-t pt-3">
                <p className="flex justify-between font-bold text-gray-800">
                  <span>Total</span>
                  <span>
                    ৳{" "}
                    {cartsItems
                      .reduce((acc, item) => acc + parseFloat(item.total), 0)
                      .toFixed(2)}
                  </span>
                </p>
              </div>

              {/* CHECKOUT */}
              <button
                onClick={handleCheckout}
                className="mt-4 w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2 rounded-lg font-semibold hover:scale-105 transition"
              >
                Checkout
              </button>
            </>
          ) : (
            <p className="text-gray-400 text-center mt-6 text-sm">
              🛒 Cart is empty
            </p>
          )}
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
