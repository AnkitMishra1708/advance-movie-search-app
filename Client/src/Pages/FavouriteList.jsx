import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { FetchCurrentUser } from "../Helper/FetchCurrentUser.jsx";
import Section from "../Components/Section.jsx";
import Card from "../Components/Card.jsx";
import { MovieByIdApi } from "../Helper/MovieApi.jsx";
import { SeriesByIdApi } from "../Helper/SeriesApi.jsx";
import { useNavigate } from "react-router-dom";
import {
  createCollectionApi,
  deleteCollection,
  getMyCollections,
  removeFromCollection,
} from "../Helper/CollectionApi.jsx";
import CreateCollectionModal from "../Components/CreateCollectionModal.jsx";
import MovieChatBot from "../Components/MovieChatBot.jsx";

function FavouriteList() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [movieFavs, setMovieFavs] = useState([]);
  const [tvFavs, setTvFavs] = useState([]);
  const [collections, setCollections] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    async function fetchFavourites() {
      const response = await FetchCurrentUser();
      const favourites = response?.favouriteList;

      const moviePromises = favourites
        .filter((item) => item.type === "movie")
        .map((item) => MovieByIdApi(item.mediaId));

      const tvPromises = favourites
        .filter((item) => item.type === "series" || item.type === "tv")
        .map((item) => SeriesByIdApi(item.mediaId));

      setMovieFavs(await Promise.all(moviePromises));
      setTvFavs(await Promise.all(tvPromises));
      setLoading(false);
    }

    async function fetchCollections() {
      try {
        const res = await getMyCollections();
        setCollections(res?.data?.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchFavourites();
    fetchCollections();
  }, []);

  const handleCreateCollection = async (payload) => {
    try {
      const res = await createCollectionApi(payload);
      setCollections((prev) => [...prev, res.data.data]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveCollection = async (id) => {
    const ok = window.confirm("Are you sure ?");
    if (!ok) return;
    try {
      const res = await deleteCollection(id);
      setCollections((prev) => prev.filter((col) => col._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen px-10 pb-15 py-8 bg-black text-white">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold">
            In My Heart 💗
          </h1>

          <button
            onClick={() => setOpenModal(true)}
            className="w-full sm:w-auto px-4 py-2 bg-blue-600 rounded-lg cursor-pointer hover:bg-blue-500"
          >
            + Create Collection
          </button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : collections.length === 0 ? (
          <p className="text-gray-400">
            No collections yet. Create your first one 🎬
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections?.map((col, i) => (
              <div
                key={i}
                onClick={() => navigate(`/collection/${col?._id}`)}
                className="bg-gray-800 rounded-xl p-4 sm:p-5 cursor-pointer hover:scale-[1.02] md:hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-lg sm:text-xl font-semibold wrap-break-word">
                    {col?.name}
                  </h2>

                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveCollection(col?._id);
                    }}
                    className="shrink-0 bg-red-500 px-2.5 py-1 rounded-full text-sm hover:bg-red-700"
                  >
                    ✕
                  </span>
                </div>

                <p className="text-gray-400 text-sm sm:text-base mt-2 wrap-break-word line-clamp-3">
                  {col?.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {!loading ? (
          <>
            <Section title="Movies">
              {movieFavs.map((movie) => (
                <div
                  key={movie.id}
                  onClick={() => navigate(`/detailed/movie/${movie.id}`)}
                >
                  <Card title={movie.title} image={movie.poster_path} />
                </div>
              ))}
            </Section>

            <div className="mt-10">
              <Section title="Series">
                {tvFavs.map((show) => (
                  <div
                    key={show.id}
                    onClick={() => navigate(`/detailed/tv/${show.id}`)}
                  >
                    <Card title={show.name} image={show.poster_path} />
                  </div>
                ))}
              </Section>
            </div>
          </>
        ) : (
          <p className="text-4xl flex justify-center items-center">
            Loading...
          </p>
        )}

        <CreateCollectionModal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          onCreate={handleCreateCollection}
        />
      </div>
      <MovieChatBot />
    </>
  );
}

export default FavouriteList;
