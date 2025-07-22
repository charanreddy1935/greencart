import React from 'react'
import { useAppContext } from '../context/Appcontext'
import { categories } from '../assets/assets';
import Productcard from '../components/Productcard';
import { useParams } from 'react-router-dom';

const ProductCategory = () => {
    const {products}=useAppContext();
    const {category}=useParams();

    const searchCategory=categories.find((item)=>
        item.path.toLowerCase()===category
    )

    const filteredProducts=products.filter((prod)=>
         prod.category.toLowerCase()===category 
    )

  return (
    <div className='mt-16'>
        {searchCategory ? (
            <div className='flex flex-col '>
                <div className='flex flex-col items-end w-max'>
                <p className='text-2xl font-medium uppercase '>{searchCategory.text.toUpperCase()}</p>
                <div className='w-16 h-0.5 bg-primary rounded-b-full'></div>
                </div>
                <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-6 '>
                     {filteredProducts.filter((product)=>
              product.inStock).map((prod,index)=>(
                 <Productcard key={index} product={prod}></Productcard>
                 ))
                }
                </div>
            </div>
        ):( <p className="flex items-center text-3xl text-primary  font-medium justify-center h-[60vh]">Category not found.</p>)}

    </div>
  )
}

export default ProductCategory
