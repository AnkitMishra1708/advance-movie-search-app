import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Authorization", "Content-Type"],
  })
);

app.use(cookieParser());

app.use(express.json({ limit: "5kb" }));
app.use(express.urlencoded({ extended: true, limit: "5kb" }));
app.use(cookieParser());

import userRouter from "./routes/user.routes.js";
import collectionRouter from "./routes/collection.routes.js";
import reviewRouter from "./routes/review.routes.js";
import tmdbRouter from "./routes/tmdb.routes.js";
import tmdbSeriesRouter from "./routes/tmdbSeries.routes.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/collection", collectionRouter);
app.use("/api/v1/review", reviewRouter);
app.use("/api/v1/movies", tmdbRouter);
app.use("/api/v1/series", tmdbSeriesRouter);

export { app };
