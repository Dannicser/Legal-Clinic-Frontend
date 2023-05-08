import { iRouter, publicRoutes } from ".";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export const AppRouter = () => {
  const auth = false;
  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes.map((el: iRouter) => (
          <Route key={el.path} path={el.path} element={<el.component />} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};
