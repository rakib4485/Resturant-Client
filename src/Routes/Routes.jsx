import { createBrowserRouter } from "react-router-dom";
import { Home } from "../Pages/Home/Home";
import { Main } from "../layouts/Main/Main";
import { Dashboard } from "../Pages/Dashboard/Dashboard";
import { Menu } from "../Pages/Menu/Menu";
import { POS } from "../Pages/POS/POS";
import AddMenuItem from "../Pages/AddMenuItem/AddmenuItem";
import Products from "../Pages/Dashboard/Products/Products";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/dashboard",
                element: <Dashboard/>
            },
            {
                path: "/menu",
                element: <Menu/>
            },
            {
                path: "/orders",
                element: <AddMenuItem/>
            },
            {
                path: "/profile",
                element: <Products/>
            }
            
        ]     
    }
]);