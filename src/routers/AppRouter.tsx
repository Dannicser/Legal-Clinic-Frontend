import { useAppSelector } from "../hooks/useAppSelector";
import { UseLocalStorage } from "../hooks/useLocalStorage";
import { useLayoutEffect } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";

import { Navigation } from "../components/Navigation/Navigation";
import { Spinner } from "../components/UI/Spinner/Spinner";

import AppPublicRoutes from "./AppPublicRoutes";
import AppPrivetRoutes from "./AppPrivetRoutes";

import { thunkCheckAuth } from "../slices/authSlice";
import { thunkGetStatusAppointment } from "../slices/appointmentSlice";

export const AppRouter: React.FC = () => {
  const { isAuth, isCheckingAuth } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    if (UseLocalStorage({ action: "get", key: "accessToken" }) || window.sessionStorage.getItem("accessToken")) {
      dispatch(thunkCheckAuth());
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
