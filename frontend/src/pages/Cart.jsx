import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <div className="p-4 md:p-6 flex justify-center">
      <div className="w-full max-w-4xl mt-6">
        {cartItems.length === 0 ? (
          <div className="text-center">
            <p className="text-lg font-medium">Your cart is empty</p>
            <Link to="/shop" className="text-blue-500 underline">
              Go To Shop
            </Link>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-semibold mb-4 text-center md:text-left">
              Shopping Cart
            </h1>

            <div className="flex flex-col gap-4">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col md:flex-row items-center md:justify-between w-full p-4 border rounded-lg shadow-lg gap-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded"
                  />

                  <div className="flex-1 text-center md:text-left">
                    <Link to={`/product/${item._id}`} className="text-blue-500 font-medium">
                      {item.name}
                    </Link>
                    <p className="text-gray-600 mt-1">{item.brand}</p>
                    <p className="text-red-500 font-bold mt-1">${item.price}</p>
                  </div>

                  <select
                    className="w-20 p-1 border rounded text-black"
                    value={item.qty}
                    onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>

                  <button
                    className="text-red-500"
                    onClick={() => removeFromCartHandler(item._id)}
                  >
                    <FaTrash className="text-lg" />
                  </button>
                </div>
              ))}

              <div className="mt-6 p-4 border rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold">
                  Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                </h2>

                <p className="text-2xl font-bold">
                  ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                </p>

                <button
                  className="bg-green-500 text-white mt-4 py-2 px-4 rounded-full text-lg w-full disabled:opacity-50"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
