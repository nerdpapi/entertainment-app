import api from "./axios";

export const fetchBookmarks = async () => {
  const res = await api.get("/api/bookmarks");
  return res.data;
};

export const addBookmarkApi = async (data) => {
  const res = await api.post("/api/bookmarks", data);
  return res.data;
};

export const removeBookmarkApi = async (id) => {
  const res = await api.delete(`/api/bookmarks/${id}`);
  return res.data;
};
