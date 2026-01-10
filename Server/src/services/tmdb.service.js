import axios from "axios";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const TMDB_BASE_URL = process.env.BASE_URL;
const TMDB_API_KEY = process.env.API_KEY;

export const fetchMoviesById = async (id) => {
  try {
    const response = await axios.get(
      `${TMDB_BASE_URL}/movie/${id}?${TMDB_API_KEY}&append_to_response=videos`,
      {
        params: {
          api_key: TMDB_API_KEY,
        },
      }
    );

    const data = response.data;
    // console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    throw error;
  }
};

export const fetchMultiSearch = async (query) => {
  try {
    const response = await axios.get(
      `${TMDB_BASE_URL}/search/multi?query=${query}&`,
      {
        params: {
          api_key: TMDB_API_KEY,
        },
      }
    );

    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching searched movies:", error);
    throw error;
  }
};

export const fetchWatchProviders = async (id, type) => {
  try {
    const response = await axios.get(
      `${TMDB_BASE_URL}/${type}/${id}/watch/providers?`,
      {
        params: {
          api_key: TMDB_API_KEY,
        },
      }
    );

    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching watch providers:", error);
    throw error;
  }
};

export const fetchUpcomingMovies = async () => {
  try {
    const response = await axios.get(
      `${TMDB_BASE_URL}/movie/upcoming?/${TMDB_API_KEY}&page=1`,
      {
        params: {
          api_key: TMDB_API_KEY,
        },
      }
    );

    const data = response.data;
    // console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    throw error;
  }
};

export const fetchGenreMovies = async () => {
  try {
    const response = await axios.get(
      `${TMDB_BASE_URL}/discover/movie?${TMDB_API_KEY}&with_genres=27&with_origin_country=IN&page=1`,
      {
        params: {
          api_key: TMDB_API_KEY,
        },
      }
    );

    const data = response.data;
    // console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching horror movies:", error);
    throw error;
  }
};

export const fetchTopRatedMovies = async () => {
  try {
    const response = await axios.get(
      `${TMDB_BASE_URL}/movie/top_rated?/${TMDB_API_KEY}&page=1`,
      {
        params: {
          api_key: TMDB_API_KEY,
        },
      }
    );

    const data = response.data;
    // console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching top rated movies:", error);
    throw error;
  }
};

export const fetchTrendingMovies = async () => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/trending/movie/week`, {
      params: {
        api_key: TMDB_API_KEY,
      },
    });

    const data = response.data;
    // console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    throw error;
  }
};

export const fetchMoviesCast = async (id) => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/${id}/credits?`, {
      params: {
        api_key: TMDB_API_KEY,
      },
    });

    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching movie cast:", error);
    throw error;
  }
};
