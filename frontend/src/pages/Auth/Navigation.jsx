import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import FavoritesCount from "../Products/FavoritesCount";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-black text-white w-full">
      <div className="flex space-x-4 items-center">
        <Link to="/" className="hover:text-gray-300">
          <AiOutlineHome size={26} />
        </Link>
        <Link to="/shop" className="hover:text-gray-300">
          <AiOutlineShopping size={26} />
        </Link>
        <Link to="/cart" className="relative hover:text-gray-300">
          <AiOutlineShoppingCart size={26} />
          {cartItems.length > 0 && (
            <span className="absolute top-0 right-0 px-1 text-sm bg-pink-500 rounded-full">
              {cartItems.reduce((a, c) => a + c.qty, 0)}
            </span>
          )}
        </Link>
        <Link to="/favorite" className="hover:text-gray-300 relative">
          <FaHeart size={20} />
          <FavoritesCount />
        </Link>
      </div>
      <div className="relative">
        {userInfo ? (
          <button onClick={toggleDropdown} className="focus:outline-none">
            {userInfo.username}
          </button>
        ) : (
          <div className="flex space-x-4">
            <Link to="/login" className="hover:text-gray-300">
              <AiOutlineLogin size={26} />
            </Link>
            <Link to="/register" className="hover:text-gray-300">
              <AiOutlineUserAdd size={26} />
            </Link>
          </div>
        )}
        {dropdownOpen && userInfo && (
          <ul className="w-36 z-50 absolute right-0 mt-2 bg-white text-gray-600 p-2 shadow-lg rounded-lg">
            {userInfo.isAdmin && (
              <>
                <li>
                  <Link
                    to="/admin/dashboard"
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/productlist"
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    className="block px-4 py-2 hover:bg-gray-200"
                    to="/admin/allproductslist"
                  >
                    All Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/categorylist"
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    Category
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/orderlist"
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/userlist"
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    Users
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link to="/profile" className="block px-4 py-2 hover:bg-gray-200">
                Profile
              </Link>
            </li>
            <li>
              <button
                onClick={logoutHandler}
                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
              >
                Logout
              </button>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
