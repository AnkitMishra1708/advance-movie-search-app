import {
  fetchGenreMovies,
  fetchMoviesById,
  fetchMoviesCast,
  fetchMultiSearch,
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
  fetchWatchProviders,
} from "../services/tmdb.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const moviesById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = await fetchMoviesById(id);
  return res
    .status(200)
    .json(new ApiResponse(200, data, "movies fetched successfully."));
});

const multiSearch = asyncHandler(async (req, res) => {
  const { query } = req.params;

  const data = await fetchMultiSearch(query);
  return res
    .status(200)
    .json(new ApiResponse(200, data, "search fetched successfully."));
});

const watchProviders = asyncHandler(async (req, res) => {
  const { id, type } = req.params;

  const data = await fetchWatchProviders(id, type);
  return res
    .status(200)
    .json(new ApiResponse(200, data, "watch providers fetched successfully."));
});

const upcomingMovies = asyncHandler(async (req, res) => {
  const data = await fetchUpcomingMovies();
  return res
    .status(200)
    .json(new ApiResponse(200, data, "upcoming movies fetched successfully."));
});

const genreMovies = asyncHandler(async (req, res) => {
  const data = await fetchGenreMovies();
  return res
    .status(200)
    .json(new ApiResponse(200, data, "horror movies fetched successfully."));
});

const topRatedMovies = asyncHandler(async (req, res) => {
  const data = await fetchTopRatedMovies();
  return res
    .status(200)
    .json(new ApiResponse(200, data, "top rated movies fetched successfully."));
});

const trendingMovies = asyncHandler(async (req, res) => {
  const data = await fetchTrendingMovies();
  return res
    .status(200)
    .json(new ApiResponse(200, data, "trending movies fetched successfully."));
});

const moviesCast = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = await fetchMoviesCast(id);
  return res
    .status(200)
    .json(new ApiResponse(200, data, "movies cast fetched successfully."));
});

export {
  moviesById,
  multiSearch,
  watchProviders,
  upcomingMovies,
  genreMovies,
  topRatedMovies,
  trendingMovies,
  moviesCast,
};
