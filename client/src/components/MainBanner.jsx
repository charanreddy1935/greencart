import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const MainBanner = () => {
  return (
    <div className="relative mt-10">
      {/* Background Images */}
      <img
        src={assets.main_banner_bg}
        alt="mainbanner"
        className="w-full hidden md:block"
      />
      <img
        src={assets.main_banner_bg_sm}
        alt="mainbanner"
        className="w-full md:hidden"
      />

      {/* Overlay Content at Bottom */}
      <div className="absolute left-0 right-0 
      bottom-6 md:bottom-20
      md:top-1/2 md:-translate-y-1/2 
      md:left-12 md:right-auto
      flex flex-col 
      items-center md:items-start 
      text-center md:text-left 
      text-gray-600 
      px-4">
        <h1 className="text-3xl md:text-5xl font-bold max-w-[600px] leading-tight">
          Freshness you can Trust
        </h1>

        <div className="flex flex-wrap justify-center items-center gap-4 mt-6 font-medium">
          <Link
            to="/products"
            className="group flex items-center gap-2 px-7 md:px-9 py-3 bg-primary hover:bg-primary-dull transition rounded text-white cursor-pointer"
          >
            Shop Now
            <img
              className="transition group-hover:translate-x-1"
              src={assets.white_arrow_icon}
              alt="arrow"
            />
          </Link>

          <Link
            to="/products"
            className="group flex items-center gap-2 px-7 md:px-9 py-3 bg-white hover:bg-gray-100 transition rounded text-black cursor-pointer"
          >
            Explore Deals
            <img
              className="transition group-hover:translate-x-1"
              src={assets.black_arrow_icon}
              alt="arrow"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
