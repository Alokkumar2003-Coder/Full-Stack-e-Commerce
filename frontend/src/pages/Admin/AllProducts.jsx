import { Link } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";

const AllProducts = () => {
  const { data: products, isLoading, isError } = useAllProductsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading products</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col">
        {/* Product List */}
        <div className="w-full p-3">
          <div className="text-xl font-bold mb-4">
            All Products ({products.length})
          </div>

          <div className="flex flex-col gap-6">
            {products.map((product) => (
              <Link
                key={product._id}
                to={`/admin/product/update/${product._id}`}
                className="block overflow-hidden border rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row justify-center items-center p-2">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full md:w-40 md:h-20 h-40 object-cover"
                  />
                  <div className="p-4 flex flex-col justify-between w-full">
                    <div className="flex flex-col sm:flex-row justify-between gap-2">
                      <h5 className="text-lg font-semibold">{product?.name}</h5>
                      <p className="text-gray-400 text-xs">
                        {moment(product.createdAt).format("MMMM Do YYYY")}
                      </p>
                    </div>

                    <p className="text-gray-500 text-sm mt-2 line-clamp-3">
                      {product?.description?.substring(0, 160)}...
                    </p>

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 gap-2">
                      <Link
                        to={`/admin/product/update/${product._id}`}
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-pink-700 rounded-lg hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
                      >
                        Update Product
                        <svg
                          className="w-3.5 h-3.5 ml-2"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 10"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                          />
                        </svg>
                      </Link>
                      <p className="text-base font-semibold text-gray-700">
                        $ {product?.price}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
