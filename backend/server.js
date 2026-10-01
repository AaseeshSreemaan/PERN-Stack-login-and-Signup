const express =require("express");
const dotenv = require('dotenv');
const {pool}=require('./config/db.js');
const cors=require('cors');
const authRoutes=require("./routes/auth.js");//his means: take the code exported from ./routes/auth.js and store it in the variable authRoutes.

const cookieParser = require("cookie-parser");

const app=express();

app.use(cors({
    origin:process.env.CLIENT_URL || "http://localhost:3145",
    credentials:true,
}));

app.use(express.json());
app.use(cookieParser());

// app.get("/",(req,res)=>{
//     res.send("Hello World!");
// })


app.use("/api/auth",authRoutes);

const PORT=process.env.PORT || 8000;

app.listen(PORT,()=>{
    console.log(`Server  is running on ${PORT}`);
})