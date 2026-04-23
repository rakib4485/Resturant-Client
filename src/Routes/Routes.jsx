import { createBrowserRouter } from "react-router-dom";
import { Home } from "../Pages/Home/Home";
import { Main } from "../layouts/Main/Main";
import { Dashboard } from "../Pages/Dashboard/Dashboard";
import { Menu } from "../Pages/Menu/Menu";
import { POS } from "../Pages/POS/POS";
import AddMenuItem from "../Pages/AddMenuItem/AddmenuItem";
import Products from "../Pages/Dashboard/Products/Products";
import { AdminLayout } from "../layouts/AdminLayout/AdminLayout";
import { AdminDashboard } from "../Pages/Dashboard/AdminDashboard/AdminDashboard";
import { TodayOrders } from "../Pages/Orders/TodayOrders";
import { AdminSettings } from "../Pages/Dashboard/AdminSettings/AdminSettings";
import { AuthLayout } from "../layouts/AuthLayout/AuthLayout";
import { Login } from "../Pages/AuthPage/Login";
import { Register } from "../Pages/AuthPage/Register";

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
                element: <TodayOrders />
            },
            {
                path: "/profile",
                element: <Products/>
            }
            
        ]     
    },
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          {
            path: "/admin",
            element: <AdminDashboard />
          },
          {
            path: "/admin/products",
            element: <Products />
          },
          {
            path: "/admin/add-product",
            element: <AddMenuItem />
          },
          {
            path: "/admin/settings",
            element: <AdminSettings />
          }


        ]

    },
    {
        path: "/auth",
        element: <AuthLayout />,
        children: [
            {
                path: "/auth/login",
                element: <Login />
            },
            {
                path: "/auth/register",
                element: <Register />
            }
        ]

    },
    {
        path: "*",
        element: <div className="min-h-screen flex items-center justify-center">
          <h1 className="text-4xl font-bold text-gray-800">404 - Page Not Found</h1>
        </div> 
    }
]);