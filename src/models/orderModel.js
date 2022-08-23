const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    user: Array,
    products: Array,
    date: String,
    address: String,
    status: {
      type: String,
      default: "not delivered",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("orders", orderSchema);
