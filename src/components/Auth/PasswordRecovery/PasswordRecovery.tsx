import { useEffect } from "react";
import { Alert, Typography, Input, Button, Form } from "antd";
import { Header } from "../../UI/Header/Header";
import login from "../assets/icons/png/login.png";
import { onValidateEmail } from "../../../utils/validators/auth";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { onResetErrors } from "../../../slices/authSlice";

import "./PasswordRecovery.scss";
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
              <Input
                autoComplete="on"
                placeholder={"abc@email.com"}
                className="auth__input"
                prefix={<img style={{ width: 30 }} src={login} />}
                size="large"
              />
            </Form.Item>
            <Form.Item>
              <Button loading={state.isLoading} htmlType="submit" size="large" type="primary" block>
                Отправить
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};
