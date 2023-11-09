import { NavLink } from "react-router-dom";
import "./Navigation.scss";
import { map, main, events, profile } from "./icons/index";

import { EnvironmentOutlined, UserOutlined, HomeOutlined, CalendarOutlined } from "@ant-design/icons";
import { PrivetRoutesNames } from "../../routers";

export const Navigation = () => {
  return (
    <nav>
      <div className="nav__container">
        <ul className="nav__menu">
          <li className="nav__item">
            <NavLink to={"/"}>
              <HomeOutlined />
              <div className="title">Главная</div>{" "}
            </NavLink>
          </li>

          <li className="nav__item">
            <NavLink to={PrivetRoutesNames.APPOINTMENT}>
              <CalendarOutlined />
              <div className="title">Запись</div>{" "}
            </NavLink>
          </li>

          <li className="nav__item">
            <NavLink to={PrivetRoutesNames.MAP}>
              <EnvironmentOutlined />
              <div className="title">Карта</div>
            </NavLink>
          </li>

          <li className="nav__item">
            <NavLink to={PrivetRoutesNames.PROFILE}>
              <UserOutlined />
              <div className="title">Профиль</div>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};
