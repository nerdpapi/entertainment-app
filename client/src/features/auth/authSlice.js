import { createSlice } from "@reduxjs/toolkit";

// 🔐 Restore auth on app load
const savedAuth = JSON.parse(localStorage.getItem("auth"));

const initialState = {
  user: savedAuth?.user || null,
  token: savedAuth?.token || null,
  isAuthenticated: !!savedAuth,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;

      //  persist full auth
      localStorage.setItem(
        "auth",
        JSON.stringify(action.payload)
      );
    },

    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      //  remove only auth
      localStorage.removeItem("auth");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
