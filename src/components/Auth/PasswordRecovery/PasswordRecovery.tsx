import "./PasswordRecovery.scss";
import { Alert, Typography, Input, Button, Form } from "antd";
import { Header } from "../../UI/Header/Header";
import login from "../assets/icons/login.svg";
import { onValidateEmail } from "../../../utils/validators/auth";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { onGetRecover, onResetErrors } from "../../../slices/authSlice";
import { IRecover } from "../../../types/auth";
import { useEffect } from "react";

export const PasswordRecovery = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(onResetErrors());
  }, []);

  const onFinish = (values: IRecover) => {
    dispatch(onGetRecover(values));
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
            <Form.Item hasFeedback rules={[{ validator: onValidateEmail }]} name={"email"}>
              <Input autoComplete="on" placeholder={"abc@email.com"} className="auth__input" prefix={<img src={login} />} size="large" />
            </Form.Item>
            <Form.Item>
              <Button loading={state.status === "loading"} htmlType="submit" size="large" type="primary" block>
                SEND
              </Button>
              {state.status === "successful" && (
                <Alert message="На указанный вами адрес отправленно письмо со сбросом пароля" className="mt-1" closable type="info" showIcon />
              )}
              {state.status === "error" && <Alert type="error" showIcon className="error__message" message={state.message} banner closable />}
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};
