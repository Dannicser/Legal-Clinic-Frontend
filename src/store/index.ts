import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice";
import notificationSlice from "../slices/notificationSlice";
import userSlice from "../slices/userSlice";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: { auth: authSlice, notification: notificationSlice, user: userSlice },
});
