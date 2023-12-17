import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { CartContext } from "../contex/Cart";
import { UserContext } from "../contex/User";

export default function Product() {
  let { userToken } = useContext(UserContext);
const Rating=[];
for(let i=0;i<5;i++) Rating.push(i);
  const { AddToCartContext } = useContext(CartContext);
  const { productId } = useParams();

  const getProduct = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/products/${productId}`
    );
    console.log(data)
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
          </div>
        </div>
        <div className="Review">
          {
            data.reviews? data.reviews.map((review,index)=>
            <React.Fragment key={index}>
              <h3 className="comment">{review.comment}</h3>
              <h2 className="rating">{review.rating}</h2>
              <p className="createdAt">{review.createdAt}</p>
              {
                Rating.map((_,index)=>
               
                  
                  index<review.rating? <img src="ss.png" alt="" />
                  :
                  <img src="start.png" alt="" />
                
                
                
                
                )
              }
             


            </React.Fragment>
            
            ):
            <h2>No Reviews Found</h2>
          }
 <img src="ss.png" alt="" />

        </div>
      </div>
    </>
  );
}
