import {
  fetchAnime,
  fetchPopularSeries,
  fetchSeriesById,
  fetchSeriesCast,
  fetchTopRatedAnime,
  fetchTopRatedSeries,
} from "../services/tmdbSeries.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const SeriesById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = await fetchSeriesById(id);
  
  return res
    .status(200)
    .json(new ApiResponse(200, data, "series id fetched successfully."));
});

const TopRatedSeries = asyncHandler(async (req, res) => {
  const data = await fetchTopRatedSeries();
  return res
    .status(200)
    .json(new ApiResponse(200, data, "top rated series fetched successfully."));
});

const PopularSeries = asyncHandler(async (req, res) => {
  const data = await fetchPopularSeries();
  return res
    .status(200)
    .json(new ApiResponse(200, data, "popular series fetched successfully."));
});

const SeriesCast = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = await fetchSeriesCast(id);
  return res
    .status(200)
    .json(new ApiResponse(200, data, "series cast fetched successfully."));
});

const Anime = asyncHandler(async (req, res) => {
  const data = await fetchAnime();
  return res
    .status(200)
    .json(new ApiResponse(200, data, "Anime fetched successfully."));
});
const TopRatedAnime = asyncHandler(async (req, res) => {
  const data = await fetchTopRatedAnime();
  return res
    .status(200)
    .json(new ApiResponse(200, data, "Top rated Anime fetched successfully."));
});

export {
  SeriesById,
  TopRatedSeries,
  PopularSeries,
  SeriesCast,
  Anime,
  TopRatedAnime,
};
