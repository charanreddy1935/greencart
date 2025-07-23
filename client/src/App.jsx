import React from 'react'
import Home from './pages/Home'
import Navbar
 from './components/Navbar'
 import { Routes, Route, useLocation } from 'react-router-dom';
 import {Toaster} from 'react-hot-toast'
import Footer from './components/Footer';
import { useAppContext } from './context/AppContext';
import Loginform from './components/Loginform';
import AllProducts from './pages/AllProducts';
import ProductCategory from './pages/ProductCategory';
import Productpage from './pages/Productpage';
import Cart from './pages/cart';
import Addaddress from './pages/Addaddress';
import Myorders from './pages/Myorders';
import Sellerlogin from './components/seller/Sellerlogin';
import Sellerlayout from './pages/seller/Sellerlayout';
import Orders from './pages/seller/Orders';
import ProductList from './pages/seller/ProductList';
import Addproduct from './pages/seller/Addproduct';
import Loading from './components/Loading';


function App() {

  const isSellerPath=useLocation().pathname.includes("seller");
  const {showUserLogin,isSeller}=useAppContext();


  return (
    <div className='text-default min-h-screen text-gray-700 bg-white'>
     
     {isSellerPath ? (null):(<Navbar/>)}
     {!showUserLogin ? (<Loginform/>): (null)}
     <Toaster></Toaster>
     <div className={`${isSellerPath ? "": "px-6 md:px-16 lg:px-24 xl:px-32"}`} >
       <Routes >
         <Route path='/' element={<Home />} />
         <Route path='/products' element={<AllProducts />} />
          <Route path='/products/:category' element={<ProductCategory />} />
          <Route path='/products/:category/:id' element={<Productpage />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/set-address' element={<Addaddress/>}/>
          <Route path='/myorders' element={<Myorders />} />
          <Route path='/loader' element={<Loading/>}/>
          <Route path='/seller' element={!isSeller ? <Sellerlogin /> : <Sellerlayout/>} >
             <Route index element={ isSeller ? <Addproduct/>:null} />
             <Route path='product-list' element={<ProductList/>} />
             <Route path='orders' element={<Orders />} />
          </Route>
        
        </Routes>
     </div>
     {isSellerPath ? (null):(<Footer/>)}

    </div>
  )
}

export default App
