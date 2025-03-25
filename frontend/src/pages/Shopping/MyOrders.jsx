import React, { useEffect, useState } from "react";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">My Orders</h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-700 uppercase text-sm">
                <th className="py-3 px-4 border">Order Name</th>
                <th className="py-3 px-4 border">Date</th>
                <th className="py-3 px-4 border">Status</th>
                <th className="py-3 px-4 border">Total</th>
                <th className="py-3 px-4 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index} className="text-gray-900 text-center border-b hover:bg-gray-50">
                  <td className="py-3 px-4 border">{order.name}</td>
                  <td className="py-3 px-4 border">{new Date(order.date).toLocaleDateString()}</td>
                  <td className="py-3 px-4 border">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 border">₹{order.total}</td>
                  <td className="py-3 px-4 border">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition"
                      onClick={() => alert(`Viewing Order ${order.name}`)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
