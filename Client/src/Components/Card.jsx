import React from "react";
const imgBase = "https://image.tmdb.org/t/p/original";

const Card = ({ title, image, isCircle = false }) => {
  
  return (
    <div
      className={`bg-[black] flex flex-col justify-center overflow-hidden
      hover:scale-115 transition duration-300 cursor-pointer  ${
        isCircle
          ? "w-50 h-50 rounded-b-full rounded-t-full hover:ring-2 hover:ring-blue-500 transition"
          : "w-70 h-120"
      }`}
    >
      <img
        src={image ? imgBase + image : "/no-image.png"}
        alt={title}
        className="bg-gray-800 rounded object-cover"
      />
      <div>
        <p className="text-center mt-3 font-semibold truncate">{title}</p>
      </div>
    </div>
  );
};

export default Card;
