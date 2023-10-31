import { HYDRATE } from "next-redux-wrapper";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./index";

// Type for our state
export interface AuthState {
  isLogin: boolean;
}
// Initial state
const initialState: AuthState = {
  isLogin: false,
};
// Actual Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action to set the authentication status
    setIsLogin(state, action) {
      state.isLogin = action.payload;
    },
  },

  extraReducers: builder => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
      };
    });
  },
});

export const { setIsLogin } = authSlice.actions;
export const selectAuthState = (state: RootState) => state.auth;
export default authSlice.reducer;
