import "./Menu.scss";
import { Header } from "../UI/Header/Header";

import { Badge, Avatar, Spin, Alert, Typography } from "antd";

import {
  FrownOutlined,
  HistoryOutlined,
  QuestionCircleOutlined,
  HeartOutlined,
  SettingOutlined,
  CalendarOutlined,
  MessageOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

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
                  <MessageOutlined />
                </Badge>
                <div className="title">Сообщения</div>
              </li>
            </NavLink>
            <li className="menu__item">
              <CalendarOutlined />
              <div className="title">Календарь</div>
            </li>{" "}
            <li className="menu__item">
              <QuestionCircleOutlined />
              <div className="title">Часто задаваемые вопросы</div>
            </li>
            <li className="menu__item">
              <HeartOutlined />
              <div className="title">Избранное</div>
            </li>
            <NavLink to={PrivetRoutesNames.APPOINTMENT_HISTOTY}>
              <li className="menu__item">
                <HistoryOutlined />
                <div className="title">История обращений</div>
              </li>
            </NavLink>
            <li className="menu__item">
              <SettingOutlined />
              <div className="title">Настройки</div>
            </li>
            <NavLink to={"/"}>
              <li onClick={signOut} className="menu__item">
                <LogoutOutlined />
                <div className="title">Выход</div>
              </li>
            </NavLink>
          </ul>
        </div>
      </Layout>
    </>
  );
};
