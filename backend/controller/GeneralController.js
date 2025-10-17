
const express = require('express');
const Router = express.Router();
const ServiceController=require('../service/auth/make_auth_service')

Router.post('/login',ServiceController.Login);
Router.post('/register',ServiceController.Register);

module.exports = Router