import {v2 as cloudinary} from 'cloudinary';
import Product from '../models/Product.js';

export const addProduct =async (req,res)=>{
     try {
        let productData=JSON.parse(req.body.productData);
        
        const images=req.files;
        

        let imagesurl=await Promise.all(
            images.map(async(item)=>{
                let result =await cloudinary.uploader.upload(item.path,
                    {
                        resource_type:'image',
                    }
                )
                return result.secure_url
            })
        )
        


        await Product.create({...productData,image:imagesurl})

        res.json({success:true,message:"product added"})
     } catch (error) {
        console.log(error.message)
         res.json({success:false,message:error.message})
     } 
}

export const productList =async (req,res)=>{
  try {
    const products=await Product.find({});

    res.json({success:true,products});
  } catch (error) {
     console.log(error.message)
     res.json({success:false,message:error.message})
  }
}


export const productByid =async (req,res)=>{
    try {
        const id=req.body.id;

        const product=await Product.findById(id);
        res.json({success:true,product});
    } catch (error) {
    console.log(error.message)
     res.json({success:false,message:error.message})
    }
}

export const changeStock =async (req,res)=>{
   try {
      const {id,inStock}=req.body;
      const temp=await Product.findByIdAndUpdate(id,{inStock})
     
      res.json({success:true,message:"product stock updated"})
   } catch (error) {
       console.log(error.message)
     res.json({success:false,message:'error'})
   }
}

