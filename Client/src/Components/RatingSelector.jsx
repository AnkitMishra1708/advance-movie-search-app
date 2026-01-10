import React, { useState } from "react";

const ratings = [
  { label: "Skip", value: 1 },
  { label: "Timepass", value: 2 },
  { label: "Balanced", value: 3 },
  { label: "Go for it", value: 4 },
  { label: "Perfection", value: 5 },
];

const getColorClasses = (value, selected) => {
  if (selected !== value) return "text-white";

  if (value === 1) return "bg-red-500 text-white font-semibold";
  if (value === 2) return "bg-yellow-400 text-black font-semibold";
  if (value === 3) return "bg-orange-500 text-white font-semibold";
  if (value === 4) return "bg-green-500 text-white font-semibold";
  if (value === 5) return "bg-purple-600 text-white font-semibold";
};

const RatingSelector = ({ onChange }) => {
  const [selected, setSelected] = useState(3);

  const handleSelect = (rating) => {
    setSelected(rating.value);
    onChange?.(rating);
  };

  return (
    <div className="w-full flex mb-2 cursor-pointer">
      <div className="flex bg-[#000000] p-1 rounded-full border border-gray-200 cursor-pointer">
        {ratings.map((rating) => (
          <button
            key={rating.value}
            onClick={() => handleSelect(rating)}
            className={`px-5 py-2 rounded-full transition-all cursor-pointer duration-200
            ${getColorClasses(rating.value, selected)}
          `}
          >
            {rating.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RatingSelector;
