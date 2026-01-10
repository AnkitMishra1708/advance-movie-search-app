import axios from "axios";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const TMDB_BASE_URL = process.env.BASE_URL;
const TMDB_API_KEY = process.env.API_KEY;

export const fetchSeriesById = async (id) => {
  try {
    const response = await axios.get(
      `${TMDB_BASE_URL}/tv/${id}?${TMDB_API_KEY}&append_to_response=videos`,
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
    console.error("Error fetching series by id:", error);
    throw error;
  }
};

export const fetchUpcomingSeries = async () => {
  try {
    const response = await axios.get(
      `${TMDB_BASE_URL}/tv/upcoming?/${TMDB_API_KEY}&page=1`,
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
    console.error("Error fetching upcoming series:", error);
    throw error;
  }
};

export const fetchTopRatedSeries = async () => {
  try {
    const response = await axios.get(
      `${TMDB_BASE_URL}/tv/top_rated?/${TMDB_API_KEY}&page=1&with_origin_country=IN`,
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
    console.error("Error fetching top rated series:", error);
    throw error;
  }
};

export const fetchPopularSeries = async () => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/tv/popular?`, {
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

export const fetchSeriesCast = async (id) => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/tv/${id}/credits?`, {
      params: {
        api_key: TMDB_API_KEY,
      },
    });

    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching series cast:", error);
    throw error;
  }
};

export const fetchAnime = async () => {
  try {
    const response = await axios.get(
      `${TMDB_BASE_URL}/discover/tv?${TMDB_API_KEY}&with_genres=16&with_origin_country=JP&sort_by=popularity.desc`,
      {
        params: {
          api_key: TMDB_API_KEY,
        },
      }
    );

    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching Anime:", error);
    throw error;
  }
};

export const fetchTopRatedAnime = async () => {
  try {
    const response = await axios.get(
      `${TMDB_BASE_URL}/discover/tv?${TMDB_API_KEY}&with_genres=16&with_origin_country=JP&sort_by=vote_average.desc&vote_count.gte=100`,
      {
        params: {
          api_key: TMDB_API_KEY,
        },
      }
    );

    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching Top rated Anime:", error);
    throw error;
  }
};
