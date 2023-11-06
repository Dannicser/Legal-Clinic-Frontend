import "./Menu.scss";
import { Header } from "../UI/Header/Header";
import { calendar, faq, favorite, leave, message, settings } from "./assets/icons";

import { Badge, Avatar, Spin, Alert, Typography } from "antd";
import { FrownOutlined } from "@ant-design/icons";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { thunkLogoutWithEmail } from "../../slices/authSlice";

import { NavLink } from "react-router-dom";

import { PrivetRoutesNames } from "../../routers";
import { Layout } from "../Layout/Layout";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useEffect } from "react";
import { thunkGetUserInfo } from "../../slices/userSlice";

export const Menu = () => {
  const dispatch = useAppDispatch();
  const { user, loading, error } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(thunkGetUserInfo());
  }, []);

  const signOut = () => {
    dispatch(thunkLogoutWithEmail());
  };

  return (
    <>
      <Header title="Меню" />
      <Layout>
        <div className="menu__wrapper">
          <div className="user__info">
            {loading ? (
              <Spin />
            ) : (
              <>
                <Avatar size="large">{user.first_name[0] || <FrownOutlined />}</Avatar>
                <div className="name">
                  <Typography.Title level={4}>
                    {user.first_name} {user.last_name}
                  </Typography.Title>
                </div>
              </>
            )}
            {error && <Alert message="Ошибка, попробуйте обновить страницу" type="error" showIcon />}
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
