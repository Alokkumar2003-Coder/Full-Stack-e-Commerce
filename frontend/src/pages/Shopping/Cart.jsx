import React, { useState } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  const shippingFee = 10.0;
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const total = cartItems.length > 0 ? subtotal + shippingFee : 0;

  let cartContent;

  if (cartItems.length === 0) {
    cartContent = <p className="text-gray-500 mt-4">Your cart is empty.</p>;
  } else {
    <div className="mt-4 space-y-4">
      {cartItems.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-16 h-16 object-cover rounded"
          />
          <div className="flex-1 ml-4">
            <span className="font-semibold text-lg">{item.name}</span>
          </div>
          <span className="font-semibold">₹{item.price}</span>
        </div>
      ))}
    </div>;
  }

  return (
    <div className="p-6 min-h-screen bg-[wheat]">
      <h1 className="text-3xl font-bold">
        Cart-Items<span className="text-pink-500">.</span>
      </h1>
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-black border-b pb-2">
          YOUR CART
        </h2>

        {cartContent}

        <div className="mt-8 border-t pt-4">
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
          <button className="mt-6 w-half bg-black text-white py-3 text-lg font-semibold rounded">
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
