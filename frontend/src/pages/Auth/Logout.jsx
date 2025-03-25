import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const logoutSubmit = async () => {
    try {
      await axios.post("http://localhost:8080/api/v1/users/logout", {
        withCredentials: true,
      });
      localStorage.removeItem("token");
      navigate("/login");
      console.log("LoggedOut Successfully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <button
        className="bg-red-500 text-white px-4 py-2 cursor-pointer rounded-md shadow-md hover:bg-grey-600"
        onClick={logoutSubmit}
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
