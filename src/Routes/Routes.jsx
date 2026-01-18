import { createBrowserRouter } from "react-router-dom";
import { Home } from "../Pages/Home/Home";
import { Main } from "../layouts/Main/Main";
import { Dashboard } from "../Pages/Dashboard/Dashboard";
import { Menu } from "../Pages/Menu/Menu";

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
        ]     
    }
]);