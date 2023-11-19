import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice";
import alertSlice from "../slices/alertSlice";
import userSlice from "../slices/userSlice";
import postSlice from "../slices/postSlice";
import appointmentSlice from "../slices/appointmentSlice";
import notificationSlice from "../slices/notificationSlice";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: {
    auth: authSlice,
    alert: alertSlice,
    user: userSlice,
    post: postSlice,
    notification: notificationSlice,
    appointment: appointmentSlice,
  },
});
