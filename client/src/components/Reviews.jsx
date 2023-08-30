import StarRating from "./StarRating";

const Reviews = (props) => {
  const reviews = props.reviews.map((review) => {
    return (
      <div
        className="flex flex-col my-4 p-4 bg-[#1a00fd] text-white rounded-lg"
        // style={{ maxWidth: "30%" }}
        key={review.id}>
        <div className="flex items-center pb-2 border-b">
          <h2 className="font-semibold mr-4">{review.name}</h2>
          <StarRating rating={review.rating} />
        </div>

        <p className="my-2">{review.review}</p>
      </div>
    );
  });
  return <div className="">{reviews}</div>;
};

export default Reviews;
