import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from ".";

interface ToastState {
  message: string;
  isVisible: boolean;
}

const initialState: ToastState = {
  message: "",
  isVisible: false,
};

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
      state.isVisible = true;
    },
    hideToast: (state) => {
      state.message = "";
      state.isVisible = false;
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;
export const toastState = (state: RootState) => state.toast;
export default toastSlice.reducer;
