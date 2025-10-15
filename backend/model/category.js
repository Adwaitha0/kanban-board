
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  position: Number,
});


const Category = mongoose.model("Category", categorySchema, 'Category');

module.exports = Category;
