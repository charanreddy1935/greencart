import React from 'react';
import { assets, features } from '../assets/assets';

const BottomBanner = () => {
  return (
    <div className="relative mt-24">
      {/* Background Images */}
      <img
        src={assets.bottom_banner_image}
        alt="bottom banner"
        className="w-full hidden md:block"
      />
      <img
        src={assets.bottom_banner_image_sm}
        alt="bottom banner small"
        className="w-full md:hidden"
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col items-center md:items-end md:justify-center pt-16 md:pt-0 md:pr-24">
        <div className="max-w-xl">
          <h1 className="text-2xl text-primary md:text-3xl font-bold mb-6 text-center md:text-right">
            WHY WE ARE THE BEST?
          </h1>

          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start gap-4 mt-4 transition-transform hover:translate-x-1"
            >
              <img
                src={feature.icon}
                alt="icon"
                className="md:w-11 w-8 transition-transform duration-300 hover:scale-110"
              />
              <div>
                <h3 className="font-semibold text-lg">{feature.title}</h3>
                <p className="text-sm md:text-base">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BottomBanner;
