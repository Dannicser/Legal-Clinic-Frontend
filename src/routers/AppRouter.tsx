import { iRouter, privetRoutes, publicRoutes } from ".";
import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { Auth } from "../components/Auth/Authorization/Auth";
import { useAppSelector } from "../hooks/useAppSelector";
import { UseLocalStorage } from "../hooks/useLocalStorage";

export const AppRouter: React.FC = () => {
  const auth = useAppSelector((state) => state.auth.isAuth) || UseLocalStorage({ action: "get", key: "userId" });

  return (
    <>
      {auth ? (
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
    </>
  );
};
