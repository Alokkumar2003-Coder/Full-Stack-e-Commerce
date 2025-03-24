import React, { useState } from "react";

const Search = () => {
  const [search, setSearch] = useState("");

  const items = [
    "Shoes",
    "T-Shirts",
    "Watches",
    "Jeans",
    "Shirts",
    "Laptops",
    "Mobiles",
  ];

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="border-t border-b bg-gray-50 text-center p-4">
      {/* Search Box */}
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2 bg-white">
        <input
          className="flex-1 outline-none bg-inherit text-sm"
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <img
          className="w-4"
          src="https://cdn-icons-png.flaticon.com/512/482/482631.png"
          alt="Search Icon"
        />
      </div>

      {/* Filtered List */}
      <ul className="text-left max-w-xs mx-auto">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <li key={index} className="p-2 border-b last:border-0">
              {item}
            </li>
          ))
        ) : (
          <li className="p-2 text-gray-500">No items found</li>
        )}
      </ul>
    </div>
  );
};

export default Search;
