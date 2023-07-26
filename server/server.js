require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");
// import db from "./db/index.js" // I had to use the "require";
const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// retrieve all restaurants reviews
app.get("/api/v1/restaurants", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM restaurants");

    res.status(200).json({
      satus: "success",
      result: result.rowCount,
      data: {
        restaurants: result.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// retireve a specific restaurant review
app.get("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const restaurant = await db.query(
      "SELECT * FROM restaurants WHERE id = $1",
      [req.params.id]
    );

    const reviews = await db.query(
      "SELECT * FROM reviews WHERE restaurant_id = $1",
      [req.params.id]
    );

    res.status(200).json({
      satus: "success",
      data: {
        restaurants: restaurant.rows[0], // if you don't specify [0], it will return an object WITHIN an array instead of just an object.
        reviews: reviews.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// create a restaurant entry
app.post("/api/v1/restaurants", async (req, res) => {
  try {
    const result = await db.query(
      "INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *",
      [req.body.name, req.body.location, req.body.price_range]
    );
    res.status(201).json({
      status: "success",
      data: {
        restaurants: result.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// update a restaurant entry
app.put("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const result = await db.query(
      "UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *",
      [req.body.name, req.body.location, req.body.price_range, req.params.id]
    );
    res.status(201).json({
      status: "success",
      data: {
        restaurants: result.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// delete a specific restaurant entry
app.delete("/api/v1/restaurants/:id", async (req, res) => {
  try {
    result = await db.query("DELETE FROM restaurants WHERE id = $1", [
      req.params.id,
    ]);
    res.status(204).json({
      status: "success",
      data: {
        restaurants: result.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// create a review for a restaurant
app.post("/api/v1/restaurants/:id/addReview", async (req, res) => {
  try {
    const newReview = await db.query(
      "INSERT INTO reviews (restaurant_id, name, rating, review) VALUES ($1, $2, $3, $4) RETURNING *",
      [req.params.id, req.body.name, req.body.rating, req.body.review]
    );
    res.status(201).json({
      status: "success",
      data: {
        review: newReview.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
