const express = require("express");
const mongoose = require("mongoose");
const  dotenv = require("dotenv");

const app = express() ;
dotenv.config();
// const MONGO_URI = "mongodb://localhost:27017/blog-api";

const blogRoutes = require('./routes/blogRoutes');
app.use(express.json());

// Use the blog routes
app.use('/api', blogRoutes);


mongoose.connect(process.env.MONGO_URI ).then(() =>{
    console.log("connect to mongodb ");
}).catch((error) => console.log(error));


app.get ( '/' , (req,res) =>{
    res.send("welcome to the blog API ");
})

const PORT = process.env.PORT || 8000 ; 
app.listen(PORT , () => {
    console.log(`Server running on port no ${PORT}`);
})