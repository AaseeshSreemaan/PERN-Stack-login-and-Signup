const express=require("express");
const bycrypt=require("bcryptjs");
const jwt=require('jsonwebtoken');
const {pool}=require("../config/db.js");
const {guard}=require("../middlewware/auth.js")



const router=express.Router();

const cookieOptions={
    httpOnly:true,
    secure:process.env.NODE_ENV==='production',
    sameSite:'Strict',
    maxAge:30*24*60*60*1000,//30 days 
}

const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d' 
    
    });
};
//Sign tokens with user id


router.post('/signup',async(req,res)=>{
    const {name,email,password}=req.body;

    if(!name || !email || !password){
        return res.status(400).json({message:"Please provide all required fields"});
    }
    // Use parameterized queries with $1 instead of directly inserting user input
// into the SQL string. This prevents SQL injection by keeping SQL commands
// separate from user-provided data.
//
// Example:
// 'SELECT * FROM users WHERE email = $1', [email]
//
// $1 is a placeholder for the email value.
// The [email] array provides the value for $1.
// Even if a user enters malicious SQL-like text, PostgreSQL treats it as
// data rather than SQL code.
 const userExists=await pool.query('Select *FROM users WHERE email=$1',[email]);


 if (userExists.rows.length>0){
    return res.status(400).json({message:'User already exists'});
 }

 const hashedPassword=await bycrypt.hash(password,10);


 const newUser =await pool.query(
    'INSERT INTO users (name,email,password) VALUES ($1,$2,$3) RETURNING id,name,email',
    [name,email,hashedPassword]
 );
    const token=generateToken(newUser.rows[0].id);
//id property

    res.cookie('token',token,cookieOptions);

    return res.status(201).json({user: newUser.rows[0]});
})



//login

router.post('/login',async(req,res) => {
   const {email,password}=req.body;
   
   if(!email || !password){
    return res.status(400).json({message:'Please provide all required fields'});
   }

   const users=await pool.query('SELECT *FROM users WHERE email=$1',[email]);

   if(users.rows.length === 0){
    return res.status(400).json({message: 'Invalid credentials'});
   }

   const userData=users.rows[0];

    const match=await bycrypt.compare(password,userData.password);


   if(!match){
    return res.status(400).json({message:'Invalid credentials'});

   }
   const token=generateToken(userData.id);

   res.cookie('token',token,cookieOptions);

   res.json({user:{id:userData.id,name:userData.name,email:userData.email}});
});


//me

router.get('/me',guard,async(req,res)=>{
    res.json(req.user)
    //return info of the logged in user from protect middleware
})

//Logout
router.post('/logout',(req,res)=>{
    res.cookie('token','',{...cookieOptions,maxAge:1});
    res.json({message:'Logged Out Successfully'});//Frontend part
})

module.exports= router;



// res.cookie('token', '', {...cookieOptions, maxAge: 1}) clears the JWT token cookie by setting it to empty and expiring it almost immediately.
// Then res.json(...) tells the client: “Logged Out Successfully.