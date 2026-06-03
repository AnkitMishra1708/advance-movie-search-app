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
    <div className="w-full mb-2 overflow-x-auto scrollbar-hide">
      <div className="flex w-max bg-[#000000] p-1 rounded-full border border-gray-200">
        {ratings.map((rating) => (
          <button
            key={rating.value}
            onClick={() => handleSelect(rating)}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2 
        text-xs sm:text-sm md:text-base 
        rounded-full whitespace-nowrap 
        transition-all duration-200 cursor-pointer
        ${getColorClasses(rating.value, selected)}`}
          >
            {rating.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RatingSelector;
