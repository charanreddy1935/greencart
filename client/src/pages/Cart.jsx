import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets} from '../assets/assets';
import toast from 'react-hot-toast';


const Cart = () => {
 
   const {axios,products,cartItems,currency,removeFromCart,getCartCount
    ,updateCart,navigate,getCartTotal,user,setCartitems
   }=useAppContext();

   const [cartArray,setCartArray]=useState([])
   const [address,setAddress] =useState([])
   const [showAddress, setShowAddress] = useState(false)
   const [selectedAdddress,setSelectedAddress]=useState(null)
   const [paymentOption,setPaymentOption]=useState("COD")

   const productsInCart =()=>{
    const temp=[]
    for(const item in cartItems){
            let cost=products.find((prod)=>
               prod._id===item
            )
            cost.quantity=cartItems[item];

            temp.push(cost);
        }
        setCartArray(temp);
   }

   const getUserAddress=async ()=>{
    try {
      const {data}=await axios.get('/api/address/get')
      
      if(data.success){
        setAddress(data.address);
        if(data.address.length>0){
             setSelectedAddress(data.address[0]);
        }  
      }else{
        toast.error(data.message);
      }
    } catch (error) {
        toast.error(error.message)
    }

   }

   const placeOrder=async ()=>{
    try {

        if(!user){
            return toast.error("please login!")
        }

        if(!selectedAdddress){
           return toast.error("please select a address")
        }



        if(paymentOption==='COD'){
            const {data}=await axios.post('/api/order/cod',{
                items: cartArray.map(item => ({ product: item._id, quantity: item.quantity })),
                address:selectedAdddress,
            })

            if(data.success){
                toast.success(data.message)
                setCartitems({})
                navigate('/myorders')
            }else{
                toast.error(data.message)
            }
        }else{
           const {data}=await axios.post('/api/order/stripe',{ 
            items: cartArray.map(item => ({ product: item._id, quantity: item.quantity })),
            address:selectedAdddress,
        })

          if(data.success){
                window.location.replace(data.url)
            }else{
                toast.error(data.message)
            }
        }
       
    } catch (error) {
        toast.error(error.message);
    }
   }
  
   useEffect(()=>{
      if(user){
        getUserAddress()
      }
   },[user])


   useEffect(()=>{
      productsInCart()
   },[products,cartItems])

    return (
        <div className="flex flex-col md:flex-row mt-16">
            <div className='flex-1 max-w-4xl'>
                <h1 className="text-3xl font-medium mb-6">
                    Shopping Cart <span className="text-sm text-primary">{getCartCount()} items</span>
                </h1>

                <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
                    <p className="text-left">Product Details</p>
                    <p className="text-center">Subtotal</p>
                    <p className="text-center">Action</p>
                </div>

                {cartArray.map((product, index) => (
                    <div key={index} className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3">
                        <div className="flex items-center md:gap-6 gap-3">
                            <div  onClick={()=>{ navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
                            scrollTo(0,0)
                        }}  className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded overflow-hidden">
                                <img className="max-w-full h-full object-cover" src={product.image[0]} alt={product.name} />
                            </div>
                            <div>
                                <p className="hidden md:block font-semibold">{product.name}</p>
                                <div className="font-normal text-gray-500/70">
                                    <p>Weight: <span>{product.weight || "N/A"}</span></p>
                                    <div className='flex items-center'>
                                        <p>Qty:</p>
                                        <select value={product.quantity}  onChange ={(e)=>updateCart(product._id,e.target.value)}  className='outline-none'>
                                            {Array(cartItems[product._id]>9 ? cartItems[product._id] : 9 ).fill('').map((_, index) => (
                                                <option key={index} value={index + 1}>{index + 1}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="text-center">{currency}{product.offerPrice * product.quantity}</p>
                        <button  onClick ={()=>removeFromCart(product._id)} className="cursor-pointer mx-auto">
                            <img  src={assets.remove_icon} alt="remove"  className='w-6 h-6 inline-block'/>
                        </button>
                    </div>)
                )}

                <button onClick={()=>{navigate('/products');
                    scrollTo(0,0);
                }} className="group cursor-pointer flex items-center mt-8 gap-2 text-primary font-medium">
                    <img src={assets.arrow_right_icon_colored} alt="arrow" />
                    Continue Shopping
                </button>

            </div>

            <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
                <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
                <hr className="border-gray-300 my-5" />

                <div className="mb-6">
                    <p className="text-sm font-medium uppercase">Delivery Address</p>
                    <div className="relative flex justify-between items-start mt-2">
                        <p className="text-gray-500">{selectedAdddress ? `${selectedAdddress.street},${selectedAdddress.city},${selectedAdddress.state},
                        ${selectedAdddress.country}`:"No address found"}</p>
                        <button onClick={() => setShowAddress(!showAddress)} className="text-primary hover:underline cursor-pointer">
                            Change
                        </button>
                        {showAddress && (
                            <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full">
                                {address.map((add,index)=>(<p key={index} onClick={() => {setShowAddress(!showAddress);
                                    setSelectedAddress(add);
                                }} className="text-gray-500 p-2 hover:bg-gray-100">
                                    {add.street},{add.city},{add.state},{add.country}
                                </p>))}
                                <p onClick={() => {setShowAddress(!showAddress);
                                    navigate('/set-address')
                                }} className="text-primary text-center cursor-pointer p-2 hover:bg-primary/10">
                                    Add address
                                </p>
                            </div>
                        )}
                    </div>

                    <p className="text-sm font-medium uppercase mt-6">Payment Method</p>

                    <select onChange={(e)=>setPaymentOption(e.target.value)} className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none">
                        <option value="COD">Cash On Delivery</option>
                        <option value="Online">Online Payment</option>
                    </select>
                </div>

                <hr className="border-gray-300" />

                <div className="text-gray-500 mt-4 space-y-2">
                    <p className="flex justify-between">
                        <span>Price</span><span>{currency}{getCartTotal()}</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Shipping Fee</span><span className="text-green-600">Free</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Tax (2%)</span><span>{currency}{Math.floor(getCartTotal()*2)/100}</span>
                    </p>
                    <p className="flex justify-between text-lg font-medium mt-3">
                        <span>Total Amount:</span><span>{currency}{getCartTotal()+Math.floor(getCartTotal()*2)/100}</span>
                    </p>
                </div>

                <button onClick={()=>placeOrder()} className="w-full py-3 mt-6 cursor-pointer bg-primary text-white font-medium hover:bg-primary/50 transition">
                   {paymentOption==="COD"?"Place Order":"Proceed to Check out"}
                </button>
            </div>
        </div>
    )
}

export default Cart





