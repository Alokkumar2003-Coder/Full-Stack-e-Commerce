import React, { useState } from "react";
import Compo from "../../pages/Shopping/Card";
import Filter from "@/pages/Shopping/Filter";
import SortBy from "@/pages/Shopping/SortBy";

const Men = () => {
  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className="min-h-screen p-4">
      <div className="flex items-center justify-between mb-4 md:hidden">
        <button
          className="bg-blue-500 text-white px-2 py-2 rounded-md"
          onClick={() => setShowFilter(true)}
        >
          Show Filters
        </button>
        <SortBy />
      </div>

      <div className="flex flex-col md:flex-row">
        <div
          className={`fixed left-0 z-40 w-3/4 sm:w-1/2 md:w-1/4 transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${
            showFilter ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            className="md:hidden absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded"
            onClick={() => setShowFilter(false)}
          >
            X
          </button>
          <Filter />
        </div>

        <div className="flex-1">
          <div className="hidden md:flex justify-end mb-4">
            <SortBy />
          </div>

          <section className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <Compo />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Men;
