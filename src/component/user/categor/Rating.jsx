import React from "react";
import start from "../../../../public/start.png";
import startt from "../../../../public/ss.png";
export default function Rating({ RatingNumb }) {
  const Rating = [];
  for (let i = 0; i < 5; i++) Rating.push(i);
  return (
    <div className="rating d-flex">
      {Rating.map((_, index) =>
        index < Math.round(RatingNumb) ? (
          <img src={startt} alt="" />
        ) : (
          <img src={start} alt="" />
        )
      )}
    </div>
  );
}
