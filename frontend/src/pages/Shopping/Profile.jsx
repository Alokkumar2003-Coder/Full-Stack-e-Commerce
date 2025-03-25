import React, { useState } from "react";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="mt-2 max-w-md mx-auto p-4 shadow-lg rounded-lg border border-purple-500">
      <h2 className="text-center text-xl text-[purple] font-bold mb-4">
        Profile Section
      </h2>
      <b>
        <hr className="w-full border-t-4 border-black my-4" />
      </b>
      <div className="mb-4">
        <label className="text-[] font-bold">Username :</label>
        {isEditing ? (
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 text-red-500 font-semibold p-2 w-full border rounded"
          />
        ) : (
          <p className="mt-1 text-red-500 font-semibold text-lg font-semibold">{username}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="text-black font-bold">Email :</label>
        <p className="mt-1 text-lg font-semibold">{}</p>
      </div>
      <div className="mb-4">
        <label className="text-black font-bold">Address :</label>
        <p className="mt-1 text-lg font-semibold">{}</p>
      </div>
      <div className="mb-4">
        <label className="text-black font-bold">Total Orders :</label>
        <p className="mt-1 text-lg font-semibold">{}</p>
      </div>
      <div className="flex justify-end space-x-2">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save
          </button>
        ) : (
          <button
            onClick={handleEdit}
            className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-black"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
