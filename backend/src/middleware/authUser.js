import userModel from "../models/user.js";
import jwt from 'jsonwebtoken'
export const authUser=async(req,res,next)=>{

    try{

        const {token}=req.cookies;
        if(!token){
            return res.status(401).json({message:'Please login first'});
        }
        const decode=jwt.verify(token,process.env.JWT_SECRET)
        if(!decode){
            return res.status(401).json({message:'unauthorize access'});
        }
        const user=await userModel.findById(decode.user).select('-password');
        if(!user){
            return res.status(404).json({message:'User not found'});
        }

        req.user=user;
        next();
    }catch(err){
        console.log(err.message)
        res.status(500).json({message:'Internal server error'});
    }


}