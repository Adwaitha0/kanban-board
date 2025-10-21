const express = require("express");
const router = express.Router();
const serviceController=require('../services/services')


router.post("/add", serviceController.addCard);

router.put("/edit/:id", serviceController.editCard);

router.delete("/delete/:id", serviceController.deleteCard);

router.get("/", serviceController.getCard);

router.get("/tags", serviceController.getTag);

module.exports = router;
