import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import MyRestaurants from "../apis/MyRestaurants";

const UpdateRestaurant = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");

  //   const { restaurants, setRestaurants } = useContext(RestaurantsContext); // Not using the context api because it causes and error if user directly navigates to this page.
  // instead, just fetch the data related to this specific restaurant id :)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await MyRestaurants.get(`/${id}`);
        const restaurant = await response.data.data.restaurants;
        setName(restaurant.name);
        setLocation(restaurant.location);
        setPriceRange(restaurant.price_range);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await MyRestaurants.put(`/${id}`, {
        name,
        location,
        price_range: priceRange,
      });
    } catch (err) {
      console.log(err);
    }
    navigate("/");
  };

  return (
    // I am using Bootstrap. I will write my own css in the next phase of the development.
    <>
      <form action="">
        <div className="my-3 form-group">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="my-3 form-group">
          <label htmlFor="location">Location:</label>
          <input
            id="location"
            type="text"
            className="form-control"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="my-3 form-group">
          <label htmlFor="price">Price Range:</label>
          <select
            id="price"
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
          className="my-2 btn btn-primary"
          onClick={submitHandler}>
          Update
        </button>
        <Link to="/">
          <button className="mx-4 btn btn-primary">Cancle</button>
        </Link>
      </form>
    </>
  );
};

export default UpdateRestaurant;
