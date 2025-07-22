import express from 'express';
import authUser from '../middleware/authUser.js'
import { getAllOrders, getUserOrders, placeOrderCod, placeOrderOnline } from '../controllers/orderController.js';
import authSeller from '../middleware/authSeller.js'

const orderRounter=express.Router();

orderRounter.post('/cod',authUser,placeOrderCod)
orderRounter.post('/stripe',authUser,placeOrderOnline)
orderRounter.get('/user',authUser,getUserOrders)
orderRounter.get('/seller',authSeller,getAllOrders)

export default orderRounter