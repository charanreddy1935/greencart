
import React,{ createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-hot-toast'
import axios from 'axios'

axios.defaults.withCredentials=true;
axios.defaults.baseURL=import.meta.env.VITE_BACKEND_URL;


export const AppContext = createContext();

export const AppContextProvider=({children})=>{
    const currency = import.meta.env.VITE_CURRENCY;

    const navigate=useNavigate();
    const [user,setuser]=useState(null);
    const [isSeller,setIsSeller]=useState(false);
    const [showUserLogin,setshowUserLogin]=useState(true);
    const [products,setProducts]=useState([]);
    const [cartItems,setCartitems]=useState({});
    const [searchQuery,setSearchQuery]=useState({});

    const fetchProducts = async()=>{
       try {
          const {data}=await axios.get('/api/product/list')
          if(data.success){
            setProducts(data.products)
          }else{
            toast.error(data.message)
          }
       } catch (error) {
          toast.error(error.message)
       }
    }

    const fetchSeller = async ()=>{
     try {
        const {data}=await axios.get('/api/seller/is-auth')
        if(data.success){
            setIsSeller(true)
        }else{
            setIsSeller(false)
        }
     } catch (error) { 
         console.log(error)
         setIsSeller(false)
     }
    }


    const fetchUser =async()=>{
        try {
        const {data}=await axios.get('/api/user/is-auth')
        if(data.success){
            setuser(data.user)
            setCartitems(data.user.cartItems);
        }else{
            setuser(null)
        }
     } catch (error) { 
         console.log(error)
         setuser(null)
     }
    }
    
    useEffect(()=>{
        fetchSeller()
        fetchProducts()
        fetchUser()
    },[])

    useEffect(()=>{
      const updateCart=async()=>{
        try {
             const {data}=await axios.post('/api/cart/update',{cartItems})

        if(!data.success){
            toast.error(data.message)
        }
        } catch (error) {
            toast.error(error.message);
        }
      }

      if(user){
        updateCart()
      }

    },[cartItems])

    const addToCart = (itemId)=>{
         let cartData=structuredClone(cartItems);

         if(cartData[itemId]){
            cartData[itemId]+=1;
         }else{
            cartData[itemId]=1;
         }
         setCartitems(cartData);
         toast.success("added to cart");
    }

    const updateCart = (itemId,quantity)=>{
         let cartData=structuredClone(cartItems);
         cartData[itemId]=quantity;

         setCartitems(cartData);
         toast.success("cart updated");
    }

    const removeFromCart = (itemId)=>{
         let cartData=structuredClone(cartItems);

         if(cartData[itemId]){
             cartData[itemId]-=1;

             if(cartData[itemId]===0){
              delete cartData[itemId]
             }
         }
         
         setCartitems(cartData);
         toast.success("deleted from cart");
    }


    const getCartCount =()=>{
        let count=0;

        for(const item in cartItems){
            count+=Number(cartItems[item]);
        }
         
        return count;
        
    }

    const getCartTotal =()=>{
        let totalcost=0;
         
         for(const item in cartItems){
            let cost=products.find((prod)=>
               prod._id===item
            ) 
            
            totalcost+=cartItems[item]*cost.offerPrice;

        }

        return Math.floor(totalcost*100)/100;

    }


    const value = {navigate,user,setuser,isSeller,setIsSeller,showUserLogin,setshowUserLogin
        ,products,currency,addToCart,updateCart,removeFromCart,cartItems,searchQuery,setSearchQuery
        ,getCartCount,getCartTotal,axios,fetchProducts,setCartitems
    }
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext=()=>{
    return useContext(AppContext);
}

