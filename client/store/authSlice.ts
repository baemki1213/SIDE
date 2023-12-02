import { HYDRATE } from "next-redux-wrapper";
import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "./index";
import { IUserInfo } from "@/types/user";

// Type for our state
export interface AuthState {
  isLogin: boolean;
  userInfo: IUserInfo;
  access_token: string;
  refresh_token: string;
}
// Initial state
const initialState: AuthState = {
  isLogin: false,
  userInfo: { id: 0, email: "", nickname: "" },
  access_token: "",
  refresh_token: "",
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
      const { isLogin, userInfo, access_token, refresh_token } = action.payload;
      state.isLogin = isLogin;
      state.userInfo = userInfo;
      state.access_token = access_token;
      state.refresh_token = refresh_token;
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

export const { setIsLogin, setUserInfo, setLoginInfo } = authSlice.actions;
export const selectAuthState = (state: RootState) => state.auth;
export default authSlice.reducer;
