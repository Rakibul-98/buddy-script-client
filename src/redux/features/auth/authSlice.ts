import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, User } from "./auth.types";

const initialState: AuthState = {
  user: null,
  accessToken:
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null,
};

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
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      localStorage.removeItem("accessToken");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
