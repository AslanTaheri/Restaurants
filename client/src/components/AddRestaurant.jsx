import React, { useContext, useState } from "react";
import MyRestaurants from "../apis/MyRestaurants";
import { RestaurantsContext } from "../context/restaurants-context";

function AddRestaurant() {
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
    <div className="mb-4">
      <form action="">
        <div className="row">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="col">
            <select
              className="custom-select my-1 mr-sm-2"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}>
              <option disabled>Price Range</option>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
              <option value="5">$$$$$</option>
            </select>
          </div>
          <button
            type="submit"
            className="col btn btn-primary"
            onClick={submitHandler}>
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddRestaurant;
