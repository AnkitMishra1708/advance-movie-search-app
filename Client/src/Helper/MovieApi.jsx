import Api from "./Api.jsx";

const UpcomingApi = async () => {
  try {
    const data = await Api.get("/movies/upcoming-movies");
    const res = data.data.data.results
    return res;
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    throw error;
  }
};

const GenreApi = async () => {
  try {
    const data = await Api.get("/movies/genre-movies");
    const res = data.data.data.results
    return res;
  } catch (error) {
    console.error("Error fetching horror movies:", error);
    throw error;
  }
};

const TopRatedApi = async () => {
  try {
    const data = await Api.get("/movies/top-rated-movies");
    const res = data.data.data.results
    return res;
  } catch (error) {
    console.error("Error fetching top rated movies:", error);
    throw error;
  }
};

const TrendingApi = async () => {
  try {
    const data = await Api.get("/movies/trending-movies");
    const res = data.data.data.results;
    return res;
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    throw error;
  }
};

const MovieByIdApi = async (id) => {
  try {
    const data = await Api.get(`/movies/detailed/${id}`);
    const res = data.data.data;    
    return res;
  } catch (error) {
    console.error("Error fetching movies by id:", error);
    throw error;
  }
};

const MovieCastApi = async (id) => {
  try {
    const data = await Api.get(`/movies/movies-cast/${id}`);
    const res = data.data.data;    
    return res;
  } catch (error) {
    console.error("Error fetching movies cast:", error);
    throw error;
  }
};

const SearchApi = async (query) => {
  try {
    const data = await Api.get(`/movies/search/${query}`);
    const res = data.data.data;    
    return res;
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    throw error;
  }
};

const WatchProvidersApi = async (id,type) => {
  try {    
    const data = await Api.get(`movies/watch-providers/${type}/${id}`);
    const res = data.data.data;    
    return res;
  } catch (error) {
    console.error("Error fetching watch providers:", error);
    throw error;
  }
};



export { UpcomingApi, GenreApi, TopRatedApi, TrendingApi, MovieByIdApi,MovieCastApi, SearchApi, WatchProvidersApi };
