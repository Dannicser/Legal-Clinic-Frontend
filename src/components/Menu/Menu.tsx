import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { thunkGetUserInfo } from "../../slices/userSlice";
import { thunkLogoutWithEmail } from "../../slices/authSlice";

import { Header } from "../UI/Header/Header";

import { Badge, Avatar, Spin, Alert, Typography, Tooltip, Button, Divider, Modal, FloatButton } from "antd";

import {
  FrownOutlined,
  HistoryOutlined,
  QuestionCircleOutlined,
  HeartOutlined,
  SettingOutlined,
  CalendarOutlined,
  MessageOutlined,
  LogoutOutlined,
  SmileOutlined,
} from "@ant-design/icons";

import { NavLink } from "react-router-dom";

import { PrivetRoutesNames } from "../../routers";
import { Layout } from "../Layout/Layout";

import { AppointmentStatus } from "../../types/appointment";

import "./Menu.scss";

export const Menu: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const isLoadingUser = useAppSelector((state) => state.user.isLoading);
  const isErrorUser = useAppSelector((state) => state.user.isError);
  const status = useAppSelector((state) => state.appointment.data.status);
  const formatDate = useAppSelector((state) => state.appointment.data.formatDate);

  const isLoadingAuth = useAppSelector((state) => state.auth.isLoading);
  const isErrorAuth = useAppSelector((state) => state.auth.isError);
  const message = useAppSelector((state) => state.auth.message);

  const [isOpenModel, setIsOpenModel] = useState<boolean>(false);

  useEffect(() => {
    if (!user._id) {
      dispatch(thunkGetUserInfo());
    }
  }, []);

  const signOut = () => {
    dispatch(thunkLogoutWithEmail());
  };

  const onOpenModel = () => {
    setIsOpenModel(true);
  };

  const banner =
    status === AppointmentStatus.CONFIRMED ? (
      <Alert message={`Запланировано посещение юридической клиники ${formatDate}`} banner showIcon type="info" />
    ) : null;

  return (
    <>
      <Header title="Меню" />
      <Layout>
        <Modal
          title="Выход"
          okText={"Да"}
          confirmLoading={isLoadingAuth}
          cancelText={"Не хочу"}
          open={isOpenModel}
          onOk={signOut}
          onCancel={() => setIsOpenModel(false)}
        >
          <Typography.Text type="warning" strong>
            Вы действительно хотите выйти из профиля?
          </Typography.Text>
          {isErrorAuth && (
            <>
              <Divider />
              <Alert type="error" message={message} />
            </>
          )}
        </Modal>
        <div className="menu__wrapper">
          <div className="user__info">
            {isLoadingUser ? (
              <div className="user_info_spin">
                <Spin size="large" />
              </div>
            ) : (
              <>
                <Avatar size="large">{user.first_name[0] || <FrownOutlined />}</Avatar>
                <div className="name">
                  <Typography.Title level={4}>
                    {user.first_name} {user.last_name}{" "}
                    {user.is_admin && (
                      <Button shape={"round"} size="small" type="primary" danger>
                        admin
                      </Button>
                    )}
                  </Typography.Title>
                </div>
              </>
            )}
          </div>{" "}
          {isErrorUser && <Alert message="Ошибка, попробуйте обновить страницу" type="error" showIcon />}
          <ul className="menu__list">
            {/* <NavLink to={PrivetRoutesNames.CONVERSATION}> */}
            <Tooltip color="#f50" title={"Извините, чат с сотрудником юридической клиники находится в разработке и скоро будет добавлен."}>
              <li className="menu__item">
                <Badge size="small" count={1}>
                  <MessageOutlined />
                </Badge>
                <div className="title">Сообщения</div>
              </li>
            </Tooltip>
            {/* </NavLink> */}
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
            <Tooltip color="#f50" title={"Извините, раздел «Избранное» находится в разработке и скоро будет добавлен."}>
              <li className="menu__item">
                <HeartOutlined />
                <div className="title">Избранное</div>
              </li>
            </Tooltip>
            <NavLink to={PrivetRoutesNames.APPOINTMENT_HISTOTY}>
              <li className="menu__item">
                <HistoryOutlined />
                <div className="title">История обращений</div>
              </li>
            </NavLink>
            <NavLink to={PrivetRoutesNames.SUPPORT}>
              <li className="menu__item">
                <SmileOutlined />
                <div className="title">Поддержка</div>
              </li>
            </NavLink>
            <NavLink to={PrivetRoutesNames.SETTINGS}>
              <li className="menu__item">
                <SettingOutlined />
                <div className="title">Настройки</div>
              </li>
            </NavLink>
            <li onClick={onOpenModel} className="menu__item">
              <LogoutOutlined />
              <div className="title">Выход</div>
            </li>
            <li>{banner}</li>
          </ul>
        </div>
      </Layout>
    </>
  );
};
