import { useAppSelector } from "../../../hooks/useAppSelector";

import { NavLink } from "react-router-dom";

import { PrivetRoutesNames } from "../../../routers";

import { Badge } from "antd";

import burger from "./icons/burger.png";
import ring from "./icons/notification.svg";

import "./HeaderMenu.scss";

export const HeaderMenu = () => {
  const unread = useAppSelector((state) => state.notification.unread);

  return (
    <>
      <div className="header__menu__wrapper">
        <div className="header__menu__container">
          <div className="header__menu__burger">
            <NavLink to={PrivetRoutesNames.MENU}>
              <img src={burger} alt="" />
            </NavLink>
          </div>
          <div className="header__menu__notification">
            <NavLink to={PrivetRoutesNames.NOTIFICATIONS}>
              <Badge size="small" count={unread}>
                <div className="bg_notification">
                  <img src={ring} alt="" />
                </div>
              </Badge>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};
