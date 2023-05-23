import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice";
import notificationSlice from "../slices/notificationSlice";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: { auth: authSlice, notification: notificationSlice },
});
