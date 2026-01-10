import React, { use, useEffect, useState } from "react";
import { UpcomingApi } from "../Helper/MovieApi";
import { Link, useNavigate } from "react-router-dom";

const imgBaseUrl = "https://image.tmdb.org/t/p/original";

export default function UpcomingHorizontalSlider() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchUpcomingmovies = async () => {
      const response = await UpcomingApi();
      const data = response;
      setMovies(data);
    };

    fetchUpcomingmovies();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % movies.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [movies.length]);

  return (
    <>
      <div className="w-full max-w-10xl z-10 cursor-pointer">
        <center>
          <div className="w-full max-w-7xl h-[480px] mx-auto overflow-hidden rounded-2xl shadow-lg relative">
            <div
              className="flex h-full transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {movies.map((movie, i) => (
                <div
                  onClick={() => navigate(`/detailed/movie/${movie.id}`)}
                  key={i}
                  className="w-full h-full shrink-0"
                >
                  <img
                    src={imgBaseUrl + movie.backdrop_path}
                    alt="upcoming"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="absolute bottom-6 left-10 text-white z-10">
              <h2 className="text-3xl font-bold">{movies[index]?.title}</h2>
              <p className="opacity-80">Don’t miss what’s next 🎬</p>
            </div>

            <div className="absolute bottom-6 left-270 text-white z-10">
              <p>On Cinemas</p>
              <h2 className="text-3xl font-bold">
                {movies[index]?.release_date}
              </h2>
            </div>
          </div>
        </center>
      </div>
    </>
  );
}
