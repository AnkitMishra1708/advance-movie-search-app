import React from "react";

const Section = ({ title, children }) => {
  // if (!children.length) return null;

  return (
    <div>
      <h2 className="text-3xl font-bold">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gapx-16 gap-y-4">
        {children}
      </div>
    </div>
  );
};

export default Section