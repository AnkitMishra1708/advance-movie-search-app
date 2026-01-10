import React from "react";
import { useNavigate } from "react-router-dom";

const imgBaseUrl = "https://image.tmdb.org/t/p/w500";

export default function HorizontalRow({ type, title, items, loading, error }) {
  const navigate = useNavigate();

  if (loading) return <p>Loading {title}...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="px-6 pb-5 rounded-lg">
      <div className="py-4 px-2 rounded cursor-pointer hover:bg-gray-900 transition duration-500">
        <h2 className="text-3xl font-bold">
          {title}
          <span className="animate-pulse"></span>
        </h2>
      </div>
      <div className="flex gap-10 overflow-x-auto overflow-y-hidden scrollbar-hide">
        {items.map((movie, i) => (
          <div
            key={i}
            className="min-w-[260px] mt-3 overflow-hidden rounded-2xl"
          >
            <div
              onClick={() => navigate(`/detailed/${type}/${movie.id}`)}
              className="bg-black rounded-2xl shadow-lg 
                   transition-transform duration-300 
                   cursor-pointer hover:scale-109 hover:z-10"
            >
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={imgBaseUrl + movie.poster_path}
                  alt={movie.title}
                  className="w-full h-[380px] object-cover 
                       transition-transform duration-300 
                       hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity" />
              </div>

              <div className="p-3">
                <p className="text-center text-lg font-semibold truncate">
                  {movie.title || movie.name}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
