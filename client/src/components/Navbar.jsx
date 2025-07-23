import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import {assets} from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'


const Navbar = () => {
   const [open, setOpen] = React.useState(false)
   const {user,axios , setuser , setshowUserLogin,navigate,setSearchQuery,searchQuery,getCartCount}= useAppContext();

   const logout= async ()=>{

      try {
        const {data}=await axios.get('/api/user/logout');
        if(data.success){
          toast.success(data.message)
           setuser(null);
           navigate ('/')
        }else{
            toast.error(data.message)
        }
      } catch (error) {
          toast.error(error.message)
      }
      
   }

   useEffect(()=>{
     if(searchQuery.length>0){
        navigate('/products')
     }  
   },[searchQuery])

  return (
     

        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">

            <NavLink to='/'>
                <img className="h-9" src={assets.logo} alt="Logo" />
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8">
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/products'>All products</NavLink>
                

                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                    <input  onChange={(e)=>setSearchQuery(e.target.value)}className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />
                    <img src={assets.search_icon} alt='search' className='w-4 h-4'></img>
                </div>

                <div  onClick={()=>{
                    navigate('/cart')
                }} className="relative cursor-pointer">
                    <img src={assets.nav_cart_icon} alt="cart"  className='w-4 opacity-50'/>
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">{getCartCount()}</button>
                </div>

               {!user ? (
                <button  onClick={()=>{
                    setshowUserLogin(false)
                }}
                className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-green-200 transition text-white rounded-full text-sm">
                    Login
                </button>):
                (
                 <div className='relative group'>
                    <img src={assets.profile_icon} alt="profile-icon" className='w-10'></img>  
                    <div className='hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-grey-200 py-2.5 w-30 rounded-md text-sm z-40'>
                       <ul>
                        <li onClick={()=>{
                            navigate('/myorders')
                        }} className='p-1.5 p1-3 hover:bg-primary/10 cursor-pointer'>My orders</li>
                        <li onClick={()=>{
                           setshowUserLogin(true)
                           logout()
                        }} className='p-1.5 p1-3 hover:bg-primary/10 cursor-pointer'>Logout </li>
                      </ul>
                    </div>
                    
                 </div>
                )}
            </div>
             
            <div className='flex items-center gap-8  sm:hidden'>
                 <div  onClick={()=>{
                    navigate('/cart')
                }} className="relative cursor-pointer">
                    <img src={assets.nav_cart_icon} alt="cart"  className='w-4 opacity-50'/>
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">{getCartCount()}</button>
                </div>

                <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="sm:hidden">
                {/* Menu Icon SVG */}
            <img src={assets.menu_icon} alt="menu" />
            </button>
            </div>
            

            {/* Mobile Menu */}

            
            <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
                <NavLink  to='/' className=" block">Home</NavLink>
                <NavLink  to='/products' className="block">All products</NavLink>
                {user && <NavLink  to='/myorders' className="block">My orders</NavLink>}
              
               
                {!user ? (
                <button  onClick={()=>{
                    setOpen(false)
                    setshowUserLogin(false)
                }}
                className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-green-200 transition text-white rounded-full text-sm">
                    Login
                </button>):(
                <button  onClick={()=>{
                    setshowUserLogin(true)
                    logout()
                }} className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-green-200 transition text-white rounded-full text-sm">
                   Logout
                </button>
                )}

       
                
            </div>

        </nav>
    )
}
  
export default Navbar
