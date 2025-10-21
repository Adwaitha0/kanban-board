const express = require("express");
const router = express.Router();
const Card = require("../../../model/card");
const Category = require("../../../model/category");
const mongoose = require("mongoose");

const addCard = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, description, tag, color, categoryId, position } = req.body;
    const cardCount = await Card.countDocuments({ categoryId });
    const card = new Card({
      title,
      description,
      tag,
      color,
      categoryId: new mongoose.Types.ObjectId(categoryId),
      userId: new mongoose.Types.ObjectId(userId),
      position: position ?? cardCount,
    });
    await card.save();
    res.status(201).json({ message: "card added successfully", card });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "something went wrong", error });
  }
};

const editCard = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, tag, color } = req.body;
    const card = await Card.findByIdAndUpdate(
      id,
      { title, description, tag, color },
      { new: true }
    );
    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }
    res.status(200).json({ message: "Card updated successfully", card });
  } catch (error) {
    res.status(500).json({ message: "Failed to update card", error });
  }
};

const deleteCard = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCard = await Card.findById(id);
    if (!deletedCard) {
      return res.status(404).json({ message: "Card not found" });
    }
    const { categoryId, position } = deletedCard;
    await Card.findByIdAndDelete(id);
    await Card.updateMany(
      {
        categoryId: categoryId,
        position: { $gt: position },
      },
      {
        $inc: { position: -1 },
      }
    );
    res.status(200).json({ message: "Card deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete card", error });
  }
};

const getCard = async (req, res) => {
  try {
    const userId = req.user.id;
    const category = await Category.find({ userId });
    const categoryIds = category.map((category) => category._id);
    const cards = await Card.find({ categoryId: { $in: categoryIds } }).sort({
      position: 1,
    });
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cards" });
  }
};

const getTag = async (req, res) => {
  try {
    const tags = await Card.distinct("tag");
    const filteredTags = tags.filter((tag) => tag && tag.trim() !== "");
    res.status(200).json({ tags: filteredTags });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cards" });
  }
};

module.exports = {
  addCard,
  editCard,
  deleteCard,
  getCard,
  getTag,
};
