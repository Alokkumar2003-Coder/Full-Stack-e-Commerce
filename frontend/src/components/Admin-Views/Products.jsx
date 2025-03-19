import React, { useState } from "react";
import { Title } from "@radix-ui/react-toast";

const Users = () => {
  const [users, setUsers] = useState([{ id: {}, username: "", email: "" }]);

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleChange = (index, field, value) => {
    const newUsers = [...users];
    newUsers[index][field] = value;
    setUsers(newUsers);
  };

  return (
<div className="mt-6 col bg-purple-700 rounded-lg p-4 shadow-md">
<button className="absolute top-1 right-5.5 bg-black text-white px-4 py-2 rounded-md shadow-md hover:bg-grey-600">
        Logout
      </button>
      <div className="List">
        <b className="text-lg">User List</b>
        {users.map((user, index) => (
          <div
            key={user.id}
            className="mt-5 py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-4 rounded-lg shadow-md"
          >
            <div className="flex items-start gap-6 text-sm">
              <div className="flex flex-col gap-2">
                <label className="font-bold">Username</label>
              </div>
            </div>
            <div> 
            <div className="flex flex-col gap-2">
                <label className="font-bold">Email</label>
              </div>
            </div>
            <button
              onClick={() => handleDelete(user.id)}
              className="bg-red-500 text-white px-3 py-1 rounded shadow-md hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;