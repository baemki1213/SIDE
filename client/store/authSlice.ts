import { createSlice } from "@reduxjs/toolkit";

import { HYDRATE } from "next-redux-wrapper";

import { IUserInfo } from "@/types/user";

import { RootState } from "./index";

// Type for our state
export interface AuthState {
  isLogin: boolean;
  userInfo: IUserInfo;
}
// Initial state
const initialState: AuthState = {
  isLogin: false,
  userInfo: { id: 0, email: "", nickname: "", profile_image: null },
};
// Actual Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLogin(state, action) {
      state.isLogin = action.payload;
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    setLoginInfo(state, action) {
      const { isLogin, userInfo } = action.payload;
      state.isLogin = isLogin;
      state.userInfo = userInfo;
    },
    clearLoginInfo(state) {
      state.isLogin = false;
      state.userInfo = initialState.userInfo;
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

export const { setIsLogin, setUserInfo, setLoginInfo, clearLoginInfo } =
  authSlice.actions;
export const selectAuthState = (state: RootState) => state.auth;
export default authSlice.reducer;
