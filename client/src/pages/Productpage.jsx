import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/Appcontext';
import { Link, useParams } from 'react-router-dom';
import Productcard from '../components/Productcard';
import { assets } from '../assets/assets';

const Productpage = () => {
   const {products,navigate,addToCart,currency}=useAppContext();
   const {id}=useParams();
   const [relatedProducts,setRelatedProducts] = useState([])
    const [thumbnail, setThumbnail] = useState(null);
     
    const product=products.find((prod)=>prod._id===id)
     
    useEffect(()=>{
        let productCopy=products.slice();
        productCopy=productCopy.filter((prod)=>product.category===prod.category && prod._id !== id)
        setRelatedProducts(productCopy.slice(0,5));
    },[products,product,id]);

    useEffect(()=>{
          setThumbnail(product?.image[0] ? product.image[0] :null)
    },[product]);

    return product && (
        <div className="mt-16">
            <p>
                <Link to={'/'}>Home</Link> /
                <Link to={'/products'}> Products</Link> /
                <Link to={`/products/${product.category.toLowerCase()}`}> {product.category}</Link> /
                <Link to={`/products/${product.category.toLowerCase()}/${product._id}`} className="text-primary"> {product.name}</Link>
            </p>

            <div className="flex flex-col md:flex-row gap-16 mt-4">
                <div className="flex gap-3">
                    <div className="flex flex-col gap-3">
                        {product.image.map((image, index) => (
                            <div key={index} onClick={() => setThumbnail(image)} className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer" >
                                <img src={image} alt={`Thumbnail ${index + 1}`} />
                            </div>
                           

                        ))}
                    </div>

                    <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
                        <img src={thumbnail} alt="Selected product" className="w-full h-full object-cover" />
                    </div>
                </div>

                <div className="text-sm w-full md:w-1/2">
                    <h1 className="text-3xl font-medium">{product.name}</h1>

                    <div className="flex items-center gap-0.5 mt-1">
                        {Array(5).fill('').map((_, i) => (
                          (
                                <img src={i<4 ?assets.star_icon:assets.star_dull_icon}></img>
                          ) 
                        ))}
                        <p className="text-base ml-2">({5})</p>
                    </div>

                    <div className="mt-6">
                        <p className="text-gray-500/70 line-through">MRP: {currency}{product.price}</p>
                        <p className="text-2xl font-medium">{currency} {product.offerPrice}</p>
                        <span className="text-gray-500/70">(inclusive of all taxes)</span>
                    </div>

                    <p className="text-base font-medium mt-6">About Product</p>
                    <ul className="list-disc ml-4 text-gray-500/70">
                        {product.description.map((desc, index) => (
                            <li key={index}>{desc}</li>
                        ))}
                    </ul>

                    <div  className="flex items-center mt-10 gap-4 text-base">
                        <button onClick={()=>
                        addToCart(product._id)
                    } className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition" >
                            Add to Cart
                        </button>
                        <button onClick={()=>
                        { addToCart(product._id);
                            navigate('/cart')
                        }} className="w-full py-3.5 cursor-pointer font-medium bg-primary text-white hover:bg-primary/30 transition" >
                            Buy now
                        </button>
                    </div>
                </div>
            </div>

             <div className='mt-20 flex flex-col items-center'>
                <div className='flex flex-col items-center w-max'>
                <p className='text-2xl font-medium uppercase '>RELATED PRODUCTS</p>
                <div className='w-20 h-0.5 bg-primary rounded-b-full'></div>
                </div>
                <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-6 '>
                     {relatedProducts.filter((product)=>
              product.inStock).map((prod,index)=>(
                 <Productcard key={index} product={prod}></Productcard>
                 ))
                }
                </div>

                <button  onClick={()=>{
                    navigate('/products');
                     scrollTo(0,0);
                  }} className='mt-20  mx-auto border cursor-pointerpx-12  border-primary w-50 h-10 rounded-3xl text-primary hover:bg-primary-dull/10 '>
                    See more
                </button>
            </div>


        </div>
    );
}

export default Productpage



