import { iRouter, privetRoutes, publicRoutes } from ".";
import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { Auth } from "../components/Auth/Authorization/Auth";
import { useAppSelector } from "../hooks/useAppSelector";
import { UseLocalStorage } from "../hooks/useLocalStorage";
import { useLayoutEffect } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { onGetCheckAuth } from "../slices/authSlice";
import { Navigation } from "../components/Navigation/Navigation";
import { Spinner } from "../components/UI/Spinner/Spinner";

export const AppRouter: React.FC = () => {
  const { isAuth, isCheckingAuth } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    if (UseLocalStorage({ action: "get", key: "token" })) {
      dispatch(onGetCheckAuth());
    }
  }, []);

  if (isCheckingAuth) {
    return <Spinner />;
  }

  return (
    <>
      {isAuth ? (
        <Routes>
          {privetRoutes.map((el: iRouter) => (
            <Route key={el.path} path={el.path} element={<el.component />} />
          ))}
          <Route element={<Home />} path="*" />
        </Routes>
      ) : (
        <Routes>
          {publicRoutes.map((el: iRouter) => (
            <Route key={el.path} path={el.path} element={<el.component />} />
          ))}
          <Route element={<Auth />} path="*" />
        </Routes>
      )}
      {isAuth && <Navigation />}
    </>
  );
};
