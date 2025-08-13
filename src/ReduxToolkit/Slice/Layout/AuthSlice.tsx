import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("sahajanand-admin-user")) || {},
  },
  reducers: {
    login(state, action) {
      Cookies.set("sahajanand-admin-token", action.payload.token, {
        path: "/",
        secure: true,
        sameSite: "strict",
      });
      localStorage.setItem("sahajanand-admin-user", JSON.stringify(action.payload));
      state.user = action.payload;
    },
    logout(state) {
      localStorage.removeItem("sahajanand-admin-user");
      Cookies.remove("sahajanand-admin-token");
      state.user = null;
    },
  },
});

export const { login, logout } = AuthSlice.actions;
export default AuthSlice.reducer;
