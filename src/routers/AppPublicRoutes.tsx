import { Routes, Route } from "react-router-dom";

import { iRouter, publicRoutes } from ".";
import { Auth } from "../components/Auth/Authorization/Auth";

const AppPublicRoutes: React.FC = () => {
  return (
    <Routes>
      {publicRoutes.map((el: iRouter) => (
        <Route key={el.path} path={el.path} element={<el.component />} />
      ))}
      <Route element={<Auth />} path="*" />
    </Routes>
  );
};

export default AppPublicRoutes;
