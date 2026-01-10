import { GenreApi, TopRatedApi, TrendingApi, UpcomingApi } from "../Helper/MovieApi.jsx";
import { AnimeApi, PopularSeriesApi, TopRatedAnimeApi, TopRatedSeriesApi } from "../Helper/SeriesApi.jsx";

export const HomeSections = [
  {
    type: "movie",
    title: "Indian Horror Movies",
    key: "genreMovies",
    api: GenreApi,
  },
  {
    type: "movie",
    title: "Absolute Cinema",
    key: "topRatedMovies",
    api: TopRatedApi,
  },
  {
    type: "movie",
    title: "Trending Movies",
    key: "trendingMovies",
    api: TrendingApi,
  },
  {
    type: "tv",
    title: "Top-Rated Series",
    key: "topRatedSeries",
    api: TopRatedSeriesApi,
  },
  {
    type: "tv",
    title: "Popular Series",
    key: "popularSeries",
    api: PopularSeriesApi,
  },
  {
    type: "tv",
    title: "Eye On Anime",
    key: "anime",
    api: AnimeApi,
  },
  {
    type: "tv",
    title: "Certified Bangers Anime",
    key: "topratedanime",
    api: TopRatedAnimeApi,
  },
];
