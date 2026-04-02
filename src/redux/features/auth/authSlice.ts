import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, User } from "./auth.types";

const getInitialState = (): AuthState => {
  if (typeof window === "undefined") {
    return {
      user: null,
      accessToken: null,
    };
  }

  const token = localStorage.getItem("accessToken");
  const userStr = localStorage.getItem("user");

  return {
    user: userStr ? JSON.parse(userStr) : null,
    accessToken: token || null,
  };
};

const initialState: AuthState = getInitialState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>,
    ) => {
      const { user, token } = action.payload;
      state.user = user;
      state.accessToken = token;
      localStorage.setItem("accessToken", token);
      localStorage.setItem("user", JSON.stringify(user));
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
