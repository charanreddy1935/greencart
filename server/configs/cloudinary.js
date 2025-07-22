import {v2 as cloudinary} from 'cloudinary';


const connectCloudinary =async()=>{
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUDNAME, 
  api_key: process.env.CLOUDINARY_APIKEY, 
  api_secret: process.env.CLOUDINARY_API_SECRETKEY
});
}

export default connectCloudinary;