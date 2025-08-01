import React from 'react';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';

const Productcard = ({ product }) => {
 
  const { currency, cartItems, addToCart, removeFromCart, navigate } = useAppContext();

  return (
    product && (
      <div  onClick={()=>{ 
       navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
       scrollTo(0,0);
      }}
        className="border border-gray-500/20 rounded-md bg-white md:px-4 px-3 py-2 min-w-50 max-w-56 w-full">
        
        {/* Product Image */}
        <div className="group cursor-pointer flex items-center justify-center px-2">
          <img
            src={product.image[0]}
            alt={product.name}
            className="group-hover:scale-105 transition max-w-26 md:max-w-36"
          />
        </div>

        {/* Product Info */}
        <div className="text-gray-500/60 text-sm mt-2">
          <p>{product.category}</p>
          <p className="text-gray-700 font-medium text-lg truncate w-full">
            {product.name}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-0.5 mt-1">
            {Array(5)
              .fill('')
              .map((_, i) => (
                <img
                  key={i}
                  src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                  className="md:w-3.5 w-3"
                  alt="star"
                />
              ))}
            <p className="ml-1 text-xs text-gray-400">(5)</p>
          </div>

          {/* Price + Cart */}
          <div className="flex items-end justify-between mt-3">
            <p className="md:text-xl text-base font-medium text-primary">
              {currency}
              {product.offerPrice}{' '}
              <span className="text-gray-500/60 md:text-sm text-xs line-through">
                {currency}
                {product.price}
              </span>
            </p>

            {/* Cart Action */}
            <div  onClick={(e)=>e.stopPropagation()
        } className="text-primary">
              {!cartItems[product._id] ? (
                <button
                  className="flex items-center justify-center gap-1 bg-green-200 border border-indigo-300 md:w-[80px] w-[64px] h-[34px] rounded text-indigo-600 font-medium"
                  onClick={() => addToCart(product._id)}
                >
                  <img src={assets.cart_icon} alt="cart icon" />
                  Add
                </button>
              ) : (
                <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-primary/25 rounded select-none">
                  <button
                    onClick={() =>removeFromCart(product._id)}
                    className="cursor-pointer text-md px-2 h-full"
                  >
                    -
                  </button>
                  <span className="w-5 text-center">{cartItems[product._id]}</span>
                  <button
                    onClick={() =>addToCart(product._id)}
                    className="cursor-pointer text-md px-2 h-full"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Productcard;
