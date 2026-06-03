import React from "react";

const imgBase = "https://image.tmdb.org/t/p/original";

const Card = ({ title, image, isCircle = false }) => {
  return (
    <div
      className={`bg-black flex flex-col overflow-hidden
      hover:scale-105 transition-all duration-300 cursor-pointer mx-auto
      ${
        isCircle
          ? "w-full max-w-[180px]"
          : "w-full"
      }`}
    >
      <img
        src={image ? imgBase + image : "/no-image.png"}
        alt={title}
        className={`object-cover w-full ${
          isCircle
            ? "aspect-square rounded-full hover:ring-2 hover:ring-blue-500"
            : "aspect-2/3 rounded-lg"
        }`}
      />

      <p className="text-center mt-2 text-sm sm:text-base font-semibold line-clamp-2 px-2">
        {title}
      </p>
    </div>
  );
};

export default Card;