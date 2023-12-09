import React from "react";
import finalImg from "../../../public/1.png";

export default function Footer() {
  return (
    <>
      <div className="Container">
        <div className="overlay overlay-Footer"></div>

        <div className="des row  ">
          <div className="col-lg-4 pb-5">
            <div className="company-info ms-5">
              <span>company information</span>
              <ul>
                <li className="mt-2">
                  <a href="#"> About Rahaf Store</a>
                </li>
                <li className="mt-2">
                  <a href="#"> Contact us</a>
                </li>
                <li className="mt-2">
                  <a href="#"> Be our member</a>
                </li>
                <li className="mt-2">
                  <a href="#"> Fashion look</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-4 pb-5">
            <div className="company-info ms-5">
              <span>Center & Help</span>
              <ul>
                <li className="mt-2">
                  <a href="#"> How to order</a>
                </li>
                <li className="mt-2">
                  <a href="#"> Shipping information</a>
                </li>
                <li className="mt-2">
                  <a href="#"> Recalled products</a>
                </li>
                <li className="mt-2">
                  <a href="#"> Refund</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-4 pb-5">
            <div className="company-info ms-5">
              <span>Customer service</span>
              <ul>
                <li className="mt-2">
                  <a href="#"> payment method</a>
                </li>
                <li className="mt-2">
                  <a href="#"> Paiement when recieving</a>
                </li>
                <li className="mt-2">
                  <a href="#"> Gift card</a>
                </li>
                <li className="mt-2">
                  <a href="#">points earning program</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="home">
          <div className="bg"></div>
          <div className="bg"></div>
          <div className="bg"></div>
          <div className="bg"></div>
          <div className="bg"></div>
        </div>
      </div>
      <div className="finaly d-flex justify-content-center flex-column align-items-center">
        <div className="finalimg ">
          <img src={finalImg} alt="" />
        </div>
        <div className="icons">
          <a href="#">
            {" "}
            <img src="facebook.png" alt="" />
          </a>
          <a href="#">
            {" "}
            <img src="instagram.png" alt="" />
          </a>
          <a href="#">
            {" "}
            <img src="twitter.png" alt="" />
          </a>
          <a href="#">
            {" "}
            <img src="google.png" alt="" />
          </a>
        </div>
      </div>
    </>
  );
}
