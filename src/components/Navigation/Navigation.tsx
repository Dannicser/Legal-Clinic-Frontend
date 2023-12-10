import { NavLink } from "react-router-dom";
import { PrivetRoutesNames } from "../../routers";

import { EnvironmentOutlined, UserOutlined, HomeOutlined, CalendarOutlined } from "@ant-design/icons";

import "./Navigation.scss";

export const Navigation: React.FC = () => {
  return (
    <nav>
      <div className="nav__container">
        <ul className="nav__menu">
          <li className="nav__item">
            <NavLink to={PrivetRoutesNames.HOME}>
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
