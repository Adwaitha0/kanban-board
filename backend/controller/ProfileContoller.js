const express = require('express');
const Router = express.Router();
const cardController=require('../modules/card/controller/controller')
const categoryController=require('../modules/category/controller/controller')


Router.use('/card',cardController)
Router.use('/category',categoryController)

// Router.put('/card/update/:id',cardController.updateCardCategory)

module.exports = Router