import React, { useContext, useEffect } from "react";
import "./order.css";
import { CartContext } from "../contex/Cart";
import { useQuery } from "react-query";
import { useFormik } from "formik";
import { orderSchema } from "../validation/validaRegister";
import Input from "../../shared/Input";
import axios from "axios";
import { toast } from "react-toastify";

export default function CreateOrder() {

  const initialValues = {
    couponName:'',
    address:'',
    phone:''

    };
    const onSubmit = async (users) => {
  try {
    const token = localStorage.getItem("userToken");

    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/order`,users,
      { headers: { Authorization: `Tariq__${token}` } }
    );
    if ((data.message = "success")) {

      toast.success("The order was installed successfully", {
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
  }
  catch(error){
    console.log(error);
  }

    };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: orderSchema,
  });
  const {getItemsContext}=useContext(CartContext);

  const showOrder = async () => {
    const res = getItemsContext();
    return res;
  };
  const { data, isLoading } = useQuery("showOrder", showOrder);
  const inputs = [
    {
      id: "couponName",
      type: "couponName",
      name: "couponName",
      title: "user couponName",
      value: formik.values.couponName,
    },
    {
      id: "address",
      type: "address",
      name: "address",
      title: "user address",
      value: formik.values.address,
    },
    {
      id: "phone",
      type: "phone",
      name: "phone",
      title: "user phone",
    },
  ];
  const renderInput = inputs.map((input, index) => (
    <Input
      type={input.type}
      id={input.id}
      name={input.name}
      title={input.title}
      value={input.value}
      key={index}
      errors={formik.errors}
      onChange={formik.handleChange}
      style={input.style}
      onBlur={formik.handleBlur}
      touched={formik.touched}
    />
  ));
  if(isLoading){
    return <div className="spinner-border" role="status">
    <span className="sr-only">Loading...</span>
  </div>
  }
  return (
    <div className="container">
      <div className="titelee d-flex justify-content-center ">
        <div>
          <span className="text-uppercase border-bottom pe-2 pb-1 CompleteOrder">
            Complete The Order
          </span>
        </div>      </div>

        <div className="row">
          {data?.products ? (
            data.products.map((product) => 
            <div className="col-lg-2 ">
             <div className="myOrderProduct my-5">
             <div className="myOrderImg">
              <img src={product.details.mainImage.secure_url}/>


              </div>
              <div className="myOrderQuant">
              <span>{product.quantity}</span>

              </div>
             </div>

            </div>
            
            )
          ) : (
            <h2>No Product In Cart</h2>
          )}
        </div>
      <div className="formOrd">
      <form className="formOrder" onSubmit={formik.handleSubmit}>
        {renderInput}

        <button  type="submit"  className="submitOrder"disabled={!formik.isValid}>
          order to install
        </button>
      </form>
      </div>

    </div>
  );
}
