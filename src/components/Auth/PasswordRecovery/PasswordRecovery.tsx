import "./PasswordRecovery.scss";
import { Row, Col, Typography, Input, Button, Form } from "antd";
import { Header } from "../../UI/Header/Header";
import login from "../assets/icons/login.svg";
import { onValidateEmail } from "../../../utils/validators/auth";

export const PasswordRecovery = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  return (
    <>
      <Header />
      <div className="recovery__wrapper">
        <div>
          <Typography.Title level={2} className="title__recovery">
            Resset Password
          </Typography.Title>
          <Typography.Text className="descr__recovery">Please enter your email address to request a password reset</Typography.Text>
          <Form onFinish={onFinish}>
            <Form.Item hasFeedback rules={[{ validator: onValidateEmail }]} name={"password"}>
              <Input autoComplete="on" placeholder={"abc@email.com"} className="auth__input" prefix={<img src={login} />} size="large" />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" size="large" type="primary" block>
                SEND
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};
