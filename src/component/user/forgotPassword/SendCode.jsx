import React from "react";
import "./forgot.css";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function SendCode() {
    const navigate=useNavigate();
  const initialValues = {
    email: "",
  };
  const onSubmit = async (users) => {
    const email=users.email;
    const {data}=await axios.patch(`${import.meta.env.VITE_API_URL}/auth/sendcode`,{email});
    if ((data.message = "success")) {
      
        toast('Please check your email to get the code', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
        navigate('/forgotPass');

      }


};
  const formik = useFormik({
    initialValues,
    onSubmit,
  });
  return (
    <div className=" myHome">
    <div className="overlay"></div>
    <div className="titelee d-flex justify-content-center ">
      <div >
      <span  data-text="forgot  password">forgot  password</span>
     

      </div>

    </div>
    <div className="formCreateRevie formLogH">
    <form  onSubmit={formik.handleSubmit}>
<p className="text-white">Please, enter your email so you can retrieve your password</p>
<input
  type="email"
  name="email"
  placeholder="Email"
  className="main-input"
  value={formik.values.email}
  onChange={formik.handleChange}

/>
<button className="revSub" type="submit" disabled={!formik.isValid}>
  Submit
</button>
</form>
    </div>

   
  </div>
  );
}
