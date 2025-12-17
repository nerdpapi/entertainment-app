import { tmdb } from "./tmdb";

export const searchMulti = async (query) => {
  const res = await tmdb.get("/search/multi", {
    params: { query },
  });
  return res.data.results.filter(
    (item) => item.media_type === "movie" || item.media_type === "tv"
  );
};
