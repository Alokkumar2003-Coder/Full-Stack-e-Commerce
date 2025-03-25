import React, { useState } from "react";
import { Search } from "lucide-react";

const Searchs = () => {
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
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2 bg-white">
        <input
          className="flex-1 outline-none bg-inherit text-sm"
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Search />
      </div>

      <ul className="text-left max-w-xs mx-auto">
        {search.trim() ? (
          filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <li key={index} className="p-2 border-b last:border-0">
                {item}
              </li>
            ))
          ) : (
            <li className="p-2 text-gray-500">No items found</li>
          )
        ) : (
          <li className="p-4 text-gray-500"></li>
        )}
      </ul>
    </div>
  );
};

export default Searchs;
