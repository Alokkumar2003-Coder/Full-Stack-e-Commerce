import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../../redux/api/usersApiSlice";
import { toast } from "react-toastify";

const UserList = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();

  const [deleteUser] = useDeleteUserMutation();
  const [editableUserId, setEditableUserId] = useState(null);
  const [editableUserName, setEditableUserName] = useState("");
  const [editableUserEmail, setEditableUserEmail] = useState("");
  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure")) {
      try {
        await deleteUser(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const toggleEdit = (id, username, email) => {
    setEditableUserId(id);
    setEditableUserName(username);
    setEditableUserEmail(email);
  };

  const updateHandler = async (id) => {
    try {
      await updateUser({
        userId: id,
        username: editableUserName,
        email: editableUserEmail,
      });
      setEditableUserId(null);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="p-4 md:p-6">
      <div className="p-4 md:p-6 border shadow-lg rounded-lg overflow-x-auto">
        <h1 className="text-xl md:text-2xl font-semibold mb-4">Users</h1>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error?.data?.message || error.error}</Message>
        ) : (
          <div className="w-full">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-3 py-2 text-left text-sm md:text-base">NAME</th>
                  <th className="px-3 py-2 text-left text-sm md:text-base">EMAIL</th>
                  <th className="px-3 py-2 text-left text-sm md:text-base">ADMIN</th>
                  <th className="px-3 py-2 text-sm md:text-base"></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-b">
                    <td className="px-3 py-2">
                      {editableUserId === user._id ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={editableUserName}
                            onChange={(e) => setEditableUserName(e.target.value)}
                            className="w-full p-1 border rounded-md text-sm"
                          />
                          <button
                            onClick={() => updateHandler(user._id)}
                            className="bg-blue-500 text-white p-1 rounded-md"
                          >
                            <FaCheck />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          {user.username}
                          <button onClick={() => toggleEdit(user._id, user.username, user.email)}>
                            <FaEdit className="text-gray-600 hover:text-blue-500" />
                          </button>
                        </div>
                      )}
                    </td>
                    <td className="px-3 py-2">
                      {editableUserId === user._id ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={editableUserEmail}
                            onChange={(e) => setEditableUserEmail(e.target.value)}
                            className="w-full p-1 border rounded-md text-sm"
                          />
                          <button
                            onClick={() => updateHandler(user._id)}
                            className="bg-blue-500 text-white p-1 rounded-md"
                          >
                            <FaCheck />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <a href={`mailto:${user.email}`} className="text-blue-500 hover:underline">{user.email}</a>
                          <button onClick={() => toggleEdit(user._id, user.username, user.email)}>
                            <FaEdit className="text-gray-600 hover:text-blue-500" />
                          </button>
                        </div>
                      )}
                    </td>
                    <td className="px-3 py-2 text-center">
                      {user.isAdmin ? (
                        <FaCheck className="text-green-500" />
                      ) : (
                        <FaTimes className="text-red-500" />
                      )}
                    </td>
                    <td className="px-3 py-2">
                      {!user.isAdmin && (
                        <button
                          onClick={() => deleteHandler(user._id)}
                          className="bg-red-600 hover:bg-red-700 text-white font-bold p-1 rounded-md"
                        >
                          <FaTrash />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;