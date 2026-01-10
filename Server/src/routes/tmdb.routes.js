import { Router } from "express";
import {
  moviesById,
  multiSearch,
  upcomingMovies,
  genreMovies,
  topRatedMovies,
  trendingMovies,
  moviesCast,
  watchProviders,
} from "../controllers/tmdb.controller.js";

const router = Router();

router.route("/detailed/:id").get(moviesById);
router.route("/movies-cast/:id").get(moviesCast);
router.route("/search/:query").get(multiSearch);
router.route("/watch-providers/:type/:id").get(watchProviders);
router.route("/upcoming-movies").get(upcomingMovies);
router.route("/genre-movies").get(genreMovies);
router.route("/top-rated-movies").get(topRatedMovies);
router.route("/trending-movies").get(trendingMovies);

export default router;
