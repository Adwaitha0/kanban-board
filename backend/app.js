

const express=require('express')
const app=express()
const cors=require('cors')
const connectDB=require("./db/db.js")
const dotenv=require('dotenv');
const routes=require('./route/routes.js')
dotenv.config()


app.use(cors({
  origin: "http://localhost:3000",  
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));



app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
app.use(express.static('public'));
app.use('/user',routes)



connectDB()
const PORT=process.env.PORT || 4000;
app.listen((PORT),()=>{
    console.log('server started at 4000')
})
