import React from "react";

const images = [
    {
      src: "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/1Fandom-Naruto_fLzfBZB.jpg?format=webp&w=480&dpr=1.3",
      alt: "Naruto"
    },
    {
      src: "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/Fandom-tiles-batman_7nSFimM.jpg?format=webp&w=480&dpr=1.3",
      alt: "Batman"
    },
    {
      src: "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/Fandom-tiles-black-panther_u9BDF16.jpg?format=webp&w=480&dpr=1.3",
      alt: "Black Panther"
    }
  ];

const ShopByFandomPage = () => {
  return (
    <div className="">
      <div className="text-3xl text-gray-900 font-faturaLight uppercase flex justify-center items-center mt-16">
        Shop By Fandom
      </div>
      <div className="max-w-full grid  sm:grid-cols-3 max-sm:grid-rows-3 place-items-center m-5 max-sm:m-3 mt-10 sm:gap-x-5">
      {images.map((image, index) => (
          <div key={index} className="cursor-pointer">
            <img className="max-w-full sm:h-[458px] h-[360px] sm:object-cover object-contain" src={image.src} alt={image.alt} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopByFandomPage;
