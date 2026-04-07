import React from "react";
import { useCart } from "../context/CartContext";

export const Cart = ({ setPrintOrder }) => {
  const { cart, clearCart, token } = useCart();

  const total = cart.reduce((sum, i) => sum + i.price*i.quantity, 0);

  const handleOrder = () => {
    if(cart.length === 0) return;
    setPrintOrder({ cart, token });
    clearCart();
  };

  return (
    <div className="w-96 bg-white shadow-lg p-6 fixed right-0 top-0 h-full overflow-auto">
      <h2 className="text-xl font-bold mb-4">Cart</h2>
      <p className="mb-4">Token: {token}</p>

      {cart.map(i => (
        <div key={i.id} className="flex justify-between mb-2">
          <span>{i.name} x {i.quantity}</span>
          <span>${(i.price*i.quantity).toFixed(2)}</span>
        </div>
      ))}

      <hr className="my-4" />

      <div className="font-bold mb-4">Total: ${total.toFixed(2)}</div>

      <button
        onClick={handleOrder}
        className="bg-green-500 text-white w-full py-2 rounded"
      >
        Place Order
      </button>
    </div>
  );
};