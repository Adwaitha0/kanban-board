const mongoose = require('mongoose');


const cardSchema = new mongoose.Schema({
  title: String,
  description: String,
  tag: String,
  color: String,
  position: Number,     // columnIndex: Number,  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  columnIndex: Number,
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });


const Card = mongoose.model("Card", cardSchema, 'Card');

module.exports = Card;
