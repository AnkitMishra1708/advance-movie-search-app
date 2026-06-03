import React from "react";

const Section = ({ title, children }) => {
  return (
    <div className="px-2 sm:px-4">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4">
        {title}
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6">
        {children}
      </div>
    </div>
  );
};

export default Section;