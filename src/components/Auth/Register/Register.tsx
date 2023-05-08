import "../Authorization/Auth.scss";
import { Col, Row, Typography, Form, Input, Space, Button } from "antd";
import { NavLink } from "react-router-dom";
import login from "../assets/icons/login.svg";
import password from "../assets/icons/password.svg";
import google from "../assets/icons/google.svg";
import name from "../assets/icons/name.svg";
import { Header } from "../../UI/Header/Header";
import { RoutesNames } from "../../../routers";
import { FormUI } from "../../UI/FormUI/FormUI";
import { onValidatePassword } from "../../../utils/validators/auth";
import { onValidateEmail } from "../../../utils/validators/auth";
import { onValidateName } from "../../../utils/validators/auth";

export const Register = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  return (
    <>
      <Header />
      <div className="auth__wrapper">
        <Row>
          <Col span={24}>
            <Typography.Title className="auth__sing_in" level={3}>
              Sing up
            </Typography.Title>
          </Col>
          <Col span={24}>
            <FormUI callback={onFinish}>
              <Form.Item hasFeedback rules={[{ validator: onValidateName }, { transform: (value) => value.trim() }]} name={"name"}>
                <Input autoComplete="off" placeholder={"Full name"} className="auth__input" prefix={<img src={name} />} size="large" />
              </Form.Item>
              <Form.Item hasFeedback rules={[{ validator: onValidateEmail }]} name={"email"}>
                <Input autoComplete="off" placeholder={"abc@email.com"} className="auth__input" prefix={<img src={login} />} size="large" />
              </Form.Item>
              <Form.Item hasFeedback rules={[{ validator: onValidatePassword }]} name={"password"}>
                <Input.Password
                  autoComplete="off"
                  placeholder={"Your password"}
                  className="auth__input"
                  prefix={<img src={password} />}
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
                  placeholder={"Confirm password"}
                  className="auth__input"
                  prefix={<img src={password} />}
                  size="large"
                />
              </Form.Item>
              <Col span={24}>
                <Form.Item>
                  <Button htmlType="submit" size="large" type="primary" block>
                    SIGN UP
                  </Button>
                </Form.Item>
              </Col>
            </FormUI>
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
              <Typography.Text className="auth__sign_up">Already have an account?</Typography.Text>
              <Typography.Text strong>
                <NavLink to={RoutesNames.AUTH}>Sign in</NavLink>
              </Typography.Text>
            </div>
          </Col>
        </Row>
        <div className="auth__background"></div>
      </div>
    </>
  );
};
