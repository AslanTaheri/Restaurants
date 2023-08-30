import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MyRestaurants from "../apis/MyRestaurants";
import { RestaurantsContext } from "../context/restaurants-context";
import Reviews from "../components/Reviews";
import AddReview from "../components/AddReview";
import StarRating from "../components/StarRating";

const RestaurantDetailPage = () => {
  let { id } = useParams();
  const [restaurantName, setRestaurantName] = useState("");
  const { selectedRestaurant, setSelectedRestaurant } =
    useContext(RestaurantsContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await MyRestaurants.get(`/${id}`);
        setSelectedRestaurant(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [selectedRestaurant]);
  return (
    <>
      <div className="container flex flex-col p-6 mx-auto space-y-8 bg-slate-100">
        {selectedRestaurant && (
          <>
            <section className="text-center">
              <h1 className="text-lg font-bold">
                {selectedRestaurant.restaurants.name}
              </h1>
              <StarRating rating={selectedRestaurant.restaurants.avg_rating} />
            </section>

            <div>
              <Reviews reviews={selectedRestaurant.reviews} />
            </div>
            <AddReview />
          </>
        )}
      </div>
    </>
  );
};

export default RestaurantDetailPage;
