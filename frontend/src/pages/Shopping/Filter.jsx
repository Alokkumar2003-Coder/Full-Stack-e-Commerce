import React from "react";

const Filter = () => {
  return (
    <div className="w-64 p-4 bg-white shadow-lg">
      <h2 className="text-xl font-semibold border-b pb-2">Filters</h2>
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Brand</h3>
        <div className="flex flex-col space-y-2 text-gray-700">
          <label className="flex items-center">
            <input type="checkbox" className="cursor-pointer mr-2" /> Nike
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="cursor-pointer mr-2" /> Adidas
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="cursor-pointer mr-2" /> Puma
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="cursor-pointer mr-2" /> Levi's
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="cursor-pointer mr-2" /> Zara
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="cursor-pointer mr-2" /> H&M
          </label>
        </div>
      </div>
      <button className="cursor-pointer w-full mt-6 bg-blue-600 text-white p-2 rounded font-semibold">
        Apply Filters
      </button>
    </div>
  );
};

export default Filter;
