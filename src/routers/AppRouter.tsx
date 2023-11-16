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

export const AppRouter: React.FC = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const isCheckingAuth = useAppSelector((state) => state.auth.isCheckingAuth);

  const location = useLocation();

  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    if (UseLocalStorage({ action: "get", key: "accessToken" }) || window.sessionStorage.getItem("accessToken")) {
      dispatch(thunkCheckAuth());
    }

    if (location.pathname !== PrivetRoutesNames.APPOINTMENT) {
      dispatch(thunkGetStatusAppointment());
    }
  }, []);

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
