import React, { useContext, useState } from "react";
import MyRestaurants from "../apis/MyRestaurants";
import { RestaurantsContext } from "../context/restaurants-context";

function AddRestaurant() {
  // I am using a controlled form utilizing the useState hooks to add my restaurants.
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("Price Range");

  const { addRestaurant } = useContext(RestaurantsContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await MyRestaurants.post("/", {
        name,
        location,
        price_range: priceRange,
      });
      addRestaurant(response.data.data.restaurants);
    } catch (err) {
      console.log(err);
    }
    setName("");
    setLocation("");
    setPriceRange("Price Range");
  };
  return (
    <div className=" ">
      <form>
        <div className="flex flex-col sm:flex-row gap-2 mx-auto my-8 bg-slate-300 rounded-lg p-4 justify-between">
          <input
            type="text"
            className="px-2 rounded-lg border border-black"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            className="px-2 rounded-lg border border-black"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <select
            className="px-2 rounded-lg border border-black"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}>
            <option disabled>Price Range</option>
            <option value="1">$</option>
            <option value="2">$$</option>
            <option value="3">$$$</option>
            <option value="4">$$$$</option>
            <option value="5">$$$$$</option>
          </select>

          <button
            type="submit"
            className="bg-white outline outline-1 shadow-lg rounded-lg px-4"
            onClick={submitHandler}>
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddRestaurant;
