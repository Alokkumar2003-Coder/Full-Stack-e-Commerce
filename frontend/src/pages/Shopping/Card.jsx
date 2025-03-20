import React from "react";
import puma from "../../../public/images/61VHvg7wvCL._SY500_.jpg"
const Interface = [
  {
    img:puma,
    title: "Mens Running Puma Shoes",
    description: "Puma Shoes for mens",
    category: "Men",
    subcategory: "bottomwear",
    size: "L",
    price: "Rs 1999.00",
    seller: "BestSeller",
  },
  {
    img:puma,
    title: "Mens Running Puma Shoes",
    description: "Puma Shoes for mens",
    category: "Men",
    subcategory: "bottomwear",
    size: "L",
    price: "Rs 1999.00",
    seller: "BestSeller",
  },
  {
    img:puma,
    title: "Mens Running Puma Shoes",
    description: "Puma Shoes for mens",
    category: "Men",
    subcategory: "bottomwear",
    size: "L",
    price: "Rs 1999.00",
    seller: "BestSeller",
  },
  {
    img:puma,
    title: "Mens Running Puma Shoes",
    description: "Puma Shoes for mens",
    category: "Men",
    subcategory: "bottomwear",
    size: "L",
    price: "Rs 1999.00",
    seller: "BestSeller",
  },
  {
    img:puma,
    title: "Mens Running Puma Shoes",
    description: "Puma Shoes for mens",
    category: "Men",
    subcategory: "bottomwear",
    size: "L",
    price: "Rs 1999.00",
    seller: "BestSeller",
  },
  {
    img:puma,
    title: "Mens Running Puma Shoes",
    description: "Puma Shoes for mens",
    category: "Men",
    subcategory: "bottomwear",
    size: "L",
    price: "Rs 1999.00",
    seller: "BestSeller",
  },
  {
    img:puma,
    title: "Mens Running Puma Shoes",
    description: "Puma Shoes for mens",
    category: "Men",
    subcategory: "bottomwear",
    size: "L",
    price: "Rs 1999.00",
    seller: "BestSeller",
  },
];
const Card = () => {
  return (
    <>
        {Interface.map((card, index) => (
          <div key={index} className="border p-4 shadow-lg flex flex-col text-left">
            <p className="z-10 cursor-pointer relative bottom-2 right-4 shadow-sm w-20 font-semibold bg-yellow-500 text-center text-sm text-white">{card.seller}</p>
            <img src={card.img} alt="" className="sm:h-full md:h-full min-w-32 relative bottom-6 "/>
            <h1 className="font-bold">{card.title}</h1>
            <p><span className="font-semibold">Category : </span> {card.category}</p>
            <p><span className="font-semibold">Size : </span> {card.size}</p>
            <p className="font-bold">{card.price}</p>
            <button className="cursor-pointer shadow-sm rounded-lg bg-yellow-500 text-white font-semibold p-1 mb-2 mt-2">Add to Cart</button>
            <button className="cursor-pointer shadow-sm rounded-lg bg-green-500 text-white font-semibold p-1">Buy Now</button>
          </div>
        ))}
    </>
  );
};

export default Card;
