import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({ productId, rating, comment }).unwrap();
      refetch();
      toast.success("Review created successfully");
    } catch (error) {
      toast.error(error?.data || error.message);
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  return (
    <div className="p-4 md:p-6 flex flex-col items-center">
      <Link to="/" className="font-semibold hover:underline mb-4 self-start">
        Go Back
      </Link>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.message || error.message}</Message>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-5xl">
          <div className="relative w-full">
            <img src={product.image} alt={product.name} className="w-full rounded-lg" />
            <HeartIcon product={product} className="absolute top-4 right-4" />
          </div>

          <div className="flex flex-col">
            <h2 className="text-2xl font-semibold">{product.name}</h2>
            <p className="my-4 text-gray-500">{product.description}</p>
            <p className="text-4xl font-bold text-green-600">$ {product.price}</p>

            <div className="grid grid-cols-2 gap-4 my-6">
              <div>
                <p className="flex items-center"><FaStore className="mr-2 text-gray-600" /> Brand: {product.brand}</p>
                <p className="flex items-center"><FaClock className="mr-2 text-gray-600" /> Added: {moment(product.createdAt).fromNow()}</p>
                <p className="flex items-center"><FaStar className="mr-2 text-gray-600" /> Reviews: {product.numReviews}</p>
              </div>
              <div>
                <p className="flex items-center"><FaStar className="mr-2 text-gray-600" /> Ratings: {rating}</p>
                <p className="flex items-center"><FaShoppingCart className="mr-2 text-gray-600" /> Quantity: {product.quantity}</p>
                <p className="flex items-center"><FaBox className="mr-2 text-gray-600" /> In Stock: {product.countInStock}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Ratings value={product.rating} text={`${product.numReviews} reviews`} />
              {product.countInStock > 0 && (
                <select
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  className="p-2 border rounded-lg"
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                  ))}
                </select>
              )}
            </div>

            <button
              onClick={addToCartHandler}
              disabled={product.countInStock === 0}
              className="bg-green-600 text-white py-2 px-4 rounded-lg mt-4 w-full md:w-auto"
            >
              Add To Cart
            </button>
          </div>

          <div className="lg:col-span-2 mt-6 w-full">
            <ProductTabs
              loadingProductReview={loadingProductReview}
              userInfo={userInfo}
              submitHandler={submitHandler}
              rating={rating}
              setRating={setRating}
              comment={comment}
              setComment={setComment}
              product={product}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
