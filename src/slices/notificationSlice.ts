import { createSlice } from "@reduxjs/toolkit";
import { IState } from "../types/notification";

const initialState: IState = {
  status: "none",
  type: "info",
  message: "",
  description: "",
  duration: 0,
  placement: "topRight",
};

const notificationSlice = createSlice({
  initialState,
  name: "notification",
  reducers: {
    onShowNotice: (state, { payload }) => {
      state.message = payload.message;
      state.description = payload.description;
      state.status = payload.status;
      state.duration = payload.duration;
      state.type = payload.type;
      state.placement = payload.placement;
    },
    onHideNotice: (state) => {
      state.status = "none";
      state.message = "";
      state.description = "";
      state.duration = 0;
      state.type = "info";
      state.placement = "topRight";
    },
  },
});

export default notificationSlice.reducer;
export const { onShowNotice, onHideNotice } = notificationSlice.actions;
