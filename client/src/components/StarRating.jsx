import { faBorderAll } from "@fortawesome/free-solid-svg-icons";

const StarRating = ({ rating }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(
        <i
          key={i}
          className="fa-solid fa-star fa-2xs"
          style={{ color: "#f9b701" }}></i>
      );
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(
        <i
          key={i}
          className="fa-solid fa-star-half-stroke fa-2xs"
          style={{ color: "#f9b701" }}></i>
      );
    } else {
      stars.push(
        <i
          key={i}
          className="fa-regular fa-star fa-2xs"
          style={{ color: "#f9b701" }}></i>
      );
    }
  }

  return <>{stars}</>;
};

export default StarRating;
