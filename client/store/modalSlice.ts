import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReactNode } from "react";
import { RootState } from ".";

const initialState = {
  isModalOpen: false,
  children: null as ReactNode | null,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<ReactNode>) => {
      state.isModalOpen = true;
      state.children = action.payload;
    },
    closeModal: state => {
      state.isModalOpen = false;
      state.children = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export const selectModalState = (state: RootState) => state.modal;
export default modalSlice.reducer;
