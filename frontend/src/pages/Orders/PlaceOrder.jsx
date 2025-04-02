import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import ProgressSteps from "../../components/ProgressSteps";
import Loader from "../../components/Loader";
import { useCreateOrderMutation } from "../../redux/api/orderApiSlice";
import { clearCartItems } from "../../redux/features/cart/cartSlice";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="p-6">
      <ProgressSteps step1 step2 step3 />

      <div className="container mx-auto px-4 md:px-8 lg:px-12 mt-6">
        {cart.cartItems.length === 0 ? (
          <Message>Your cart is empty</Message>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm md:text-base">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-3 py-2 text-left">Image</th>
                  <th className="px-3 py-2 text-left">Product</th>
                  <th className="px-3 py-2 text-left">Quantity</th>
                  <th className="px-3 py-2 text-left">Price</th>
                  <th className="px-3 py-2 text-left">Total</th>
                </tr>
              </thead>

              <tbody>
                {cart.cartItems.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    </td>

                    <td className="p-2">
                      <Link to={`/product/${item.product}`} className="text-blue-500">
                        {item.name}
                      </Link>
                    </td>
                    <td className="p-2">{item.qty}</td>
                    <td className="p-2">${item.price.toFixed(2)}</td>
                    <td className="p-2 font-semibold">${(item.qty * item.price).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Order Summary Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-5">Order Summary</h2>

          <div className="bg-gray-800 text-white p-6 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-6">
            <ul className="text-lg space-y-3">
              <li>
                <span className="font-semibold">Items:</span> ${cart.itemsPrice}
              </li>
              <li>
                <span className="font-semibold">Shipping:</span> ${cart.shippingPrice}
              </li>
              <li>
                <span className="font-semibold">Tax:</span> ${cart.taxPrice}
              </li>
              <li>
                <span className="font-semibold">Total:</span> ${cart.totalPrice}
              </li>
            </ul>

            {error && <Message variant="danger">{error.data.message}</Message>}

            <div>
              <h2 className="text-xl font-semibold mb-2">Shipping</h2>
              <p className="text-gray-300">
                <strong>Address:</strong> {cart.shippingAddress.address},{" "}
                {cart.shippingAddress.city} {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Payment Method</h2>
              <p className="text-gray-300">
                <strong>Method:</strong> {cart.paymentMethod}
              </p>
            </div>
          </div>

          <button
            type="button"
            className="bg-green-500 text-white py-2 px-4 rounded-full text-lg w-full mt-6 hover:bg-green-600 transition disabled:opacity-50"
            disabled={cart.cartItems.length === 0}
            onClick={placeOrderHandler}
          >
            Place Order
          </button>

          {isLoading && <Loader />}
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
