import axios from "axios";

export default axios.create({
  // baseURL: "http://localhost:5000/api/v1/restaurants",
  baseURL: "https://restaurants-6lsy.onrender.com/api/v1/restaurants",
});
