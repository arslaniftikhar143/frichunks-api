const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    name: String,
    image: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("categories", categorySchema);
