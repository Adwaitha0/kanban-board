const express = require('express');
const router = express.Router();
const Category = require("../../../model/category");
const Card = require("../../../model/card");
const mongoose = require("mongoose");

router.get('/',async(req,res)=>{
  try {
    const userId = req.user.id;
    const categories = await Category.find({ userId }).sort({ position: 1 });
    if (!categories || categories.length === 0) {
      return res.status(404).json({ message: "No categories found" });
    }
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "something went wrong", error });
  }
})

router.put('/updatePosition',async(req,res)=>{
  try {
    const {cardId, positionTo, categoryId} = req.body;
    
    const activeCard=await Card.findById({_id:new mongoose.Types.ObjectId(cardId) })
    const positionFrom=activeCard.position;
    const activeCategoryId=activeCard.categoryId;
    const activeCategory=await Category.findById(activeCategoryId)
    const columnIdFrom=activeCategory.position;
    const overCategory=await Category.findById(categoryId)
    const columnIdTo= overCategory.position;
    
    if (columnIdFrom !== columnIdTo) {
      await Card.updateMany(
        { categoryId:new mongoose.Types.ObjectId(categoryId), position: { $gte: positionTo }},
        { $inc: { position: 1 } }
      );
      await Card.updateMany(
        { categoryId:activeCategoryId, position:{ $gte: positionFrom }},
        { $inc: { position: -1 } }
      );
    } else {
      if (positionFrom < positionTo) {
        await Card.updateMany(
          {
            categoryId: activeCategoryId,
            position: { $gt: positionFrom, $lte: positionTo },
            
          },
          { $inc: { position: -1 } }
        );
      } else if (positionFrom > positionTo) {
        await Card.updateMany(
          {
            categoryId: activeCategoryId,
            position: { $gte: positionTo, $lt: positionFrom },
           
          },
          { $inc: { position: 1 } }
        );
      }
    }
    const updatedCard = await Card.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(cardId) },
      {
        position: positionTo,
        categoryId: new mongoose.Types.ObjectId(categoryId),
      },
      { new: true }
    );

    if (!updatedCard) {
      return res.status(404).json({ message: "Card not found" });
    }

    res.status(200).json({ message: "Card position updated", updatedCard });
  } catch (error) {
    console.error("Error updating card position:", error);
    res.status(500).json({ message: "Something went wrong", error });
  }

})

module.exports=router;

