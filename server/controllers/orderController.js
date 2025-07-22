import Order from "../models/Orders.js";
import User from "../models/User.js";
import Product from "../models/Product.js";
import stripe from "stripe"

export const placeOrderCod = async (req, res) => {
  try {
    const { items, address } = req.body;
    const { userId } = req;

    if (!address || items.length === 0) {
      return res.json({ success: false, message: "invalid data" })
    }

    let amount = 0;

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.json({ success: false, message: "Invalid product in cart" });
      }
      amount += product.offerPrice * item.quantity;
    }

    amount += Math.floor(amount * 0.02);

    await Order.create({
      userId,
      items,
      amount,
      address,
      status: "success",
      paymentType: "COD",
    })

    return res.json({ success: true, message: "order placed successfully" });

  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message })
  }
}

export const placeOrderOnline = async (req, res) => {
  try {
    const { items, address } = req.body;
    const { userId } = req;
    const {origin}=req.headers;


    if (!address || items.length === 0) {
      return res.json({ success: false, message: "invalid data" })
    }
    
    let productData=[];

    let amount = 0;

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.json({ success: false, message: "Invalid product in cart" });
      }

      productData.push({
        name : product.name,
        price:product.offerPrice,
        quantity:item.quantity,
      }
      );

      amount += product.offerPrice * item.quantity;
    }

    amount += Math.floor(amount * 0.02);

    const order=await Order.create({
      userId,
      items,
      amount,
      address,
      status: "success",
      paymentType: "online",
    })

    // stripe gateway
    const stripeInstance=new stripe(process.env.STRIPE_SECRET_KEY)
    
    const line_items=productData.map((item)=>{
      return{
        price_data:{
          currency:"aud",
          product_data:{
            name:item.name,
          },
          unit_amount:Math.floor(item.price+item.price*0.02)*100
        },
        quantity:item.quantity,
      }
    })

    const session =await stripeInstance.checkout.sessions.create({
      line_items,
      mode:"payment",
      success_url:`${origin}/loader?next=myorders`,
      cancel_url:`${origin}/cart`,
      metadata:{
        orderId:order._id.toString(),
        userId,

      }
    })

    return res.json({ success: true, url:session.url});

  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message })
  }
}


export const stripeWebHooks = async (req,res)=>{
    const stripeInstance=new stripe(process.env.STRIPE_SECRET_KEY)

    const sign=req.headers["stripe-signature"];

    let event;

    try{
      event =stripeInstance.webhooks.constructEvent(
        req.body,
        sign,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    }catch(error){
       res.status(400).send(`webhook error :${error.message}`)
    }

    switch (event.type) {
      case "payment_intent.succeeded":{
        const paymentIntent=event.data.object;
        const paymentIntentId=paymentIntent.id


        const session=await stripeInstance.checkout.sessions.list({
          payment_intent:paymentIntentId
        });

        const {orderId,userId}=session.data[0].metadata;

        await Order.findByIdAndUpdate(orderId,{isPaid:true})
        console.log('.......')
        await User.findByIdAndUpdate(userId,{cartItems:{}})
        break;
      }
      case "payment_intent.payment_failed":{
        const paymentIntent=event.data.object;
        const paymentIntentId=paymentIntent.id


        const session=await stripeInstance.checkout.sessions.list({
          payment_intent:paymentIntentId
        });

        const {orderId}=session.data[0].metadata;

        await Order.findByIdAndDelete(orderId)
        break;
      }
        
    
      default:
        console.error(`unhandled event type${event.type}`)
        break;
    }
}




export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req;

    const orders = await Order.find({
      userId,
      $or: [{ paymentType: 'COD' }, { isPaid: true }]
    }).populate("items.product address").sort({ createdAt: -1 });

    res.json({ success: true, orders });

  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message })
  }
}


export const getAllOrders = async (req, res) => {
  try {

    const orders = await Order.find({
      $or: [{ paymentType: 'COD' }, { isPaid: true }]
    }).populate("items.product address").sort({ createdAt: -1 });

    res.json({ success: true, orders });

  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message })
  }
}



