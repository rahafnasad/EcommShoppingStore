import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { reviewSchema } from "../validation/validaRegister";
import Input from "../../shared/Input";
import axios from "axios";
import start from "../../../../public/start.png";
import startt from "../../../../public/ss.png";
import { toast } from "react-toastify";
export default function CreateReview() {
  const [error,setError]=useState(false);
  const Rating = [];
  const { productId } = useParams();
  for (let i = 0; i < 5; i++) Rating.push(i);
  const [rating, setRating] = useState(0);
  //const[newRating,setNewRaing]="";
  const initialValues = {
    comment: "",
  };
  const onSubmit = async (users) => {
    let newRating = rating + "";
    users.rating = newRating;
    try{
      const token = localStorage.getItem("userToken");

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/products/${productId}/review`,
        users,
        {
          headers: { Authorization: `Tariq__${token}` },
        }
      );
      console.log(data);
      if ((data.message = "success")) {
        toast.success("Your review has been added successfully", {
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
    }
    catch(error){
      setError(true);
    }
 
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: reviewSchema,
  });

  const inputs = [
    {
      id: "comment",
      type: "comment",
      name: "comment",
      title: "user comment",
      value: formik.values.comment,
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
      <div className="titelee d-flex justify-content-center ">
      <div >
      <span  data-text="create review">create review</span>
     

      </div>

    </div>
      <div className="formCreateRevie formRevHi">
        <form onSubmit={formik.handleSubmit}>
          <p className="pRev">Create Review</p>
          {renderInput}
          <div className="rating d-flex my-5 justify-content-center ">
            {Rating.map((_, index) =>
              index < rating ? (
                <img src={startt} alt=""className="start" />
              ) : (
                <img src={start} alt="" onClick={() => setRating(index + 1)} className="start"/>
              )
            )}{" "}
          </div>

          <button className="revSub" type="submit" disabled={!formik.isValid}>
            Submit
          </button>
          {error&&<p className="text-white mt-2">It has been reviewed before</p>}
        </form>
      </div>

     
     
    </div>
  );
}
