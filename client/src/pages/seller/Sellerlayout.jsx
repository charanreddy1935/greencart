import React from 'react'
import { useAppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';
import { Link, NavLink,Outlet } from 'react-router-dom';
import toast from 'react-hot-toast';

const Sellerlayout = () => {
    const { axios,navigate,setIsSeller} = useAppContext();


    const sidebarLinks = [
        { name: "Add product", path: "/seller", icon: assets.add_icon },
        { name: "Product list", path: "/seller/product-list", icon: assets.product_list_icon },
        { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
    ];


    const logout =async ()=>{
        try {
           const {data} =await axios.post('/api/seller/logout',{
      withCredentials:true,
    })
          
           if(data.success){
            toast.success(data.message)
            setIsSeller(false);
            navigate('/')
           }else{
            toast.error(data.message)
           }

        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <>
            <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white transition-all duration-300">
                <Link to="/">
                    <img className="cursor-pointer w-34 md:w-38" src={assets.logo} alt="LogoColored" />
                </Link>
                <div className="flex items-center gap-5 text-gray-500">
                    <p>Hi! Admin</p>
                    <button onClick={() => logout()} className='border rounded-full text-sm px-4 py-1 cursor-pointer hover:bg-green-200'>Logout</button>
                </div>
            </div>
            <div className='flex'>
                <div className="md:w-64 w-16 border-r h-[95vh] text-base border-gray-300 pt-4 flex flex-col transition-all duration-300">
                    {sidebarLinks.map((item, index) => (
                        <NavLink to={item.path} key={index}
                            className={({ isActive }) =>
                                `flex items-center py-3 px-4 gap-3 ${isActive
                                    ? "border-r-4 md:border-r-[6px] bg-primary/10 border-primary text-primary"
                                    : "hover:bg-gray-100/90 border-white"
                                }`
                            }
                        >
                           <img src={item.icon} alt="icon" className='w-7 h-7' />
                            <p className="md:block hidden text-center">{item.name}</p>
                        </NavLink>
                    ))}
                </div>

                <div className="flex-1 p-4 md:p-8 overflow-y-auto">
                    <Outlet />
                </div>
            
            </div>
        </>
    );
}

export default Sellerlayout


