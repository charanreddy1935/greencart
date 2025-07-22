import Address from "../models/Address.js";


export const addAddress=async (req,res)=>{
     try {
        const address=req.body.formData;
        const {userId}=req;
        
        await Address.create({...address,userId})
        
        res.json({success:true,message:"address added successfully"});
     } catch (error) {
         console.log(error.message);
         res.json({success:false,message:error.message});
     }
}


export const getAddress=async(req,res)=>{
    try {
      const userId =req.body;

      const address=await Address.find(userId);

      res.json({success:true,address});

    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message});
    }
}