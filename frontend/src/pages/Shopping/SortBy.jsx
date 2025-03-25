import React, { useState } from "react";
import { ArrowUpDown } from "lucide-react";

const SortBy = () => {
  const [selectedOption, setSelectedOption] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions = [
    "Default",
    "Low to High",
    "High to Low",
  ];

  return (
    <div className="relative">
      <div
        className="flex items-center justify-center border border-gray-300 rounded-md p-3 cursor-pointer bg-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="mr-1 font-semibold text-xs text-center">{selectedOption || "Sort by"}</span>
        {isOpen ? (
          <ArrowUpDown className="w-4 h-4"/>
        ) : (
            <ArrowUpDown className="w-4 h-4"/>
        )}
      </div>

      {isOpen && (
        <ul className="absolute left-0 w-full bg-white border border-gray-300 rounded-md shadow-md z-10">
          {sortOptions.map((option, index) => (
            <li
              key={index}
              className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setSelectedOption(option);
                setIsOpen(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SortBy;
