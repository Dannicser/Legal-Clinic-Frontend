import { Badge } from "antd";
import "./HeaderMenu.scss";
import burger from "./icons/burger.png";
import ring from "./icons/notification.svg";
import { NavLink } from "react-router-dom";

export const HeaderMenu = () => {
  return (
    <div className="header__menu__wrapper">
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
  );
};
