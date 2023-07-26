import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MyRestaurants from "../apis/MyRestaurants";
import { RestaurantsContext } from "../context/restaurants-context";
import Reviews from "../components/Reviews";
import AddReview from "../components/AddReview";

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
  }, []);
  return (
    <>
      <div>
        {selectedRestaurant && (
          <>
            <h1 className="text-center m-3">
              {selectedRestaurant.restaurants.name}
            </h1>

            <div className="mt-3">
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
