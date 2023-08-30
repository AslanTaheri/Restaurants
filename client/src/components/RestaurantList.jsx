import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import MyRestaurants from "../apis/MyRestaurants";
import { RestaurantsContext } from "../context/restaurants-context";

function RestaurantList() {
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await MyRestaurants.get("/");
        setRestaurants(response.data.data.restaurants);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData(); // making sure I run the function, not just defining it! It took me some time to debug this.
  }, []); // adding restaurants as a dependency here causes an infinite loop!

  const handleUpdate = (e, id) => {
    e.stopPropagation();
    navigate(`restaurants/${id}/update`);
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      await MyRestaurants.delete(`/${id}`);
      setRestaurants(
        restaurants.filter((restaurant) => {
          return restaurant.id !== id;
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleSelectRestaurant = (id) => {
    navigate(`restaurants/${id}`);
  };

  return (
    <div className="mx-auto my-8 bg-slate-300 rounded-lg p-2">
      <div className="grid grid-cols-[1fr,1fr,.5fr,.5fr,.1fr,.1fr] gap-4 font-bold text-sm md:text-base p-2 items-center justify-items-center">
        <p>Restaurant</p>
        <p>Location</p>
        <p>Price</p>
        <p>Ratings</p>
        {/* <div className="" /> */}
        <p className="col-span-2"></p>
        {/* <p>Delete</p> */}
      </div>
      <div>
        {restaurants &&
          restaurants.map((restaurant, index) => {
            return (
              <div
                className={`grid grid-cols-[1fr,1fr,.3fr,.3fr,.1fr,.1fr] text-sm md:text-base gap-4 space-y-2 my-2 p-2 rounded-lg items-center justify-items-center ${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                }`}
                onClick={() => handleSelectRestaurant(restaurant.id)}
                key={restaurant.id}
                role="button">
                <p className="font-semibold justify-self-start outline outline-1 shadow-lg rounded-lg px-2">
                  {restaurant.name}
                </p>
                <p>{restaurant.location}</p>
                <p className="text-amber-400 font-semibold">
                  {"$".repeat(restaurant.price_range)}
                </p>
                <p>Reviews</p>

                <FontAwesomeIcon
                  icon={faPenToSquare}
                  style={{ color: "#2fa280" }}
                  onClick={handleUpdate}
                />

                <FontAwesomeIcon
                  icon={faTrashCan}
                  style={{ color: "#d63d3d" }}
                  onClick={handleDelete}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default RestaurantList;
