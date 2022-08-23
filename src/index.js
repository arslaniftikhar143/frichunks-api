const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");
const dotenv = require("dotenv");
const userRoute = require("./routes/userRoute.js");
const categoryRoute = require("./routes/categoryRoute.js");
const productRoute = require("./routes/productRoute.js");
const orderRoute = require("./routes/orderRoute.js");

// api config
dotenv.config();
const app = express();
const port = process.env.PORT || 9000;

// middlewares
app.use(express.json());
app.use(cors());

// db config
mongoose.connect(process.env.MONGOURL, () => {
  try {
    console.log("db connected");
  } catch (error) {
    console.log(error);
  }
});

// api endpoints
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to frichunks api",
  });
});
app.post("/", (req, res) => {
  res.status(200).json(req.body);
});

app.use("/api/v1", userRoute);
app.use("/api/v1", categoryRoute);
app.use("/api/v1", productRoute);
app.use("/api/v1", orderRoute);

// listner
app.listen(port, () => {
  console.log(`api working ${port}`);
});
