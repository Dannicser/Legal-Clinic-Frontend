import { createSlice } from "@reduxjs/toolkit";
import { IState } from "../types/alert";

const initialState: IState = {
  status: "none",
  type: "info",
  message: "",
  description: "",
  duration: 0,
  placement: "topRight",
};

const alertSlice = createSlice({
  initialState,
  name: "alert",
  reducers: {
    onShowAlert: (state, { payload }) => {
      state.message = payload.message;
      state.description = payload.description;
      state.status = payload.status;
      state.duration = payload.duration;
      state.type = payload.type;
      state.placement = payload.placement;
    },
    onHideAlert: (state) => {
      state.status = "none";
      state.message = "";
      state.description = "";
      state.duration = 0;
      state.type = "info";
      state.placement = "topRight";
    },
  },
});

export default alertSlice.reducer;
export const { onHideAlert, onShowAlert } = alertSlice.actions;
