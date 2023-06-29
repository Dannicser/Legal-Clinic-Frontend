import "./Auth.scss";
import { NavLink, Navigate } from "react-router-dom";
import { PublicRoutesNames } from "../../../routers";
import { Col, Row, Typography, Form, Input, Space, Switch, Button, Alert } from "antd";
import logo from "../assets/img/logo.png";
import login from "../assets/icons/login.svg";
import password from "../assets/icons/password.svg";
import google from "../assets/icons/google.svg";
import { IAuth } from "../../../types/auth";
import { onValidateEmail } from "../../../utils/validators/auth";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { onGetAuth, onGetRegisterWithGoogle, onResetErrors } from "../../../slices/authSlice";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useEffect } from "react";

export const Auth = () => {
  const state = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(onResetErrors());
  }, []);

  const authWithEmail = (values: IAuth) => {
    dispatch(onGetAuth(values));
  };

  const authWithGoogle = () => {
    dispatch(onGetRegisterWithGoogle());
  };

  if (!localStorage.getItem("intro")) {
    return <Navigate to={"/intro"} />;
  }

  console.log(state);

  return (
    <div className="auth__wrapper">
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
            <Form.Item hasFeedback rules={[{ validator: onValidateEmail }]} name="email">
              <Input max={8} autoComplete="on" placeholder="abc@email.com" className="auth__input" prefix={<img src={login} />} size="large" />
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
              <Input.Password autoComplete="of" placeholder={"Ваш пароль"} className="auth__input" prefix={<img src={password} />} size="large" />
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
              <Button loading={state.status === "loading"} htmlType="submit" size="large" type="primary" block>
                Войти
              </Button>
              {state.status === "error" && <Alert type="error" showIcon className="error__message" message={state.message} banner closable />}
            </Form.Item>
          </Col>
          <Col span={24}>
            <div className="auth__or">или</div>
          </Col>
          <Col span={24}>
            <Space onClick={authWithGoogle} className="auth__google" size={14}>
              <img src={google} alt="" />
              <Typography.Text strong>Войти с помощью Google</Typography.Text>
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
  );
};
