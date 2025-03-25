import React from "react";

const Card = ({ item }) => {
  return (
    <div className="border p-4 shadow-lg flex flex-col text-left hover:scale-102 duration-300">
      <p className="z-10 cursor-pointer relative bottom-2 right-4 shadow-sm w-20 font-semibold bg-yellow-500 text-center text-sm text-white">
        {item.seller}
      </p>
      <img
        src={item.img}
        alt={item.title}
        className="sm:h-full md:h-full min-w-32 relative bottom-6"
      />
      <h1 className="font-bold">{item.title}</h1>
      <p>
        <span className="font-semibold">Category: </span> {item.category}
      </p>
      <p>
        <span className="font-semibold">Size: </span> {item.size}
      </p>
      <p className="font-bold">{item.price}</p>
      <button className="cursor-pointer shadow-sm rounded-lg bg-yellow-500 text-white font-semibold p-1 mb-2 mt-2">
        Add to Cart
      </button>
      <button className="cursor-pointer shadow-sm rounded-lg bg-green-500 text-white font-semibold p-1">
        Buy Now
      </button>
    </div>
  );
};

export default Card;
