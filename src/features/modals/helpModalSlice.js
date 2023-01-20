import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
};
const helpModalSlice = createSlice({
  name: "helpModal",
  initialState,
  reducers: {
    // showModal: (state) => {
    //   state.show = true;
    // },
    // hideModal: (state) => {
    //   state.show = false;
    // },
    toggle: (state) => {
      state.show = !state.show;
    },
  },
});

export const { showModal, hideModal, toggle } = helpModalSlice.actions;
export default helpModalSlice.reducer;
