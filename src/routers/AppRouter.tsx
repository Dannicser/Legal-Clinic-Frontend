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

export const AppRouter: React.FC = () => {
  console.log("Main render");
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const isCheckingAuth = useAppSelector((state) => state.auth.isCheckingAuth);
  const user_id = useAppSelector((state) => state.user.user._id);

  const location = useLocation();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (UseLocalStorage({ action: "get", key: "accessToken" }) || window.sessionStorage.getItem("accessToken")) {
      dispatch(thunkCheckAuth());
    }
  }, []);

  useEffect(() => {
    if (isAuth && location.pathname !== PrivetRoutesNames.APPOINTMENT) {
      dispatch(thunkGetStatusAppointment());
    }
  }, []);

  useEffect(() => {
    if (isAuth) {
      dispatch(thunkGetAllNotifications());
    }
  }, [isAuth]);

  useEffect(() => {
    if (isAuth && user_id) {
      subscribe();
    }
  }, [isAuth, user_id]);

  useEffect(() => {
    if (isAuth && location.pathname !== PrivetRoutesNames.APPOINTMENT) {
      dispatch(thunkGetStatusAppointment());
    }
  }, [isAuth]);

  const subscribe = () => {
    const eventSource = new EventSource(`http://localhost:5000/api/notification/connect/?user_id=${user_id}`, {
      withCredentials: true,
    });

    eventSource.onmessage = (event) => {
      dispatch(onAddNotification(JSON.parse(event.data)));
      onSoundEffect();
    };
    eventSource.onerror = (error) => {
      console.log(error);
    };

    return () => {
      eventSource.close();
    };
  };

  if (isCheckingAuth) {
    return <Spinner />;
  }

  return (
    <>
      {isAuth ? <AppPrivetRoutes /> : <AppPublicRoutes />}
      {isAuth && <Navigation />}
    </>
  );
};
