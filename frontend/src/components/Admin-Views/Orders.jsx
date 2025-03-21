import { Title } from "@radix-ui/react-toast";
import React from "react";

const Orders = () => {
  return (
    <div className="">
      <div className="text-2xl">
        <Title text1={"My"} text2={"ORDERS"} />
      </div>
      <div className="h-full">
        <b>Order Page</b>
        {[...Array(100)].map((_, index) => (
          <div
            key={index}
            className="mt-5 py-4 border rounded p-4 text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              
            <div className="flex items-start gap-6 text-sm">
              <img
                className="w-20 mx-2"
                src="/images/banner1.webp"
                alt=""
              />

              <div className="flex flex-col gap-2">
                <div className="w-40 h-4 bg-gray-200 ">
                  <p className="py-0.5">{}</p>
                </div>
                <p className="mt-3 mb-2 font-medium bg-white">Name</p>
                <div className="w-24 h-4 bg-gray-200 ">
                  <p className="px-2">{}</p>
                </div>
              </div>
              <div>
                <p className="mx-8 text-sm sm:text-[15px]">Items : {}</p>
                <p className="mx-8 mt-3">Method :{} </p>
                <p className="mx-8 mt-1">Payment : {}</p>
                <p className="mx-8 mt-1">Date :{}</p>
              </div>
              <p className="mx-30 text-sm sm:text-[15px]">{"Prize"}</p>
            </div>
            <select className="p-2 font-semibold">
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
