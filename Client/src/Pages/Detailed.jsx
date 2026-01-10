import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  MovieByIdApi,
  MovieCastApi,
  WatchProvidersApi,
} from "../Helper/MovieApi";
import { FetchCurrentUser } from "../Helper/FetchCurrentUser.jsx";
import { SeriesByIdApi, SeriesCastApi } from "../Helper/SeriesApi";
import Navbar from "../Components/Navbar";
import WatchButton from "../Components/WatchButton";
import WatchListButton from "../Components/WatchListButton.jsx";
import MediaExtraInfo from "../Components/MediaExtraInfo.jsx";
import unsavedBtn from "../assets/unsavedBtn.svg";
import savedBtn from "../assets/savedBtn.svg";
import SelectCollectionModal from "../Components/SelectCollectionModal.jsx";
import {
  addToCollection,
  getMyCollections,
  removeFromCollection,
} from "../Helper/CollectionApi.jsx";
import AddReview from "../Components/AddReview.jsx";
import { GetReview } from "../Helper/ReviewApi.jsx";
import { ReviewList } from "../Components/ReviewList.jsx";

const Detailed = () => {
  const imgBaseUrl = "https://image.tmdb.org/t/p/original";
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const { type, id } = useParams();
  const [movies, setMovies] = useState([]);
  const [cast, setCast] = useState([]);
  const [watchProvider, setWatchProvider] = useState([]);
  const [openCollectionModal, setOpenCollectionModal] = useState(false);
  const [isWatched, setIsWatched] = useState(false);
  const [inWatchlist, setInWatchlist] = useState(false);
  const flatrate = watchProvider?.flatrate || [];
  const rent = watchProvider?.rent || [];
  const buy = watchProvider?.buy || [];
  const ads = watchProvider?.ads || [];
  const [isSaved, setIsSaved] = useState(false);
  const [collection, setCollection] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await FetchCurrentUser();
      console.log("User data:", data);
      setUser(data);
      if (data) {
        setIsWatched(data?.markAsWatched?.some((item) => item.mediaId == id));
        setInWatchlist(data?.watchList?.some((item) => item.mediaId == id));
      }
    };

    const fetchDataById = async () => {
      if (type == "movie") {
        const data = await MovieByIdApi(id);
        setMovies(data);
        setLoading(false);
      } else {
        const data = await SeriesByIdApi(id);
        setMovies(data);
        setLoading(false);
      }
    };

    const fetchCast = async () => {
      if (type == "movie") {
        const data = await MovieCastApi(id);
        setCast(data);
        setLoading(false);
      } else {
        const data = await SeriesCastApi(id);
        setCast(data);
        setLoading(false);
      }
    };

    const fetchWatchProviders = async () => {
      const data = await WatchProvidersApi(id, type);
      setWatchProvider(data.results.IN);
    };

    const fetchCollection = async () => {
      const res = await getMyCollections();
      const data = res?.data?.data;

      setIsSaved(
        data?.some((col) => col.items?.some((item) => item.mediaId == id))
      );

      setCollection(data);
    };

    const fetchReviews = async () => {
      const res = await GetReview(type, id);
      setReviews(res.data.data);
    };

    fetchUser();
    fetchDataById();
    fetchCast();
    fetchWatchProviders();
    fetchCollection();
    fetchReviews();
  }, [type, id]);

  const mainTrailer = useMemo(() => {
    if (!movies?.videos?.results?.length) return null;

    return movies.videos.results
      .filter((v) => v.type === "Trailer" && v.site === "YouTube" && v.key)
      .at(-1);
  }, [movies]);

  const handleAddOrRemove = async (collectionId) => {
    try {
      if (isSaved) {
        await removeFromCollection(collectionId, { mediaId: id, type });
        setIsSaved(false);
      } else {
        await addToCollection(collectionId, { mediaId: id, type });
        setIsSaved(true);
      }
    } catch (err) {
      console.error("Error in handleAddOrRemove:", err);
    }
  };

  return (
    <>
      <Navbar />
      {!loading ? (
        <>
          <div className="w-full min-h-screen bg-black text-white">
            <div className="relative w-full h-[90vh]">
              {!(mainTrailer == null) ? (
                <iframe
                  className="w-full h-full object-cover"
                  src={`https://www.youtube.com/embed/${mainTrailer.key}?autoplay=1&mute=0&controls=0&rel=0&vq=hd1080`}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              ) : (
                <img
                  className="w-full h-full object-cover"
                  src={imgBaseUrl + movies.backdrop_path}
                />
              )}

              <div className="absolute inset-0 bg-linear-to-r from-black via-black/70 to-transparent" />

              <div className="absolute bottom-20 left-10 max-w-3xl space-y-5">
                <h1 className="text-5xl font-extrabold">
                  {movies.title || movies.name}
                </h1>

                <p className="text-gray-300 line-clamp-3">{movies.overview}</p>

                <div className="flex items-center gap-4">
                  {mainTrailer && (
                    <a
                      href={`https://www.youtube.com/watch?v=${mainTrailer.key}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-black px-6 py-3 rounded-lg font-semibold cursor-pointer hover:bg-gray-300 transition inline-block"
                    >
                      Play Trailer
                    </a>
                  )}

                  {!inWatchlist && (
                    <WatchButton
                      isWatched={isWatched}
                      setIsWatched={setIsWatched}
                      setInWatchlist={setInWatchlist}
                      mediaId={id}
                      type={type}
                      user={user}
                    />
                  )}
                  {!isWatched && (
                    <WatchListButton
                      inWatchlist={inWatchlist}
                      setInWatchlist={setInWatchlist}
                      setIsWatched={setIsWatched}
                      mediaId={id}
                      type={type}
                      user={user}
                    />
                  )}

                  <img
                    className="h-9 cursor-pointer"
                    src={isSaved ? savedBtn : unsavedBtn}
                    alt="save"
                    onClick={() => {
                      const isAlreadySaved = collection?.some((col) =>
                        col.items?.some((item) => item.mediaId == id)
                      );
                      setIsSaved(isAlreadySaved);
                      setOpenCollectionModal(true);
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="max-w-7xl mx-auto py-7 grid grid-cols-1 md:grid-cols-3 gap-x-17">
              <div>
                <img
                  src={imgBaseUrl + movies.poster_path}
                  alt={movies.title}
                  className="rounded-2xl shadow-xl"
                />
              </div>

              <div className="md:col-span-2 space-y-6">
                <div className="space-x-4 flex items-center">
                  <span className="text-3xl font-bold">Movie Info</span>
                  <span className="text-gray-300">
                    • {movies.runtime || movies.episode_run_time}m
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-gray-300">
                  <p>
                    <span className="font-semibold text-white">Status:</span>{" "}
                    {movies.status}
                  </p>
                  <p>
                    <span className="font-semibold text-white">Release:</span>{" "}
                    {movies.release_date || movies.first_air_date}
                  </p>
                  <p>
                    <span className="font-semibold text-white">Rating:</span> ⭐{" "}
                    {movies.vote_average}
                  </p>
                  <p>
                    <span className="font-semibold text-white">Language:</span>{" "}
                    {movies.original_language}
                  </p>
                  <p>
                    <span className="font-semibold text-white">
                      Popularity:
                    </span>{" "}
                    {movies.popularity}
                  </p>
                  <p>
                    <span className="font-semibold text-white">
                      Age Rating:
                    </span>{" "}
                    {movies.adult ? "18+" : "Under 18"}
                  </p>
                  {type == "movie" ? (
                    <>
                      <p>
                        <span className="font-semibold text-white">
                          Budget:
                        </span>{" "}
                        $ {movies.budget}
                      </p>
                      <p>
                        <span className="font-semibold text-white">
                          Revenue:
                        </span>{" "}
                        $ {movies.revenue}
                      </p>
                    </>
                  ) : (
                    <></>
                  )}
                </div>

                <div className="flex flex-wrap gap-3">
                  <span className="font-semibold text-white">Genre:</span>{" "}
                  {movies.genres?.map((genre) => (
                    <div
                      key={genre.id}
                      className="px-4 py-1 bg-gray-800 rounded-full text-sm"
                    >
                      {genre.name}
                    </div>
                  ))}
                </div>

                <div>
                  <h3 className="text-2xl font-semibold mb-2">Overview</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {movies.overview}
                  </p>
                </div>
              </div>
            </div>

            <MediaExtraInfo
              media={movies}
              cast={cast}
              flatrate={flatrate}
              rent={rent}
              buy={buy}
              ads={ads}
              type={type}
            />

            <section className="pb-14 px-6">
              <h2 className="text-2xl font-bold">Reviews</h2>

              <AddReview
                mediaId={id}
                mediaType={type}
                mediaTitle={movies.title || movies.name}
                posterPath={movies.poster_path}
                onReviewAdded={reviews}
              />

              <h2 className="text-2xl font-bold">Comments ({reviews?.length})</h2>

              <ReviewList reviews={reviews} />
            </section>
          </div>
        </>
      ) : (
        <p className="w-full min-h-screen bg-black text-white text-4xl flex justify-center items-center">
          Loading...
        </p>
      )}

      <SelectCollectionModal
        isOpen={openCollectionModal}
        onClose={() => setOpenCollectionModal(false)}
        collections={collection}
        movieId={id}
        onSelect={(collectionId) => handleAddOrRemove(collectionId)}
      />
    </>
  );
};

export default Detailed;
