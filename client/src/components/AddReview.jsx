import { useState } from "react";
import MyRestaurants from "../apis/MyRestaurants";
import { useParams, useNavigate } from "react-router-dom";

// the add review part is still a work in peogress.
const AddReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // const history = useHistory();
  // const location = useLocation();
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
      // history.push("/");
      // history.push(location.pathname);
    } catch (err) {
      console.log(err);
    }
    setName("");
    setRating("Rating");
    setReviewText("");
    // redirect(`/restaurants/${id}`);
  };

  return (
    <div className="bg-slate-200 rounded-lg">
      <form className="flex flex-col gap-4 p-4">
        <label htmlFor="name" className="">
          Name:
        </label>
        <input
          type="text"
          className="rounded-lg p-2"
          id="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="rating" className="">
          Rating:
        </label>
        <select
          id="rating"
          className="rounded-lg p-2"
          value={rating}
          onChange={(e) => setRating(e.target.value)}>
          <option disabled>Rating</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>

        <label htmlFor="review" className="">
          Review:
        </label>
        <textarea
          id="review"
          className="rounded-lg py-4"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}></textarea>
        <section className="space-x-6">
          <button
            className="outline outline-1 rounded-lg p-1 shadow-lg"
            onClick={handleSubmit}>
            Submit
          </button>
          <button
            className="outline outline-1 rounded-lg p-1 shadow-lg"
            onClick={() => navigate("/")}>
            Back
          </button>
        </section>
      </form>
    </div>
  );
};

export default AddReview;
