import "./Menu.scss";
import { Header } from "../UI/Header/Header";
import { calendar, faq, favorite, leave, message, settings } from "./assets/icons";
import { Badge, Avatar } from "antd";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { onLogout } from "../../slices/authSlice";
import { UseLocalStorage } from "../../hooks/useLocalStorage";
import { NavLink } from "react-router-dom";
import { PrivetRoutesNames } from "../../routers";
import { Layout } from "../Layout/Layout";

export const Menu = () => {
  const dispatch = useAppDispatch();

  const signOut = () => {
    dispatch(onLogout());

    UseLocalStorage({ key: "userId", action: "remove" });
  };

  return (
    <>
      <Header title="Меню" />
      <Layout>
        <div className="menu__wrapper">
          <div className="user__info">
            <Avatar size="large">{"Д"}</Avatar>
            <div className="name">Даниил Дмитриев</div>
          </div>
          <ul className="menu__list">
            <NavLink to={PrivetRoutesNames.CONVERSATION}>
              <li className="menu__item">
                <Badge size="small" count={1}>
                  <img src={message} alt="" />{" "}
                </Badge>
                <div className="title">Сообщения</div>
              </li>
            </NavLink>
            <li className="menu__item">
              <img src={calendar} alt="" />
              <div className="title">Календарь</div>
            </li>{" "}
            <li className="menu__item">
              <img src={faq} alt="" />
              <div className="title">Часто задаваемые вопросы</div>
            </li>
            <li className="menu__item">
              <img src={favorite} alt="" />
              <div className="title">Избранное</div>
            </li>
            <li className="menu__item">
              <img src={settings} alt="" />
              <div className="title">Настройки</div>
            </li>
            <NavLink to={"/"}>
              <li onClick={signOut} className="menu__item">
                <img src={leave} alt="" />
                <div className="title">Выход</div>
              </li>
            </NavLink>
          </ul>
        </div>
      </Layout>
    </>
  );
};
