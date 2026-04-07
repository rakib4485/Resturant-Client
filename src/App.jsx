// import { useState } from 'react'

import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes";
import { CartProvider } from "./context/CartContext";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <CartProvider>
        <RouterProvider router={router}></RouterProvider>
      </CartProvider>
    </>
  );
}

export default App;
