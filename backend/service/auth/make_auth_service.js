const User=require('../../model/user');
const Category=require('../../model/category')
const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken');


const Login=async(req,res)=>{
   try{
        const {email,password}=req.body
        const user=await User.findOne({email})
        if(!user){
            return res.status(400).json({message:'User does not exists'})
        }
        const isPasswordValid=await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res.status(400).json({message:'Wrong password'})
        }
        
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "48h" }
        );
        res.status(200).json({message:'User logged in', user: { id: user._id, email: user.email, name: user.name },
    token})

   }catch{
    res.status(500).json({message:'something went wrong'})
   }
}


const Register=async(req,res)=>{
    try{
        const {name,email,password}=req.body;
       
        const user=await User.findOne({email})
        if(user){
            return res.status(400).json({message:'User already exists'})
        }
        const saltRounds=10;
        const hashedPassword=await bcrypt.hash(password,saltRounds)
        const newUser=new User({name,email,password:hashedPassword})     
        await newUser.save();

        const categories=['Backlog','To do','In progress','Designed'];
        const categoriesToInsert=categories.map((title,index)=>({
            name:title,
            userId:newUser._id,
            position:index+1,
        }))      
        await Category.insertMany(categoriesToInsert);
         res.status(201).json({message:'Registered successfully',user:newUser})
    }catch(error){
        res.status(500).json({message:'Registration failed', error:error.message})
    }
}



module.exports={
    Login,
    Register
    
}