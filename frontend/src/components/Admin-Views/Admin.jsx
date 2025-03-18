import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

const Admin = () => {
  const location = useLocation();

  return (
    <div className="h-screen bg-blue-200 flex">
      <nav className="bg-white p-10 h-full w-60 shadow-lg">
        <ul className="flex flex-col gap-6">
          <li>
            <NavLink
              to="dashboard"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-bold" : "text-gray-700"
              }
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
            >
              Orders
            </NavLink>
          </li>
          <li>
            <NavLink
              to="products"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-bold" : "text-gray-700"
              }
            >
              Products
            </NavLink>
          </li>
        </ul>
      </nav>

      <main className="flex-1 p-6 bg-white shadow-md">
        {location.pathname === "/admin" ? (
          <div className="flex justify-center items-center h-screen">
            <h1 className="text-2xl font-bold text-gray-800 text-center">
              Welcome to the Admin Panel
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
