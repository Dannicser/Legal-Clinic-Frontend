import { Badge } from "antd";

import burger from "./icons/burger.png";
import ring from "./icons/notification.svg";

import { NavLink } from "react-router-dom";

import "./HeaderMenu.scss";

export const HeaderMenu = () => {
  return (
    <div className="header__menu__wrapper">
      <div className="header__menu__container">
        <div className="header__menu__burger">
          <NavLink to={"/menu"}>
            <img src={burger} alt="" />
          </NavLink>
        </div>
        <div className="header__menu__notification">
          <Badge size="small" count={1}>
            <div className="bg_notification">
              <img src={ring} alt="" />
            </div>
          </Badge>
        </div>
      </div>
    </div>
  );
};
