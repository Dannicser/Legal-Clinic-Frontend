import "./PasswordRecovery.scss";
import { Alert, Typography, Input, Button, Form } from "antd";
import { Header } from "../../UI/Header/Header";
import login from "../assets/icons/login.svg";
import { onValidateEmail } from "../../../utils/validators/auth";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { onResetErrors } from "../../../slices/authSlice";
import { useEffect } from "react";

export const PasswordRecovery = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(onResetErrors());
  }, []);

  return (
    <>
      <Header />
      <div className="recovery__wrapper">
        <div>
          <Typography.Title level={2} className="title__recovery">
            Восстановление пароля
          </Typography.Title>
          <Typography.Text className="descr__recovery">
            Пожалуйста, введите ваш электронный адрес, чтобы мы смогли отправить вам письмо для сброса пароля
          </Typography.Text>
          <Form>
            <Form.Item hasFeedback rules={[{ validator: onValidateEmail }]} name={"email"}>
              <Input autoComplete="on" placeholder={"abc@email.com"} className="auth__input" prefix={<img src={login} />} size="large" />
            </Form.Item>
            <Form.Item>
              <Button loading={state.isLoading} htmlType="submit" size="large" type="primary" block>
                SEND
              </Button>
              {/* {state.status === "successful" && (
                <Alert message="На указанный вами адрес отправленно письмо со сбросом пароля" className="mt-1" closable type="info" showIcon />
              )}
              {state.status === "error" && <Alert type="error" showIcon className="error__message" message={state.message} banner closable />} */}
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};
