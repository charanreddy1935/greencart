import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/db.js';
import 'dotenv/config'
import userRouter from './routes/userRoutes.js';
import sellerRouter from './routes/sellerRoute.js';
import connectCloudinary from './configs/cloudinary.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import addressRouter from './routes/addressRoute.js';
import orderRounter from './routes/orderRoute.js';
import { stripeWebHooks } from './controllers/orderController.js';


const app=express();
const port=process.env.PORT||4000;

await connectDB();
await connectCloudinary();



const allowedOrigins=['http://localhost:5173']




app.post('/stripe',express.raw({type:application/json}),stripeWebHooks)


app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:allowedOrigins,credentials:true}));

app.get('/',(req,res)=>{
    res.send("hello from server");
})

app.use('/api/user',userRouter)
app.use('/api/seller',sellerRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/address',addressRouter)
app.use('/api/order',orderRounter)

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})
