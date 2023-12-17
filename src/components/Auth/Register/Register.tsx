import { useEffect } from "react";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { thunkRegisterWithEmail, onResetErrors } from "../../../slices/authSlice";

import { Helmet } from "react-helmet";

import { PublicRoutesNames } from "../../../routers";

import { Col, Typography, Form, Input, Space, Button, Alert } from "antd";
import { NavLink, Navigate } from "react-router-dom";

import login from "../assets/icons/png/login.png";
import password from "../assets/icons/png/password.png";
import yandex from "../assets/icons/png/yandex.png";
import person from "../assets/icons/png/person.png";

import { Header } from "../../UI/Header/Header";

import { Layout } from "../../Layout/Layout";

import { onValidatePassword, onValidateName } from "../../../utils/validators/auth";

import { IRegisterValues } from "../../../types/auth";

import { client_id } from "../../../config/oauth";

import "./Register.scss";

export const Register = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(onResetErrors());
  }, []);

  const onFinish = (values: IRegisterValues) => {
    dispatch(thunkRegisterWithEmail(values));
  };

  if (state.isAuth) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <Helmet>
        <title>Регистрация - Юридическая клиника при ЕГУ.им И.А. Бунина</title>
        <meta name="description" content="Создание аккаунта в приложении Юридической клиники при ЕГУ им И.А. Бунина" />
        <meta name="keywords" content="юридическая клиника, создать аккаунт, регистация, учетная запись" />
      </Helmet>
      <Header title="Регистрация" />

      <div className="register_wrapper">
        <Layout
          external={{ paddingBottom: 0, paddingLeft: 0, paddingRight: 0, paddingTop: 65 }}
          internal={{ paddingBottom: 0, paddingLeft: 20, paddingRight: 20, paddingTop: 0 }}
        >
          <Col span={24}>
            <Form onFinish={onFinish}>
              <Form.Item
                hasFeedback
                rules={[
                  { min: 2, message: "Имя должно быть длиннее 2 символов" },
                  { max: 20, message: "Имя не может быть длиннее 20 символов" },
                  { validator: onValidateName },
                  { transform: (value) => value.trim() },
                ]}
                name={"first_name"}
              >
                <Input
                  autoComplete="off"
                  placeholder={"Ваше имя"}
                  className="auth__input"
                  prefix={<img className="inp_icon" src={person} />}
                  size="large"
                />
              </Form.Item>
              <Form.Item
                hasFeedback
                rules={[
                  { min: 2, message: "Отчество должно быть длиннее 2 символов" },
                  { max: 20, message: "Отчество не может быть длиннее 20 символов" },
                  { validator: onValidateName },
                  { transform: (value) => value.trim() },
                ]}
                name={"last_name"}
              >
                <Input
                  autoComplete="off"
                  placeholder={"Ваше отчество"}
                  className="auth__input"
                  prefix={<img className="inp_icon" src={person} />}
                  size="large"
                />
              </Form.Item>
              <Form.Item
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Поле обязательно",
                  },
                  {
                    type: "email",
                    message: "Неверный формат email",
                  },
                ]}
                name={"email"}
              >
                <Input
                  autoComplete="on"
                  placeholder={"abc@email.com"}
                  className="auth__input"
                  prefix={<img className="inp_icon" src={login} />}
                  size="large"
                />
              </Form.Item>
              <Form.Item hasFeedback rules={[{ validator: onValidatePassword }]} name={"password"}>
                <Input.Password
                  autoComplete="off"
                  placeholder={"Пароль"}
                  className="auth__input"
                  prefix={<img className="inp_icon" src={password} />}
                  size="large"
                />
              </Form.Item>
              <Form.Item
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Поле обязательно",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("Пароли не совпадают"));
                    },
                  }),
                ]}
                name={"confirm"}
              >
                <Input.Password
                  autoComplete="off"
                  placeholder={"Повторите пароль"}
                  className="auth__input"
                  prefix={<img className="inp_icon" src={password} />}
                  size="large"
                />
              </Form.Item>
              <Col span={24}>
                <Form.Item>
                  <Button loading={state.isLoading} htmlType="submit" size="large" type="primary" block>
                    Создать аккаунт
                  </Button>
                  {state.isError && <Alert type="error" showIcon className="mt-1 error__message" message={state.message} banner closable />}
                </Form.Item>
              </Col>
            </Form>
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
              <Typography.Text className="auth__sign_up">Уже есть аккаунт?</Typography.Text>
              <Typography.Text strong>
                <NavLink to={PublicRoutesNames.AUTH}>Войдите</NavLink>
              </Typography.Text>
            </div>
          </Col>
        </Layout>
      </div>
    </>
  );
};
