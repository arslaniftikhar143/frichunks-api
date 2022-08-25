const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: String,
    deliveryTime: String,
    price: String,
    size: String,
    quanity: {
      type: Number,
      default: 0,
    },
    description: String,
    categories: Array,
    image: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("products", productSchema);
