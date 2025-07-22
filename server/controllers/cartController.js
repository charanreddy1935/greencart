import User from "../models/User.js";


export const updateCart = async (req,res)=>{
   try {
   
    const {cartItems}=req.body;
    const {userId}=req;

    await User.findByIdAndUpdate(userId,{cartItems})

    res.json({success:true,message:"cart updated"})
   } catch (error) {
     console.log(error.message)
     res.json({success:true,message:error.message})
   }
}
