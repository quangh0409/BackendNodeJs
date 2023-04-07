const mongoose = require("mongoose");

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: "task1 cannot be blank",
    },
    color: {
      type: String,
      required: "task2  cannot be blank",
    },
    price: {
      type: String,
      required: "task2  cannot be blank",
    },
  },
  { versionKey: false },
  { collection: "products" }
);

module.exports = mongoose.model("products", productSchema);
