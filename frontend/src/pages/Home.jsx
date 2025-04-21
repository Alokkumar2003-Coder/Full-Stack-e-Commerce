import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, error, isError } = useGetProductsQuery({ keyword });

  return (
    <div className="w-full bg-gray-800 text-white">
      {!keyword && <Header />}

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {error?.data?.message || error?.message || "Something went wrong"}
        </Message>
      ) : (
        <>
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold mb-6">Special Products</h1>

            <Link
              to="/shop"
              className="bg-blue-600 text-white font-bold rounded-full py-2 px-10 hover:bg-blue-700 transition"
            >
              Shop
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
            {data?.products?.length > 0 ? (
              data.products.map((product) => (
                <div key={product._id} className="p-4">
                  <Product product={product} />
                </div>
              ))
            ) : (
              <Message variant="info">No products found.</Message>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
