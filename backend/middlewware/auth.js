const jwt=require('jsonwebtoken');
const {pool}=require('../config/db');


 const guard=async(req,res,next)=>{
    try{
        const token=req.cookies.token;

        if(!token){
            return res.status(401).json({message:"Not  authorized,no token"});
        }


        const decrypt=jwt.verify(token,process.env.JWT_SECRET);
        const user=req.user=await pool.query("SELECT id,name,email,email FROM users WHERE id=$1",([decrypt.id]));

        if(!user.rows.length===0){
                    return res.status(401).json({message:"Not authorizedmuser not found"});
        }
        req.user=user.rows[0];
        next();
    }
        catch(error){
            console.error(error);
            res.status(401).json({message:"Not Authorized,token failed"});
        }
    
};

module.exports={
    guard,
};