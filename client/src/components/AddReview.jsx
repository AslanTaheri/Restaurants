import React, { useState } from "react";
import MyRestaurants from "../apis/MyRestaurants";
import { useParams } from "react-router-dom";

// the add review part is still a work in peogress.
const AddReview = () => {
  const { id } = useParams();

  // constrolled form data
  const [name, setName] = useState("");
  const [rating, setRating] = useState("Rating");
  const [reviewText, setReviewText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await MyRestaurants.post(`/${id}/addReview`, {
        restaurant_id: id,
        name,
        rating,
        review: reviewText,
      });
    } catch (err) {
      console.log(err);
    }
    setName("");
    setRating("Rating");
    setReviewText("");
  };

  return (
    // I am using Bootstrap. I will write my own css in the next phase of the development.
    <div className="mb-3">
      <form action="">
        <div className="row">
          <div className="form-group col-8">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="col-4">
            <label htmlFor="rating" className="form-label">
              Rating:
            </label>
            <select
              id="rating"
              className="form-select"
              value={rating}
              onChange={(e) => setRating(e.target.value)}>
              <option disabled>Rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="review" className="form-label">
            Review:
          </label>
          <textarea
            id="review"
            className="form-control"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}></textarea>
        </div>
        <button className="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddReview;
