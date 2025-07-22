import React from 'react'
import MainBanner from '../components/MainBanner'
import Categories from '../components/Categories'
import BestSellers from '../components/BestSellers'
import BottomBanner from '../components/BottomBanner'
import Newsletter from '../components/newsletter'


const Home = () => {
  return (
     <div>
      <MainBanner></MainBanner>
      <Categories></Categories>
      <BestSellers></BestSellers>
      <BottomBanner></BottomBanner>
      <Newsletter></Newsletter>
    </div>
  )
}

export default Home
