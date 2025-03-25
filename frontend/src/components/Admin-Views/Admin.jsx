import React, { useState } from "react";
import { NavLink, Outlet, useLocation, Link } from "react-router-dom"; // Import Link
import Logout from "../../pages/Auth/Logout";
import { Menu, X, ArrowLeft } from "lucide-react"; // Import ArrowLeft
import Bg from "../../../public/images/admin-img.png";

const Admin = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <nav
        className={`fixed inset-y-0 left-0 z-50 bg-white p-6 w-64 shadow-lg transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:w-60`}
      >
        <Link to="/" className="text-black hover:text-black">
          <ArrowLeft size={25} />
        </Link>
        <div className="flex justify-between items-center">
          <h2 className="mt-6 text-lg font-bold ml-0">Admin Panel</h2>
          <button className="md:hidden" onClick={() => setIsSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <ul className="flex flex-col gap-6 mt-6">
          <li>
            <NavLink
              to="dashboard"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-bold" : "text-gray-700"
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="orders"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-bold" : "text-gray-700"
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              Orders
            </NavLink>
          </li>
          <li>
            <NavLink
              to="users"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-bold" : "text-gray-700"
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              Active Users
            </NavLink>
          </li>
          <Logout />
        </ul>
      </nav>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 left-64 right-0 bg-black bg-opacity-30 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <main className="flex-1 bg-white shadow-md">
        <button
          className="md:hidden mb-4 text-gray-700"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu size={24} className="absolute top-1 left-1" />
        </button>

        {location.pathname === "/admin" ? (
          <div className="bg-green-200 flex flex-col justify-center items-center h-screen">
            <img src={Bg} alt="" className="h-96" />
            <h1 className="text-3xl font-bold text-center p-2">
              Welcome To The Admin Panel
            </h1>
          </div>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
};

export default Admin;
