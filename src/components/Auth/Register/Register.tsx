import "../Authorization/Auth.scss";
import { Col, Row, Typography, Form, Input, Space, Button, Alert } from "antd";
import { NavLink, Navigate } from "react-router-dom";

import login from "../assets/icons/png/login.png";
import password from "../assets/icons/png/password.png";
import yandex from "../assets/icons/png/yandex.png";

import person from "../assets/icons/png/person.png";

import { Header } from "../../UI/Header/Header";
import { PublicRoutesNames } from "../../../routers";
import { FormUI } from "../../UI/FormUI/FormUI";
import { onValidatePassword, onValidateName, onValidateEmail } from "../../../utils/validators/auth";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { thunkRegisterWithEmail, onResetErrors } from "../../../slices/authSlice";
import { IRegisterValues } from "../../../types/auth";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useEffect } from "react";
import { UseLocalStorage } from "../../../hooks/useLocalStorage";
import { client_id } from "../../../config/oauth";

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
      <Header />
      <div className="auth__wrapper">
        <Row>
          <Col span={24}>
            <Typography.Title className="auth__sing_in" level={3}>
              Регистрация
            </Typography.Title>
          </Col>
          <Col span={24}>
            <FormUI callback={onFinish}>
              <Form.Item
                hasFeedback
                rules={[
                  { min: 2, message: "Имя должно быть длиннее 2 символов", required: true },
                  { max: 20, message: "Имя не может быть длиннее 20 символов" },
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
                  { min: 2, message: "Отчество должно быть длиннее 2 символов", required: true },
                  { max: 20, message: "Отчество не может быть длиннее 20 символов" },
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
              <Form.Item hasFeedback rules={[{ validator: onValidateEmail }]} name={"email"}>
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
                    message: "Пароли не совпадают",
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
            </FormUI>
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
        </Row>
        <div className="auth__background"></div>
      </div>
    </>
  );
};
