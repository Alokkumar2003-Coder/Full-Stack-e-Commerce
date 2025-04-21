import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";
import Product from "./Product";

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct);

  return (
    <div className="px-8">
      <h1 className="mb-4 text-lg font-bold ml-[1rem] mt-[3rem]">
        FAVORITE PRODUCTS
      </h1>

      <div className="gap-4 flex flex-wrap w-2/3">
        {favorites.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
