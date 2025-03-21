import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, ShoppingBag, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-white border-b-1 p-4 flex justify-between items-center">
      <Link className="font-bold text-2xl flex items-center" to="/">
        <ShoppingBag /><span className="text-blue-600">E</span>-Sol
      </Link>

      <button
        className="md:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

  
      <div
        className={`absolute md:static top-16 left-0 w-full md:w-auto z-50 bg-white md:bg-white flex flex-col md:flex-row md:items-center gap-4 p-4 md:p-0 transition-transform font-semibold ${
          isMenuOpen ? "block" : "hidden md:flex"
        }`}
      >
        {isAuth ? (
          <>
            <Link to="/">Home</Link>
            <Link to="/men">Men</Link>
            <Link to="/women">Women</Link>
            <Link to="/kids">Kids</Link>
            <Link to="/accessories">Accessories</Link>
            <Link to="/footwear">Footwear</Link>
            <Link to="/search">Search</Link>
            <Link to="/admin">Admin</Link>
          </>
        ) : (
          <>
            <Link to="/login"><Button className="text-white cursor-pointer rounded-lg bg-blue-600 p-1 px-3 hover:bg-blue-700">Login</Button></Link>
            <Link to="/register"><Button className="text-white cursor-pointer rounded-lg bg-red-600 p-1 px-3 hover:bg-red-700">Register</Button></Link>
          </>
        )}
      </div>

      {isAuth && (
        <div className="flex gap-4 items-center">
          <Link to="/cart">
            <ShoppingCart />
          </Link>
          <button className="text-white rounded-lg bg-gray-700 p-1 px-3 hover:bg-gray-900">
            <Link to="profile/">Profile</Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
