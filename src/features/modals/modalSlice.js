import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showDelete: false,
  showHelp: false,
};
const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    // showModal: (state) => {
    //   state.show = true;
    // },
    // hideModal: (state) => {
    //   state.show = false;
    // },
    toggle: (state, action) => {
      if (action.payload === "help") {
        state.showHelp = !state.showHelp;
      } else if (action.payload === "delete") {
        state.showDelete = !state.showDelete;
      }
    },
  },
});

export const { showModal, hideModal, toggle } = modalSlice.actions;
export default modalSlice.reducer;
