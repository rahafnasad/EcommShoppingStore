import React, { useContext, useState } from "react";
import Input from "../shared/Input.jsx";
import { useFormik } from "formik";
import { registerSchema } from "./validation/validaRegister.js";
import { logInSchema } from "./validation/validaRegister.js";

import { toast } from "react-toastify";
import axios from "axios";
import "./register/register.css";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./contex/User.jsx";

export default function Login() {
  let { setUserToken } = useContext(UserContext);
  let [ifError, setIfError] = useState(false);
  let navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };
  const onSubmit = async (users) => {
    try {
      const { data } = await axios.post(
        "https://ecommerce-node4.vercel.app/auth/signin",
        users
      );
      if ((data.message = "success")) {
        localStorage.setItem("userToken", data.token);
        setUserToken(data.token);

        navigate("/");

        toast.success("Log In succesfully ", {
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
    } catch (error) {
      setIfError(true);
    }
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: logInSchema,
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
    <div className=" myHome">
    <div className="overlay"></div>
    <div className="formCreateRevie formLogH">
    <form onSubmit={formik.handleSubmit}>
              <label htmlFor="chk" aria-hidden="true" className="main-lable mt-0">
                SIGN IN
              </label>

              {renderInput}
              <div className="Tocode">
                {" "}
                <Link to={"/sendCode"} className="text-white mb-2">
                  forgot password
                </Link>
              </div>
              <button
                className="revSub mt-2"
                type="submit"
                id="submit"
                disabled={!formik.isValid}
              >
                Register
              </button>
              {ifError&&<p className="IsError">The password or email you’ve entered is incorrect.</p>}

            </form>
    </div>

   
  </div>
  );
}
