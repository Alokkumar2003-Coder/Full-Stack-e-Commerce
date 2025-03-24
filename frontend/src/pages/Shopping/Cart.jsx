import React, { useState } from "react";
import shoe from "../../../public/images/61VHvg7wvCL._SY500_.jpg";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Mens Puma Sports Running Shoes", price: 3499, quantity: 2 },
    { id: 2, name: "Mens Puma Sports Running Shoes", price: 3499, quantity: 2 },
  ]);

  const shippingFee = 10.0;
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const total = cartItems.length > 0 ? subtotal + shippingFee : 0;

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl font-bold">
        Cart Items<span className="text-pink-500">.</span>
      </h1>

      <div className="mt-8 border-t">
        {cartItems.length === 0 ? (
          <h2 className="text-xl font-semibold text-black mt-4">
            Your Cart is Empty
          </h2>
        ) : (
          <div className="mt-4">
            {cartItems.map((cart, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-center justify-between border p-4 rounded-lg shadow-md bg-white mb-4"
              >
              
                <img
                  src={shoe}
                  alt="Shoe"
                  className="w-24 h-24 sm:w-20 sm:h-20 object-cover rounded-md"
                />

               
                <div className="flex-1 text-center sm:text-left sm:ml-4">
                  <h2 className="text-lg font-semibold">{cart.name}</h2>
                  <p className="text-gray-600">₹ {cart.price}</p>
                </div>

                <div className="flex items-center my-2 sm:my-0">
                  <button className="cursor-pointer px-3 py-1 bg-gray-200 text-lg font-bold rounded-l">
                    -
                  </button>
                  <span className="px-4">{cart.quantity}</span>
                  <button className="cursor-pointer px-3 py-1 bg-gray-200 text-lg font-bold rounded-r">
                    +
                  </button>
                </div>

              
                <button className="cursor-pointer mt-2 ml-1 sm:mt-0 bg-red-500 text-white px-3 py-1 rounded-md">
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 pt-4 border-t">
          <h2 className="text-xl font-semibold text-black">CART TOTALS</h2>
          <div className="flex justify-between mt-2">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mt-2">
            <span>Shipping Fee</span>
            <span>₹{shippingFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg mt-4">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
          <Link to="/myorders">
          <button className="cursor-pointer mt-6 w-full sm:w-auto bg-blue-500 text-white p-2 text-lg font-semibold rounded">
            Proceed To Checkout
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
