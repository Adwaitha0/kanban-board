const express=require('express');
const Router=express.Router();
const authenticate=require('../middleware/auth')
const ProfileController=require('../controller/ProfileContoller')
const GeneralController=require('../controller/GeneralController');


// Router.post('/general',GeneralController);
Router.use('/general',GeneralController);
Router.use('/board',authenticate,ProfileController)


module.exports = Router