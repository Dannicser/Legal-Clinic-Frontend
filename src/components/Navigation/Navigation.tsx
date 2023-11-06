import { NavLink } from "react-router-dom";
import "./Navigation.scss";
import { map, main, events, profile } from "./icons/index";
import { PrivetRoutesNames } from "../../routers";

export const Navigation = () => {
  return (
    <nav>
      <div className="nav__container">
        <ul className="nav__menu">
          <li className="nav__item">
            <NavLink to={"/"}>
              <img src={main} alt="" />
              <div className="title">Главная</div>{" "}
            </NavLink>
          </li>

          <li className="nav__item">
            <NavLink to={PrivetRoutesNames.APPOINTMENT}>
              <img src={events} alt="" />
              <div className="title">Запись</div>{" "}
            </NavLink>
          </li>

          <li className="nav__item">
            <NavLink to={PrivetRoutesNames.MAP}>
              <img src={map} alt="" />
              <div className="title">Карта</div>
            </NavLink>
          </li>

          <li className="nav__item">
            <NavLink to={PrivetRoutesNames.PROFILE}>
              <img src={profile} alt="" />
              <div className="title">Профиль</div>{" "}
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};
