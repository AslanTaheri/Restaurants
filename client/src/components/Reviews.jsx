import React from "react";
import StarRating from "./StarRating";

const Reviews = (props) => {
  const reviews = props.reviews.map((review) => {
    return (
      <div
        className="card text-bg-primary m-3 "
        style={{ maxWidth: "30%" }}
        key={review.id}>
        <div className="card-header d-flex justify-content-between">
          <span>{review.name}</span>
          <span>
            <StarRating rating={review.rating} />
          </span>
        </div>

        <div className="card-body">
          <p className="card-text">{review.review}</p>
        </div>
      </div>
    );
  });
  return <div className="row ">{reviews}</div>;
};

export default Reviews;
