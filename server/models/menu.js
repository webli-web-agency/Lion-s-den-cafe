// models/Menu.js
import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  image: {
    type: String, // image URL
    required: true,},
  text: {
    type: String,
    required: true,
  },
});

const menuSchema = new mongoose.Schema({
  items: [menuItemSchema],
});

const Menu = mongoose.model("Menu", menuSchema);
export default Menu;
