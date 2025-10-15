const express=require('express');
const Router=express.Router();
console.log('controller reached')
const authenticate=require('../middleware/auth')
const ProfileController=require('../controller/ProfileContoller')
const GeneralController=require('../controller/GeneralController');


Router.post('/login',GeneralController.Login);
Router.post('/register',GeneralController.Register);
Router.use('/board',authenticate,ProfileController)


module.exports = Router