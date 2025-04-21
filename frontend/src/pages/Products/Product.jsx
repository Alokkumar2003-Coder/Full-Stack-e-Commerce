import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="w-full p-4 rounded-lg bg-white text-black cursor-pointer flex flex-col justify-between shadow-lg hover:scale-105 transition duration-300 ease-in-out">
      <div className="relative mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="h-40 w-full"
        />
        <HeartIcon product={product} />
      </div>

      <div className="">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex justify-between items-center">
            <div className="text-sm w-40">{product.name}</div>
            <span className=" text-md font-semibold">
              $ {product.price}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default Product;
