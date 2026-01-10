import React, { useEffect, useState } from "react";
import Section from "../Components/Section.jsx";
import Navbar from "../Components/Navbar.jsx";
import Card from "../Components/Card.jsx";
import { SearchApi } from "../Helper/MovieApi.jsx";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  const navigate = useNavigate();
  const { query } = useParams();
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const handleSearch = async () => {
      try {
        const res = await SearchApi(query);
        const results = res.results;

        const cast = await results.filter(
          (item) => item.media_type === "person"
        );
        const movies = await results.filter(
          (item) => item.media_type === "movie"
        );
        const series = await results.filter((item) => item.media_type === "tv");
        
        setCast(cast);
        setMovies(movies);
        setSeries(series);
      } catch (err) {
        console.error(err);
      }
    };

    handleSearch();
  }, [query]);

  return (
    <div className="min-h-screen pb-10 bg-[black] text-white">
      <Navbar />

      <p className="px-8 text-gray-300 text-4xl my-9 space-y-14">
        Sorted by: "{query}"
      </p>

      <div className="px-8 space-y-8">
        <Section title="Cast">
          {cast.map((person) => (
            <Card
              key={person.id}
              title={person.name}
              image={person.profile_path}
              isCircle
            />
          ))}
        </Section>

        <Section title="Movies">
          {movies.map((movie) => (
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
          {series.map((show) => (
            <div
              key={show.id}
              onClick={() => navigate(`/detailed/series/${show.id}`)}
            >
              <Card key={show.id} title={show.name} image={show.poster_path} />
            </div>
          ))}
        </Section>
      </div>
    </div>
  );
};

export default SearchPage;
