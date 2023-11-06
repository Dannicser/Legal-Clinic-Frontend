import { Routes, Route } from "react-router-dom";
import { iRouter, privetRoutes } from ".";
import { HomePage } from "../pages/HomePage";

const AppPrivetRoutes: React.FC = () => {
  return (
    <Routes>
      {privetRoutes.map((el: iRouter) => (
        <Route key={el.path} path={el.path} element={<el.component />} />
      ))}
      <Route element={<HomePage />} path="*" />
    </Routes>
  );
};

export default AppPrivetRoutes;
