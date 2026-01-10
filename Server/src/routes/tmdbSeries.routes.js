import { Router } from "express";
import {
  SeriesById,
  PopularSeries,
  TopRatedSeries,
  SeriesCast,
  Anime,
  TopRatedAnime,
} from "../controllers/tmdbSeries.controller.js";

const router = Router();

router.route("/detailed/:id").get(SeriesById);
router.route("/series-cast/:id").get(SeriesCast);
router.route("/top-rated-series").get(TopRatedSeries);
router.route("/popular-series").get(PopularSeries);
router.route("/anime").get(Anime);
router.route("/top-rated-anime").get(TopRatedAnime);

export default router;
