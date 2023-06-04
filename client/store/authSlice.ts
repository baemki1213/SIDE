import { HYDRATE } from "next-redux-wrapper";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./index";

// Type for our state
export interface AuthState {
  authState: boolean;
}
// Initial state
const initialState: AuthState = {
  authState: false,
};
// Actual Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action to set the authentication status
    setAuthState(state, action) {
      state.authState = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
      };
    });
  },
});

export const { setAuthState } = authSlice.actions;
export const selectAuthState = (state: RootState) => state.auth.authState;
export default authSlice.reducer;
