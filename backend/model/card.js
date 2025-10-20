const mongoose = require('mongoose');


const cardSchema = new mongoose.Schema({
  title: String,
  description: String,
  tag: String,
  color: String,
  position: Number,   
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
}, { timestamps: true });


const Card = mongoose.model("Card", cardSchema, 'Card');

module.exports = Card;
