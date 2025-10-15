const express = require('express');
const Router = express.Router();
const cardController=require('../modules/card/controller')
const categoryController=require('../modules/category/controller')

Router.post('/card/add',cardController.addCard)

Router.get('/card',cardController.getCard)

Router.delete('/card/:id',cardController.deleteCard)

Router.put('/card/:id',cardController.editCard)

Router.put('/card/update/:id',cardController.updateCardCategory)

Router.get('/card/tags',cardController.getTag)

Router.get('/category',categoryController.getCategory)



module.exports = Router