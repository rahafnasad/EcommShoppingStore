import React, { useState } from "react";
import "./forgot.css";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Input from "../../shared/Input";
import { ForgotSchema } from "../validation/validaRegister";

export default function ForgotePasswors() {
  const navigate = useNavigate();
  const initialValues = {
    email: "",
  };
  const [error,setError]=useState(null);

  const onSubmit = async (users) => {
 try{
  const email = users.email;
  const password = users.password;
  const code = users.code;
  console.log(code);
  const { data } = await axios.patch(
    `${import.meta.env.VITE_API_URL}/auth/forgotPassword`,
    users
  );

  console.log(data);
  if ((data.message = "success")) {
    toast.success("The password has been updated successfully", {
      position: "top-right",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigate("/login");
  }
 }
 catch(error){
  console.log(error);
  setError("This code is wrong");
 }
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: ForgotSchema,
  });
  const inputs = [
    {
      id: "email",
      type: "email",
      name: "email",
      title: "user email",
      value: formik.values.email,
    },
    {
      id: "password",
      type: "password",
      name: "password",
      title: "user password",
      value: formik.values.password,
    },
    {
      id: "code",
      type: "code",
      name: "code",
      title: "user code",
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
  return (
    <div className="container">
      <form className="formCode" onSubmit={formik.handleSubmit}>
        <p>Please enter the code to verify it and change the password</p>
        {renderInput}

        <button className="button-sub" type="submit" disabled={!formik.isValid}>
          Submit
        </button>
        {error&& <p className="text-danger">{error}</p>}
      </form>
    </div>
  );
}
