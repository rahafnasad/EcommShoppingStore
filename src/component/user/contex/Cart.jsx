import axios from "axios";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext(null);
export function CartContextProvider({ children }) {
  const[total,setTotal]=useState(0);
 let [count,setCount]=useState(0);
 

  const AddToCartContext = async (productId) => {
    try {
      const token = localStorage.getItem("userToken");

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/cart`,
        { productId },
        { headers: { Authorization: `Tariq__${token}` } }
      );
      if ((data.message = "success")) {
        toast.success(
          "acount created succesfully , plz verify your email to login",
          {
            position: "top-right",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          }
        );
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const getItemsContext = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
        headers: { Authorization: `Tariq__${token}` },
      });
      setCount(data.count);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const removeItemsContsext = async (productId) => {
    try {
      const token = localStorage.getItem("userToken");

      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/cart/removeItem`,
        { productId },
        { headers: { Authorization: `Tariq__${token}` } }
      );
      if ((data.message = "success")) {
        toast.success("Product deleted succesfully", {
          position: "top-right",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  };
 
  return (
    <CartContext.Provider
      value={{
       count,
        AddToCartContext,
        getItemsContext,
        removeItemsContsext,
        setCount,
        total,
        setTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
