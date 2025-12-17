import axios from "axios";

const TMDB_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: { api_key: TMDB_KEY },
  language: "en-US",
});

tmdb.interceptors.response.use(
    (response) => {
      console.log(
        "TMDB:",
        response.config.url,
        response.data
      );
      return response;
    },
    (error) => {
      console.error("TMDB Error:", error);
      return Promise.reject(error);
    }
  );