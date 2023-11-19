import "./Menu.scss";
import { Header } from "../UI/Header/Header";

import { Badge, Avatar, Spin, Alert, Typography, Result, Popconfirm, Tooltip, Button } from "antd";

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

import { AppointmentStatus } from "../../types/appointment";

export const Menu = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const loading = useAppSelector((state) => state.user.loading);
  const error = useAppSelector((state) => state.user.error);
  const status = useAppSelector((state) => state.appointment.data.status);
  const formatDate = useAppSelector((state) => state.appointment.data.formatDate);

  useEffect(() => {
    dispatch(thunkGetUserInfo());
  }, []);

  const signOut = () => {
    dispatch(thunkLogoutWithEmail());
  };

  const banner =
    status === AppointmentStatus.CONFIRMED ? (
      <Alert message={`Запланировано посещение юридической клиники ${formatDate}`} banner showIcon type="info" />
    ) : null;

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
            <NavLink to={PrivetRoutesNames.APPOINTMENT_CALENDAR}>
              <li className="menu__item">
                <CalendarOutlined />
                <div className="title">Календарь записей</div>
              </li>
            </NavLink>
            <NavLink to={PrivetRoutesNames.FAQ}>
              <li className="menu__item">
                <QuestionCircleOutlined />
                <div className="title">Часто задаваемые вопросы</div>
              </li>
            </NavLink>
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
            <li className="menu__item">
              <LogoutOutlined />
              <Popconfirm
                placement="bottom"
                title={<Typography.Title level={5}>Вы действительно хотите выйти из профиля?</Typography.Title>}
                onConfirm={signOut}
                okText="Да"
                cancelText="Нет"
              >
                <div className="title">Выход</div>
              </Popconfirm>
            </li>
            <li>{banner}</li>
          </ul>
        </div>
      </Layout>
    </>
  );
};
