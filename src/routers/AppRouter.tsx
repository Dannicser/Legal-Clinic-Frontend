import { useAppSelector } from "../hooks/useAppSelector";
import { UseLocalStorage } from "../hooks/useLocalStorage";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";

import { Navigation } from "../components/Navigation/Navigation";
import { Spinner } from "../components/UI/Spinner/Spinner";

import AppPublicRoutes from "./AppPublicRoutes";
import AppPrivetRoutes from "./AppPrivetRoutes";

import { thunkCheckAuth } from "../slices/authSlice";
import { thunkGetStatusAppointment } from "../slices/appointmentSlice";
import { thunkGetAllNotifications } from "../slices/notificationSlice";
import { thunkGetUserInfo } from "../slices/userSlice";

import { thunkGetAllPostsByType } from "../slices/postSlice";

import { Connection } from "../components/Notification/Connection/Connection";

import { Categories } from "../types/post";
import { Cookie } from "../components/Cookie/Cookie";

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

  useEffect(() => {
    if (isAuth) {
      dispatch(thunkGetAllPostsByType(Categories.CIVIL));
      dispatch(thunkGetAllPostsByType(Categories.CRIMINAL));
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
      <Cookie />
    </>
  );
};
