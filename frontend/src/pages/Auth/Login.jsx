import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.email || !data.password) {
      return toast.error("All fields are required!");
    }
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/users/login",
        data,
        {
          withCredentials: true,
        }
      );
      const { isAdmin } = response.data;
      navigate(isAdmin ? "/admin" : "/");
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div className="bg-gradient-to-r from-orange-300 to-red-500  h-screen flex justify-center items-center">
      <ToastContainer position="top-right" draggable />
      <div className="flex flex-col px-8 py-6 rounded-lg shadow-lg bg-white w-96">
        <h1 className="text-2xl font-bold mb-6 mt-2">Login E-Sol</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Email . . ."
            className="border rounded p-2"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="Enter Password . . ."
            className="border rounded p-2"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          <Button
            className="cursor-pointer rounded p-5 bg-blue-600 hover:bg-blue-700"
            type="submit"
          >
            Login
          </Button>
          <p className="text-sm text-center">
            Doesn't have an account?{" "}
            <Link to="/register" className="text-red-600 font-semibold">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
