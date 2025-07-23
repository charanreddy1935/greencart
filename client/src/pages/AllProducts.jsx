import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import Productcard from '../components/Productcard';

const AllProducts = () => {
  const {products,searchQuery,setSearchQuery}=useAppContext();
  const [filteredProducts,setfilteredproducts]=useState([])
  
 
  useEffect(
    ()=>{
       if(searchQuery.length>0){
         setfilteredproducts(
          products.filter(
            product =>
              product.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
         )
       }else{
         setfilteredproducts(products)
       }
    },[products,searchQuery]
  )


  return (
    <div className='mt-16 flex flex-col'>
       <div className='flex flex-col items-end w-max '>
         <h2 className='text-2xl font-medium uppercase '>ALL PRODUCTS</h2>
         <div className='w-16 h-0.5 bg-primary rounded-full' ></div>
       </div>
       <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-6'>
            {filteredProducts.filter((product)=>
              product.inStock).map((prod,index)=>(
                 <Productcard key={index} product={prod}></Productcard>
              ))
            }
       </div>
    </div>
  )
}

export default AllProducts
