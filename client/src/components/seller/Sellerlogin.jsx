import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'


const Sellerlogin = () => {
    const {isSeller,setIsSeller,navigate,axios}=useAppContext()
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState(" ")

    useEffect(()=>{
         if(isSeller){
            navigate('/seller')
         }
    },[isSeller,navigate])


    const onSubmitHandler = async (e)=>{
       try {
         e.preventDefault();
         const {data}=await axios.post('/api/seller/login',{email,password});

         if(data.success){
          setIsSeller(true);
          navigate('/seller')
         }else{
             toast.error(data.message);
         }
       } catch (error) {
         toast.error(error.message);
       }    
    }

  return  !isSeller && (
    <form onSubmit={onSubmitHandler} className='min-h-screen flex items-center text-sm
    text-grey-600'>
        <div className='flex flex-col gap-6 m-auto items-start p-8 py-12 
        min-w-80 sm:min-w-88 rounded-lg shadow-xl border border-gray-200'>
        <p className='text-2xl font-medium m-auto'>
            <span className='text-primary'>Seller</span>
            <span className='ml-1'>Login</span>
        </p>
        <div className='w-full'>
            <p className='text-medium  text-gray-700'>Email</p>
            <input 
            onChange={(e)=>setEmail(e.target.value)
            } type="email" placeholder='enter email'
            className='border border-gray-200 rounded w-full p-2 mt-1 outline-primary' />
        </div>
         <div className='w-full'>
            <p>password</p>
            <input  onChange={(e)=>setPassword(e.target.value)
            } type="password" placeholder='enter password'
             className='border border-gray-200 rounded w-full p-2 mt-1 outline-primary' />
        </div>

        <button className='bg-primary text-white  w-full p-2 rounded  cursor-pointer'>Login</button>

        </div>
     
    </form>
  )
}

export default Sellerlogin
