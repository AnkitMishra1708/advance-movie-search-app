import Api from "./Api";

const PopularSeriesApi = async () => {
  try {
    const data = await Api.get("/series/popular-series");
    const res = data.data.data.results;
    return res;
  } catch (error) {
    console.error("Error fetching popular series:", error);
    throw error;
  }
};

const TopRatedSeriesApi = async () => {
  try {
    const data = await Api.get("/series/top-rated-series");
    const res = data.data.data.results;
    return res;
  } catch (error) {
    console.error("Error fetching top rated series:", error);
    throw error;
  }
};

const SeriesByIdApi = async (id) => {
  try {
    const data = await Api.get(`/series/detailed/${id}`);
    const res = data.data.data;
    return res;
  } catch (error) {
    console.error("Error fetching series by id:", error);
    throw error;
  }
};

const SeriesCastApi = async (id) => {
  try {
    const data = await Api.get(`/series/series-cast/${id}`);
    const res = data.data.data;
    return res;
  } catch (error) {
    console.error("Error fetching series cast:", error);
    throw error;
  }
};

const AnimeApi = async () => {
  try {
    const data = await Api.get(`/series/anime`);
    const res = data.data.data.results;
    return res;
  } catch (error) {
    console.error("Error fetching Anime:", error);
    throw error;
  }
};

const TopRatedAnimeApi = async () => {
  try {
    const data = await Api.get(`/series/top-rated-anime`);
    const res = data.data.data.results;
    return res;
  } catch (error) {
    console.error("Error fetching Top rated Anime:", error);
    throw error;
  }
};

export {
  PopularSeriesApi,
  TopRatedSeriesApi,
  SeriesByIdApi,
  SeriesCastApi,
  AnimeApi,
  TopRatedAnimeApi,
};
