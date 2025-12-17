import api from "./axios";

export const signupUser = async (formData) => {
  const res = await api.post("/api/auth/signup", formData);
  return res.data;
};

export const loginUser = async (formData) => {
  const res = await api.post("/api/auth/login", formData);
  return res.data;
};
