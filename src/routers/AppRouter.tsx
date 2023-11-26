import { useAppSelector } from "../hooks/useAppSelector";
import { UseLocalStorage } from "../hooks/useLocalStorage";
import { useEffect, useLayoutEffect } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";

import { Navigation } from "../components/Navigation/Navigation";
import { Spinner } from "../components/UI/Spinner/Spinner";

import AppPublicRoutes from "./AppPublicRoutes";
import AppPrivetRoutes from "./AppPrivetRoutes";

import { thunkCheckAuth } from "../slices/authSlice";
import { thunkGetStatusAppointment } from "../slices/appointmentSlice";
import { useLocation } from "react-router-dom";
import { PrivetRoutesNames } from ".";
import { onAddNotification, thunkGetAllNotifications } from "../slices/notificationSlice";

import { onSoundEffect } from "../components/Notification/audio";
import { Connection } from "../components/Notification/Connection/Connection";
import { thunkGetUserInfo } from "../slices/userSlice";

export const AppRouter: React.FC = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const isCheckingAuth = useAppSelector((state) => state.auth.isCheckingAuth);
  const user_id = useAppSelector((state) => state.user.user._id);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (UseLocalStorage({ action: "get", key: "accessToken" }) || window.sessionStorage.getItem("accessToken")) {
      dispatch(thunkCheckAuth());
    }
  }, []);

  useEffect(() => {
    if (isAuth) {
      dispatch(thunkGetUserInfo());
    }
  }, [isAuth]);

  useEffect(() => {
    if (isAuth) {
      dispatch(thunkGetStatusAppointment());
    }
  }, [isAuth]);

  useEffect(() => {
    if (isAuth) {
      dispatch(thunkGetAllNotifications());
    }
  }, [isAuth]);

  if (isCheckingAuth) {
    return <Spinner />;
  }

  return (
    <>
      {isAuth ? <AppPrivetRoutes /> : <AppPublicRoutes />}
      {isAuth && <Navigation />}
      {isAuth && user_id && <Connection />}
    </>
  );
};
