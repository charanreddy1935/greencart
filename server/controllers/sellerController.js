
import jwt from "jsonwebtoken"

export const sellerLogin=async (req,res)=>{
    try {
      const {email,password}=req.body;
      if(!email||!password){
        return res.json({success:false,message:'missing details'})
      }
      
      if(password===process.env.SELLER_PASSWORD  && 
        email===process.env.SELLER_EMAIL){
      const token=jwt.sign({email:email},process.env.JWT_SECRET,{expiresIn:'7d'})
      res.cookie('sellerToken',token,{
        httponly:true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
       
      console.log("..........")
      return res.json({success:true,message:"logged in"})
     }
     return res.json({ success: false, message: 'Invalid email or password' });

    } catch (error) {
        console.error('login error:', error.message);
        res.json({ success: false, message: error.message });
    }
}

export const isSellerAuth =async (req,res) => {
    try {
        return res.json({ success: true, message: 'Authenticated seller' }); 
    } catch (error) {
        console.error( error.message);
        res.json({ success: false, message: 'Server error' });
    }
}

export const sellerLogout=async (req,res) => {
    try {
       res.clearCookie('sellerToken',{
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