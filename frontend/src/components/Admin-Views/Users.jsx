import React, { useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([{ id: {}, username: "", email: "" }]);

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="font-bold">Active Users</h1>
      <div className="mt-6 col bg-purple-400 rounded-lg p-4 shadow-md">
        <div className="List">
          <b className="text-lg">User List</b>
          {users.map((user) => (
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
                className="cursor-pointer bg-red-500 text-white px-3 py-1 rounded shadow-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Users;
