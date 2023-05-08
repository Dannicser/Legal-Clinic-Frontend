import "./Auth.scss";
import { NavLink, Navigate } from "react-router-dom";
import { RoutesNames } from "../../../routers";
import { Col, Row, Typography, Form, Input, Space, Switch, Button, Alert } from "antd";
import logo from "../assets/img/logo.png";
import login from "../assets/icons/login.svg";
import password from "../assets/icons/password.svg";
import google from "../assets/icons/google.svg";
import { IAuth } from "../../../types/auth";
import { onValidateEmail } from "../../../utils/validators/auth";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { onGetAuth } from "../../../slices/authSlice";
import { useAppDispatch } from "../../../hooks/useAppDispatch";

export const Auth = () => {
  const state = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const onFinish = (values: IAuth) => {
    dispatch(onGetAuth(values));
  };

  if (!localStorage.getItem("intro")) {
    return <Navigate to={"/intro"} />;
  }
  console.log(state);

  return (
    <div className="auth__wrapper">
      <Form initialValues={{ remember: false }} name="basic" onFinish={onFinish}>
        <Row justify={"space-between"}>
          <Col span={24}>
            <img className="auth__logo" src={logo} alt="" />
          </Col>
          <Col span={24}>
            <Typography.Title className="auth__title" level={1}>
              Legal Clinic
            </Typography.Title>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Typography.Title className="auth__sing_in" level={3}>
              Sing in
            </Typography.Title>
          </Col>
          <Col span={24}>
            <Form.Item hasFeedback rules={[{ validator: onValidateEmail }]} name="email">
              <Input autoComplete="on" placeholder="abc@email.com" className="auth__input" prefix={<img src={login} />} size="large" />
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
              <Input.Password autoComplete="of" placeholder={"Your password"} className="auth__input" prefix={<img src={password} />} size="large" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Row justify={"space-between"}>
              <Row align={"bottom"} justify={"start"}>
                <Space size={"small"}>
                  <Form.Item valuePropName="checked" name={"remember"}>
                    <Switch checked={false} />
                  </Form.Item>
                  <Form.Item name={"remember"}>
                    <Typography.Text strong>Remember me</Typography.Text>
                  </Form.Item>
                </Space>
              </Row>
              <Row>
                <NavLink to="/recovery">
                  <Typography.Text className="auth__forgot">Forgot password?</Typography.Text>
                </NavLink>
              </Row>
            </Row>
          </Col>
          <Col span={24}>
            <Form.Item>
              <Button loading={state.status === "loading"} htmlType="submit" size="large" type="primary" block>
                SIGN IN
              </Button>
              {state.message && <Alert type="error" showIcon className="error__message" message={state.message} banner closable />}
            </Form.Item>
          </Col>
          <Col span={24}>
            <div className="auth__or">OR</div>
          </Col>
          <Col span={24}>
            <Space className="auth__google" size={14}>
              <img src={google} alt="" />
              <Typography.Text strong>Login with Google</Typography.Text>
            </Space>
          </Col>
          <Col span={24}>
            <div className="auth__sign_up__container">
              <Typography.Text className="auth__sign_up">Don’t have an account?</Typography.Text>
              <Typography.Text strong>
                <NavLink to={RoutesNames.REGISTRATION}>Sign Up</NavLink>
              </Typography.Text>
            </div>
          </Col>
        </Row>
      </Form>
      <div className="auth__background"></div>
    </div>
  );
};
