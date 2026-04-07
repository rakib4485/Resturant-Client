import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [token, setToken] = useState(1);

  const addToCart = (item) => {
    const exist = cart.find(i => i.id === item.id);
    if (exist) {
      setCart(cart.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const clearCart = () => {
    setCart([]);
    setToken(prev => prev + 1);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart, token }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);