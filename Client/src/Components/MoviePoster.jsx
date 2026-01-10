import React, { useEffect, useState } from "react";
import { MovieByIdApi } from "../Helper/MovieApi";
import { SeriesByIdApi } from "../Helper/SeriesApi";
import Card from "./Card";
import { useNavigate } from "react-router-dom";

const MoviePoster = ({ item }) => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        if (item.type === "tv" || item.type === "series") {
          const res = await SeriesByIdApi(item.mediaId);
          setData(res);
        } else {
          const res = await MovieByIdApi(item.mediaId);
          setData(res);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [item.mediaId, item.type]);

  if (loading) {
    return <p className="text-center text-xl">Loading...</p>;
  }

  if (!data) return null;

  return (
    <div
      onClick={() =>
        navigate(
          item.type === "tv" || item.type === "series"
            ? `/detailed/tv/${data.id}`
            : `/detailed/movie/${data.id}`
        )
      }
      className="cursor-pointer"
    >
      <Card title={data.title || data.name} image={data.poster_path} />
    </div>
  );
};

export default MoviePoster;
