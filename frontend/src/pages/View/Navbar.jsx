import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, ShoppingBag, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isAuth, setIsAuth] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to close the menu
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="bg-white border-b-1 p-4 flex justify-between items-center">
      <Link className="font-bold text-2xl flex items-center" to="/">
        <ShoppingBag />
        <span className="text-blue-600">E</span>-Sol
      </Link>

      {/* Menu Button (Toggle Menu Open/Close) */}
      <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Navigation Menu */}
      <div
        className={`absolute md:static top-16 left-0 w-full md:w-auto z-50 bg-white flex flex-col md:flex-row md:items-center gap-4 p-4 md:p-0 transition-transform font-semibold ${
          isMenuOpen ? "block" : "hidden md:flex"
        }`}
      >
        {isAuth ? (
          <>
            <Link to="/" onClick={closeMenu}>Home</Link>
            <Link to="/men" onClick={closeMenu}>Men</Link>
            <Link to="/women" onClick={closeMenu}>Women</Link>
            <Link to="/kids" onClick={closeMenu}>Kids</Link>
            <Link to="/accessories" onClick={closeMenu}>Accessories</Link>
            <Link to="/footwear" onClick={closeMenu}>Footwear</Link>
            <Link to="/search" onClick={closeMenu}>Search</Link>
            <Link to="/admin" onClick={closeMenu}>Admin</Link>
            <Link
              to="profile/"
              className="text-white rounded-lg bg-gray-700 p-1 px-3 hover:bg-gray-900"
              onClick={closeMenu}
            >
              Profile
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" onClick={closeMenu}>
              <Button className="text-white cursor-pointer rounded-lg bg-blue-600 p-1 px-3 hover:bg-blue-700">
                Login
              </Button>
            </Link>
            <Link to="/register" onClick={closeMenu}>
              <Button className="text-white cursor-pointer rounded-lg bg-red-600 p-1 px-3 hover:bg-red-700">
                Register
              </Button>
            </Link>
          </>
        )}
      </div>

      <div className="cart-img text-2xl font-semibold">
        <Link to="/cart">
          <ShoppingCart size={32} strokeWidth={2.5} className="text-black" />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
