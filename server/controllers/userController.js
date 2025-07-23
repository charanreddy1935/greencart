import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export const register=async (req,res)=>{
    try {
      const {name,email,password}=req.body;
      if(!name||!email||!password){
        return res.json({success:false,message:'missing details'})
      }

      const existingUser=await User.findOne({email})

      if(existingUser){
        return res.json({success:false,message:'user already exists'})
      }

      const newpass=await bcrypt.hash(password,10);
      const user=await User.create({name,email,password:newpass})
      
      const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'})
      res.cookie('token',token,{
        httponly:true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })


      return res.json({success:true,user:{email:user.email,name:user.name}})

    } catch (error) {
        console.error('Register error:', error.message);
        res.json({ success: false, message: 'Server error' });
    }
}

export const login=async (req,res)=>{
    try {
      const {email,password}=req.body;
      if(!email||!password){
        return res.json({success:false,message:'missing details'})
      }
      
      const user=await User.findOne({email});
      
      if(!user){
        return res.json({success:false,message:'Invalid email and password'})
      }

      const ismatch=await bcrypt.compare(password,user.password);

      if(!ismatch){
         return res.json({success:false,message:'Invalid email and pssword'})
      }

      const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'})
      res.cookie('token',token,{
        httponly:true,
        secure: process.env.NODE_ENV === 'production',
        sameSite:  process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })

      
      return res.json({success:true,user:{name:user.name}})

    } catch (error) {
        console.error('login error:', error.message);
        res.json({ success: false, message: 'Server error' });
    }
}


export const isAuth =async (req,res) => {
    try {
        const {userId}=req;
          
        const user=await User.findById(userId).select("-password")
        
        return res.json({success:true,user})
        
    } catch (error) {
        console.error( error.message);
        res.json({ success: false, message: 'Server error' });
    }
}

export const logout=async (req,res) => {
    try {
       res.clearCookie('token',{
        httponly:true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax',
      })

      return res.json({success:true,message:"logged out"})
    } catch (error) {
        console.error( error.message);
        res.json({ success: false, message: 'Server error' });
    }
    
}