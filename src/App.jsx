import React, { useContext, useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import CategoriesDash from "./component/dashbord/Categories.jsx";
import HomeDash from "./component/dashbord/Home.jsx";
import Categories from "./component/user/categor/Categories.jsx";
import Home from "./component/user/home/Home.jsx";
import LayoutDash from "./layouts/LayoutDash.jsx";
import LayoutUser from "./layouts/LayoutUser.jsx";
import Register from "./component/user/register/Register.jsx";
import Login from "./component/user/Login.jsx";
import { jwtDecode } from "jwt-decode";
import CategoryDetails from "./component/user/categor/CategoryDetails.jsx";
import Product from "./component/user/categor/Product.jsx";
import {
  CartContext,
  CartContextProvider,
} from "./component/user/contex/Cart.jsx";
import Cart from "./component/user/cart/Cart.jsx";
import SendCode from "./component/user/forgotPassword/SendCode.jsx";
import ForgotePasswors from "./component/user/forgotPassword/ForgotePasswors.jsx";
import Profile from "./component/user/Profile/Profile.jsx";
import UserContextProvider, {
  UserContext,
} from "./component/user/contex/User.jsx";
import ProtectedRoute from "./component/user/ProtectedRoute/ProtectedRoute.jsx";
import Autho from "./component/user/ProtectedRoute/Autho.jsx";

export default function App() {
  let { setUserToken } = useContext(UserContext);
  let { getItemsContext, setCount } = useContext(CartContext);

  useEffect(() => {
    if (localStorage.getItem("userToken") != null) {
      setUserToken(localStorage.getItem("userToken"));
      setCount(getItemsContext.count);
    }
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LayoutUser />,
      errorElement: <h2> 404 bage not found -- user</h2>,

      children: [
        {
          index: "true",
          element: <Home />,
        },
        {
          path: "categories",
          element: <Categories />,
        },
        {
          path: "forgotPass",
          element: <ForgotePasswors />,
        },
        {
          path: "sendCode",
          element: <SendCode />,
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "regiseter",
          element: <Register />,
        },
        {
          path: "products/category/:categoryId",
          element: <CategoryDetails />,
        },
        {
          path: "product/:productId",
          element: <Product />,
        },
        {
          path: "*",
          element: <h2> bage not fount -- web (user)</h2>,
        },
      ],
    },
    {
      path: "/dashboard",
      element: <LayoutDash />,
      errorElement: <h2> 404 bage not found -- dashbord</h2>,
      children: [
        {
          path: "home",
          element: <HomeDash />,
        },

        {
          path: "categories",
          element: <CategoriesDash />,
        },
        {
          path: "*",
          element: <h2> bage not fount -- Dashbord (Admain)</h2>,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
