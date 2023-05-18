import { NavLink } from "react-router-dom";
import "./Navigation.scss";
import { map, main, events, profile } from "./icons/index";
import { PrivetRoutesNames } from "../../routers";

export const Navigation = () => {
  return (
    <nav>
      <div className="nav__menu">
        <NavLink to={"/"}>
          <div className="nav__item">
            <img src={main} alt="" />
            <div className="title">Главная</div>
          </div>
        </NavLink>
        <NavLink to={PrivetRoutesNames.APPOINTMENT}>
          <div className="nav__item">
            <img src={events} alt="" />
            <div className="title">Запись</div>
          </div>
        </NavLink>
        <NavLink to={PrivetRoutesNames.MAP}>
          <div className="nav__item">
            <img src={map} alt="" />
            <div className="title">Карта</div>
          </div>
        </NavLink>
        <NavLink to={PrivetRoutesNames.PROFILE}>
          <div className="nav__item">
            <img src={profile} alt="" />
            <div className="title">Профиль</div>
          </div>
        </NavLink>
      </div>
    </nav>
  );
};
