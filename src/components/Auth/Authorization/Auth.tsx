import { useEffect } from "react";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { thunkAuthWithEmail, onResetErrors, thunkAuthWithYandex, thunkRegisterWithEmail, onCloseConfirmingModal } from "../../../slices/authSlice";
import { useAppSelector } from "../../../hooks/useAppSelector";

import { Helmet } from "react-helmet";

import { NavLink, Navigate, useLocation, useNavigate } from "react-router-dom";
import { PublicRoutesNames } from "../../../routers";

import { Col, Row, Typography, Form, Input, Space, Switch, Button, Alert, Modal, Tooltip, Popconfirm, Divider } from "antd";
import { UserOutlined } from "@ant-design/icons";

import logo from "../assets/img/logo.png";
import login from "../assets/icons/png/login.png";
import password from "../assets/icons/png/password.png";
import yandex from "../assets/icons/png/yandex.png";

import { IAuthValues, IPreAuthWithYandex } from "../../../types/auth";

import { client_id } from "../../../config/oauth";

import { UseLocalStorage } from "../../../hooks/useLocalStorage";

import "./Auth.scss";

export const Auth: React.FC = () => {
  const isConfirming = useAppSelector((state) => state.auth.isConfirming);
  const isError = useAppSelector((state) => state.auth.isError);
  const isLoading = useAppSelector((state) => state.auth.isLoading);
  const message = useAppSelector((state) => state.auth.message);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const locate = useLocation();

  const authWithEmail = (values: IAuthValues) => {
    dispatch(thunkAuthWithEmail(values));
  };

  useEffect(() => {
    const code = locate.search.split("=")[1];

    if (code) {
      dispatch(thunkAuthWithYandex(code));

      return navigate("/");
    }
  }, []);

  useEffect(() => {
    dispatch(onResetErrors());
  }, []);

  if (!UseLocalStorage({ action: "get", key: "intro" })) {
    return <Navigate to={"/intro"} />;
  }

  return (
    <>
      <Helmet>
        <title>Авторизация - Юридическая клиника при ЕГУ.им И.А. Бунина</title>
        <meta name="description" content="Авторизация в приложении Юридической клиники при ЕГУ им И.А. Бунина" />
        <meta name="keywords" content="юридическая клиника, войти, авторизация" />
      </Helmet>
      <div className="auth__wrapper">
        {isConfirming && <ConfirmModelAuth />}
        <Form initialValues={{ remember: true }} name="basic" onFinish={authWithEmail}>
          <Row justify={"space-between"}>
            <Col span={24}>
              <img className="auth__logo" src={logo} alt="" />
            </Col>
            <Col span={24}>
              <Typography.Title className="auth__title" level={1}>
                Юридическая клиника
              </Typography.Title>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Typography.Title className="auth__sing_in" level={3}>
                Вход
              </Typography.Title>
            </Col>
            <Col span={24}>
              <Form.Item hasFeedback rules={[{ type: "email", message: "Некорректный email" }]} name="email">
                <Input
                  max={8}
                  autoComplete="on"
                  placeholder="abc@email.com"
                  className="auth__input"
                  prefix={<img className="inp_icon" src={login} />}
                  size="large"
                />
              </Form.Item>
              <Form.Item
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Заполните поле",
                  },
                ]}
                name="password"
              >
                <Input.Password
                  autoComplete="of"
                  placeholder={"Ваш пароль"}
                  className="auth__input"
                  prefix={<img className="inp_icon" src={password} />}
                  size="large"
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Row align={"middle"} justify={"space-between"}>
                <Row align={"middle"} justify={"start"}>
                  <Space size={"small"}>
                    <Form.Item valuePropName="checked" name={"remember"}>
                      <Switch />
                    </Form.Item>
                    <Form.Item name={"remember"}>
                      <Typography.Text style={{ marginRight: 5 }} strong>
                        Запомнить меня
                      </Typography.Text>
                    </Form.Item>
                  </Space>
                </Row>
                <Row align={"top"}>
                  <NavLink className="auth__forgot" to={PublicRoutesNames.RECOVERY}>
                    <Typography.Text strong>Забыли пароль?</Typography.Text>
                  </NavLink>
                </Row>
              </Row>
            </Col>
            <Col span={24}>
              <Form.Item>
                <Button loading={isLoading} htmlType="submit" size="large" type="primary" block>
                  Войти
                </Button>
                {isError && <Alert type="error" showIcon className="error__message" message={message} banner closable />}
              </Form.Item>
            </Col>
            <Col span={24}>
              <div className="auth__or">или</div>
            </Col>
            <Col span={24}>
              <Space className="auth__google" size={14}>
                <img src={yandex} alt="" />
                <Typography.Text strong>
                  <a href={`https://oauth.yandex.ru/authorize?response_type=code&client_id=${client_id}`}>Войти с Yandex</a>
                </Typography.Text>
              </Space>
            </Col>
            <Col span={24}>
              <div className="auth__sign_up__container">
                <Typography.Text className="auth__sign_up">Еще нет аккаунта?</Typography.Text>
                <Typography.Text strong>
                  <NavLink to={PublicRoutesNames.REGISTRATION}>Зарегистрируйтесь</NavLink>
                </Typography.Text>
              </div>
            </Col>
          </Row>
        </Form>
        <div className="auth__background"></div>
      </div>
    </>
  );
};

