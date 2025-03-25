import React, { useState, useEffect } from "react";
import Logout from "../Auth/Logout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Profile = () => {
  const [user, setUser] = useState({});
  const [username, setUsername] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const fetchDetails = async () => {
    try {
      const token = localStorage.getItem("token"); 
  
      if (!token) {
        toast.error("Unauthorized! Please log in.");
        return;
      }
  
      const response = await axios.get(
        "http://localhost:8080/api/v1/users/user-details",
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        }
      );
  
      setUser(response.data);
      setUsername(response.data.username);
      toast.success("Profile loaded successfully");
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Session expired! Please log in again.");
        localStorage.removeItem("token"); 
      } else {
        toast.error(error.response?.data?.message || "Failed to load profile.");
      }
    }
  };
  

  useEffect(() => {
    fetchDetails(); 
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:8080/api/v1/users/update-profile",
        { username },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      toast.success(response.data.message);
      setIsEditing(false);
      fetchDetails(); 
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed.");
    }
  };

  return (
    <div className="h-screen p-6">
      <ToastContainer position="top-right" draggable />
      <div className="border shadow-xl p-10">
        <h2 className="text-center text-xl font-bold mb-4">Profile Section</h2>
        <hr className="w-full border-t-4 border-purple-500 my-4" />
        <div className="mb-4">
          <label className="text-black font-bold">Username :</label>
          {isEditing ? (
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 text-red-500 font-semibold p-2 w-full border rounded"
            />
          ) : (
            <p className="mt-1 text-red-500 font-semibold text-lg">{user.username}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="text-black font-bold">Email :</label>
          <p className="mt-1 text-lg font-semibold">{user.email}</p>
        </div>
        <div className="mb-4">
          <label className="text-black font-bold">Address :</label>
          <p className="mt-1 text-lg font-semibold">{user.address || "N/A"}</p>
        </div>
        <div className="mb-4">
          <label className="text-black font-bold">Total Orders :</label>
          <p className="mt-1 text-lg font-semibold">{user.totalOrders || 0}</p>
        </div>
        <div className="flex justify-between">
          <div className="space-x-2">
            {isEditing ? (
              <button
                onClick={handleSave}
                className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Save
              </button>
            ) : (
              <button
                onClick={handleEdit}
                className="cursor-pointer bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-900"
              >
                Edit Profile
              </button>
            )}
          </div>
          <div>
            <Logout />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
