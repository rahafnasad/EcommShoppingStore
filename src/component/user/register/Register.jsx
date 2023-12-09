import React from "react";
import Input from "../../shared/Input.jsx";
import { useFormik } from "formik";
import { registerSchema } from "../validation/validaRegister.js";
import { toast } from "react-toastify";
import axios from "axios";
import "./register.css";

export default function Register() {
  const initialValues = {
    userName: "",
    email: "",
    password: "",
  };
  const onSubmit = async (users) => {
    const formData = new FormData();
    formData.append("userName", users.userName);
    formData.append("email", users.email);
    formData.append("password", users.password);
    formData.append("image", users.image);
    const { data } = await axios.post(
      "https://ecommerce-node4.vercel.app/auth/signup",
      formData
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
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: registerSchema,
  });
  const handleFieldChange = (event) => {
    formik.setFieldValue("image", event.target.files[0]);
  };

  const inputs = [
    {
      id: "username",
      type: "text",
      name: "userName",
      title: "user name",
      value: formik.values.userName,
    },
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
      id: "image",
      type: "file",
      name: "image",
      title: "user image",
      onChange: handleFieldChange,
      style: "w-245",
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
      onChange={input.onChange || formik.handleChange}
      style={input.style}
      onBlur={formik.handleBlur}
      touched={formik.touched}
    />
  ));
  return (
    <>
    <div className="Reg-form">

    <div className="main  ">
      <input type="checkbox"  id="chk" aria-hidden="true" />
        <div className="sign-up">
          <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
          <label htmlFor="chk" aria-hidden="true" className="main-lable" >SIGN UP</label>

            {renderInput}
            <button
                    className="button-sub"

              type="submit"
              id="submit"
              disabled={!formik.isValid}
            >
              Register
            </button>
          </form>
        </div>
        <div className="log-in">
          <label htmlFor="chk" aria-hidden="true" className="main-lable" >Welcome to you </label>
          <div className="details">
            <p>Welcome, we have all your needs with the best materials, prices and quality</p>

          </div>

        </div>
      </div>

    </div>

    
    </>
  );
}
