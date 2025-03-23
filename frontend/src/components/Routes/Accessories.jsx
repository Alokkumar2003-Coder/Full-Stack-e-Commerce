import React from "react";
import Compo from "../../pages/Shopping/Card";

const Accessories = () => {
  return (
    <div>
      <section className="mt-10 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-2 sm:p-6 gap-2">
        <Compo />
      </section>
    </div>
  );
};

export default Accessories;
