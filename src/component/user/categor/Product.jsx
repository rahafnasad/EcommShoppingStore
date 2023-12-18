import axios from "axios";
import React, { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { CartContext } from "../contex/Cart";
import { UserContext } from "../contex/User";
import start from "../../../../public/start.png";
import startt from "../../../../public/ss.png";
import Rating from "./Rating";

export default function Product() {
  let { userToken } = useContext(UserContext);
  // const Rating = [];
  //for (let i = 0; i < 5; i++) Rating.push(i);
  const { AddToCartContext } = useContext(CartContext);
  const { productId } = useParams();

  const getProduct = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/products/${productId}`
    );
    console.log(data.product);
    return data.product;
  };
  const { data, isLoading } = useQuery("productt", getProduct);
  const AddToCart = async (productId) => {
    const res = await AddToCartContext(productId);
  };
  if (isLoading) {
    return (
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <>
      <div className="container ">
        <div className="row">
          <div className="col-lg-4 ">
            <div
              id="carouselExampleIndicators"
              className="carousel slide mt-5"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                {data.subImages.map((image) => (
                  <div className="carousel-item active" key={image._id}>
                    <img src={image.secure_url} alt="" />
                  </div>
                ))}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
          <div className="col-lg-8 detalis mt-5">
            <h1 className="mt-5 mb-4 ms-4 mt-5">
              <span>Name : </span> {data.name}
            </h1>
            <h2 className="mb-4 ms-4">
              {" "}
              <span> price : </span>
              {data.finalPrice}
            </h2>
            <p className="mb-4 ms-4">
              <span>description : </span>
              {data.description}
            </p>
            {userToken && (
              <button onClick={() => AddToCart(data._id)}>Add To Cart</button>
            )}
            <Link to={`/crete/reviews/${data.id}`}>
              {" "}
              <button>Create Review</button>
            </Link>
          </div>
        </div>
        <div className="Reviews row">
          <div className="col-lg-4"></div>
          <div className="col-lg-8 my-5">
            {data.reviews ? (
              data.reviews.map((review, index) => (
                <div className="review " key={index}>
                 
                 <div className="d-flex mb-3">
                 <img src={review.createdBy.image.secure_url} alt="" className="userImg"/>
                 <div className="">
                 <h2 >{review.createdBy.userName}</h2>
                 <p className="createdAt">{review.createdAt}</p>

                 </div>
                 </div>

<div className="ms-5">                    <Rating RatingNumb={review.rating} />
</div>
                    <h3 className="comment ms-5">{review.comment}</h3>
                </div>
              ))
            ) : (
              <h2>No Reviews Found</h2>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
