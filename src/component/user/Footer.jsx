import React from "react";
import finalImg from "../../../public/1.png";

export default function Footer() {
  return (
    <>
      
      <div className="finaly d-flex justify-content-center flex-column align-items-center">
        <div className="finalimg ">
          <img src={finalImg} alt="" />
        </div>
      <p>You are welcome at any time</p>
      </div>
    </>
  );
}
