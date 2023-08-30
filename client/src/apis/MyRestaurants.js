import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5000/",
  // baseURL: "https://restaurants-6lsy.onrender.com/api/v1/restaurants",
});
