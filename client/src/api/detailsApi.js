import { tmdb } from "./tmdb";

export const getDetails = async (type, id) => {
    const res = await tmdb.get(`/${type}/${id}`, {
        params: {
          append_to_response: "credits",
        },
      });
  return res.data;
};

export const getTrailer = async (type, id) => {
  const res = await tmdb.get(`/${type}/${id}/videos`);
  return res.data.results.find(
    (v) => v.type === "Trailer" && v.site === "YouTube"
  );
};

// export const getWatchProviders = async (type, id) => {
//     const res = await axios.get(`/${type}/${id}/watch/providers`);
//     return res.data;
//   };