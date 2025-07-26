import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
  text: {
    type: String,
    default: "",
  }
});

const Product = mongoose.model("Product", productSchema);

export default Product;
