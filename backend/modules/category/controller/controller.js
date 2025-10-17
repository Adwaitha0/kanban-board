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
    const {
      cardId,
      positionTo,
      positionFrom,            //   positionFrom, columnIdFrom, columnIdTo,
      categoryId,
      columnIdFrom,
      columnIdTo,
    } = req.body;
    const userId = req.user.id;

    if (columnIdFrom !== columnIdTo) {
      await Card.updateMany(
        { columnIndex: columnIdTo, position: { $gte: positionTo }, userId },
        { $inc: { position: 1 } }
      );
      await Card.updateMany(
        { columnIndex: columnIdFrom, position: { $gte: positionFrom }, userId },
        { $inc: { position: -1 } }
      );
    } else {
      if (positionFrom < positionTo) {
        await Card.updateMany(
          {
            columnIndex: columnIdFrom,
            position: { $gt: positionFrom, $lte: positionTo },
            userId,
          },
          { $inc: { position: -1 } }
        );
      } else if (positionFrom > positionTo) {
        await Card.updateMany(
          {
            columnIndex: columnIdFrom,
            position: { $gte: positionTo, $lt: positionFrom },
            userId,
          },
          { $inc: { position: 1 } }
        );
      }
    }

    const updatedCard = await Card.findOneAndUpdate(
      { _id: cardId, userId },
      {
        position: positionTo,
        columnIndex: columnIdTo,
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


// const getCategory = async (req, res) => {
//     console.log('getCategory reached')
//   try {
//     const userId = req.user.id;
//     const categories = await Category.find({ userId }).sort({ position: 1 });
//     // console.log(categories)
//     if (!categories || categories.length === 0) {
//       return res.status(404).json({ message: "No categories found" });
//     }
//     res.status(200).json(categories);
//   } catch (error) {
//     res.status(500).json({ message: "something went wrong", error });
//   }
// };

// const updatePosition = async (req, res) => {
//   try {
//     const {
//       cardId,
//       positionTo,
//       positionFrom,            //   positionFrom, columnIdFrom, columnIdTo,
//       categoryId,
//       columnIdFrom,
//       columnIdTo,
//     } = req.body;
//     console.log(req.body);
//     const userId = req.user.id;

//     if (columnIdFrom !== columnIdTo) {
//       await Card.updateMany(
//         { columnIndex: columnIdTo, position: { $gte: positionTo }, userId },
//         { $inc: { position: 1 } }
//       );
//       await Card.updateMany(
//         { columnIndex: columnIdFrom, position: { $gte: positionFrom }, userId },
//         { $inc: { position: -1 } }
//       );
//     } else {
//       if (positionFrom < positionTo) {
//         await Card.updateMany(
//           {
//             columnIndex: columnIdFrom,
//             position: { $gt: positionFrom, $lte: positionTo },
//             userId,
//           },
//           { $inc: { position: -1 } }
//         );
//       } else if (positionFrom > positionTo) {
//         await Card.updateMany(
//           {
//             columnIndex: columnIdFrom,
//             position: { $gte: positionTo, $lt: positionFrom },
//             userId,
//           },
//           { $inc: { position: 1 } }
//         );
//       }
//     }

//     const updatedCard = await Card.findOneAndUpdate(
//       { _id: cardId, userId },
//       {
//         position: positionTo,
//         columnIndex: columnIdTo,
//         categoryId: new mongoose.Types.ObjectId(categoryId),
//       },
//       { new: true }
//     );

//     if (!updatedCard) {
//       return res.status(404).json({ message: "Card not found" });
//     }

//     res.status(200).json({ message: "Card position updated", updatedCard });
//   } catch (error) {
//     console.error("Error updating card position:", error);
//     res.status(500).json({ message: "Something went wrong", error });
//   }
// };

// module.exports = {
//   getCategory,
//   updatePosition,
// };
