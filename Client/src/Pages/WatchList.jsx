import React, { useEffect, useState } from "react";
import { FetchCurrentUser } from "../Helper/FetchCurrentUser";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
import Section from "../Components/Section";
import Card from "../Components/Card";
import { MovieByIdApi } from "../Helper/MovieApi";
import { SeriesByIdApi } from "../Helper/SeriesApi";

const WatchList = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [movieToWatch, setMovieToWatch] = useState([]);
  const [tvToWatch, setTvToWatch] = useState([]);

  useEffect(() => {
    async function fetchWatchList() {
      const response = await FetchCurrentUser();
      const watchList = response?.watchList;

      const moviePromises = watchList
        .filter((item) => item.type === "movie")
        .map((item) => MovieByIdApi(item.mediaId));

      const tvPromises = watchList
        .filter((item) => item.type === "series")
        .map((item) => SeriesByIdApi(item.mediaId));

      setMovieToWatch(await Promise.all(moviePromises));
      setTvToWatch(await Promise.all(tvPromises));
      setLoading(false);
    }
    fetchWatchList();
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen px-10 pb-15 py-8 bg-black text-white">
        <h1 className="text-3xl font-bold mb-6">Let's make this section empty !!!</h1>

        {!loading ? (
          <>
            <Section title="Movies">
              {movieToWatch.map((movie) => (
                <div
                  key={movie.id}
                  onClick={() => navigate(`/detailed/movie/${movie.id}`)}
                >
                  <Card
                    key={movie.id}
                    title={movie.title}
                    image={movie.poster_path}
                  />
                </div>
              ))}
            </Section>

            <Section title="Series">
              {tvToWatch.map((show) => (
                <div
                  key={show.id}
                  onClick={() => navigate(`/detailed/series/${show.id}`)}
                >
                  <Card
                    key={show.id}
                    title={show.name}
                    image={show.poster_path}
                  />
                </div>
              ))}
            </Section>
          </>
        ) : (
          <p className="text-4xl flex justify-center items-center">
            Loading...
          </p>
        )}
      </div>
    </>
  );
};

export default WatchList;
