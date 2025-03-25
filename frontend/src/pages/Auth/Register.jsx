import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.username || !data.email || !data.password) {
      return toast.error("All fields are required!");
    }
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/users/register",
        data,
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed!");
    }
  };

  return (
    <div className="bg-gradient-to-r from-violet-300 to-indigo-500 h-screen flex justify-center items-center">
      <ToastContainer position="top-right" draggable />
      <div className="flex flex-col px-8 py-6 rounded-lg shadow-lg bg-white w-96">
        <h1 className="text-2xl font-bold mb-6 mt-2">Register E-Sol</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Username . . ."
            className="border rounded p-2"
            value={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
          />
          <input
            type="email"
            placeholder="Enter Email . . ."
            className="border rounded p-2"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Enter Password . . ."
            className="border rounded p-2"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          <Button
            className="cursor-pointer rounded p-5 bg-red-600 hover:bg-red-700"
            type="submit"
          >
            Register
          </Button>
          <p className="text-sm text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 font-semibold">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
