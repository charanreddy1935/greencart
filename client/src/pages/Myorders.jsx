import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/Appcontext';
import toast from 'react-hot-toast';

const Myorders = () => {
  const [myorders, setMyorders] = useState([]);
  const { currency,axios,user } = useAppContext();


   const fetchMyOrders =async ()=>{
     try {
       const {data}=await axios.get('/api/order/user');
       
       if(data.success){
         setMyorders(data.orders);
       }
     } catch (error) {
         toast.error(error.message)
     }
   }


  useEffect(() => {
     if(user){
       fetchMyOrders();
     }

  }, []);

  return (
    <div className='mt-16'>
      <div className='flex flex-col items-end w-max'>
        <p className='text-2xl font-medium uppercase'>MY ORDERS</p>
        <div className='w-16 h-0.5 bg-primary rounded-full'></div>
      </div>

      {myorders.map((prod, index) => (
        <div key={index} className='mt-12 border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl'>
          <p className='flex justify-between md:items-center text-gray-700 md:font-medium max-md:flex-col'>
            <span>Order Id: {prod._id}</span>
            <span>Payment: {prod.paymentType}</span>
            <span>Total Amount: {currency}{prod.amount}</span>
          </p>

          {prod.items.map((item, idx) => (
            <div
              key={idx}
              className='relative bg-white text-gray-500 border border-gray-300 
              md:items-center justify-between p-4 py-5 md:gap-16 w-full max-w-4xl 
              flex flex-col md:flex-row mt-4 rounded-lg'
            >
              <div className='flex items-center gap-4 mb-4 md:mb-0'>
                <div className='bg-primary/10 p-4 rounded-lg'>
                  <img src={item.product.image[0]} alt={item.product.name} className='w-16 h-16 object-cover' />
                </div>
                <div>
                  <h2 className='text-lg font-medium text-gray-700'>{item.product.name}</h2>
                  <p>Category: {item.product.category}</p>
                </div>
              </div>

              <div className='flex flex-col gap-1 text-sm'>
                <p>Quantity: {item.quantity}</p>
                <p>Status: {prod.status}</p>
                <p>Date: {new Date(prod.createdAt).toLocaleDateString()}</p>
              </div>

              <div className='text-primary text-lg font-medium mt-4 md:mt-0'>
                Amount: {currency}{item.product.offerPrice * item.quantity}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Myorders;