const ConfirmModelAuth: React.FC = () => {
  const email = useAppSelector((state) => state.user.user.email);
  const first_name = useAppSelector((state) => state.user.user.first_name);
  const last_name = useAppSelector((state) => state.user.user.last_name);

  const psuid = useAppSelector((state) => state.auth.psuid);
  const isLoading = useAppSelector((state) => state.auth.isLoading);
  const isError = useAppSelector((state) => state.auth.isError);

  const dispatch = useAppDispatch();

  const onRegister = (values: IPreAuthWithYandex) => {
    dispatch(thunkRegisterWithEmail({ ...values, password: psuid, is_yandex: true }));
  };

  const onCancelModal = () => {
    dispatch(onCloseConfirmingModal());
  };

  const error =
    isError && email.length ? (
      <Alert type="error" showIcon={false} message={"Произошла ошибка при регистрации. Попробуйте позже или авторизируйтесь по email."} />
    ) : (
      <Alert type="error" showIcon={false} message={"К сожалению, мы не смогли получить ваш email. Воспользуйтесь регистрацией по почте."} />
    );

  const content = (
    <Alert
      type="warning"
      banner
      showIcon={false}
      message={"Пожалуйста, убедитесь, что предоставленные данные верны. При необходимости вы можете их изменить."}
    />
  );

  return (
    <Modal title="Подтвердите данные" okText={"Войти"} cancelText={"Отменить"} onCancel={onCancelModal} footer={false} open={true}>
      <Form className="mt-1" onFinish={onRegister} initialValues={{ first_name, last_name, email }} name="preauth">
        <Row>
          <Col>
            <Tooltip
              title="Необходимо указать ваше настоящее имя, в противном случае, мы будем вынуждены отказать вам в оказании услуг"
              color={"red"}
            >
              <Typography.Text strong>Ваше имя</Typography.Text>
            </Tooltip>
          </Col>
        </Row>
        <Form.Item className="mt-1" hasFeedback rules={[{ required: true, min: 2, max: 20, message: "2 - 20 символов" }]} name={"first_name"}>
          <Input size="large" value={first_name} prefix={<UserOutlined />} />
        </Form.Item>
        <Row>
          <Col>
            <Tooltip
              title="Необходимо указать ваше настоящее отчество, в противном случае, мы будем вынуждены отказать вам в оказании услуг"
              color={"red"}
            >
              <Typography.Text strong>Ваше отчество</Typography.Text>
            </Tooltip>
          </Col>
        </Row>
        <Form.Item className="mt-1" hasFeedback rules={[{ required: true, min: 2, max: 20, message: "2 - 20 символов" }]} name={"last_name"}>
          <Input size="large" value={last_name} prefix={<UserOutlined />} />
        </Form.Item>
        <Row>
          <Col>
            <Tooltip title="Вы не можете изменить почту." color={"red"}>
              <Typography.Text strong>Ваша электронная почта</Typography.Text>
            </Tooltip>
          </Col>
        </Row>
        <Form.Item hasFeedback rules={[{ required: true }]} name={"email"} className="mt-1">
          <Input disabled size="large" placeholder={"Email отсутствует"} prefix={<img style={{ width: 20 }} src={login} />} />
        </Form.Item>

        {!isError && email.length ? content : error}

        <Divider />
        <Form.Item>
          <Row justify={"center"}>
            <Button disabled={email.length ? false : true} htmlType="submit" loading={isLoading} type="primary">
              Подтвердить
            </Button>
          </Row>
        </Form.Item>
      </Form>
    </Modal>
  );
};
