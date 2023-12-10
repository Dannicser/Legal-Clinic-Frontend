import { useEffect } from "react";

import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { onResetErrors } from "../../../slices/authSlice";

import { Helmet } from "react-helmet";

import { Typography, Input, Button, Form } from "antd";

import { Header } from "../../UI/Header/Header";

import login from "../assets/icons/png/login.png";

import { onValidateEmail } from "../../../utils/validators/auth";

import "./PasswordRecovery.scss";

export const PasswordRecovery: React.FC = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(onResetErrors());
  }, []);

  return (
    <>
      <Helmet>
        <title>Восстановление аккаунта - Юридическая клиника при ЕГУ.им И.А. Бунина</title>
        <meta name="description" content="Восстановление аккаунта в приложении Юридической клиники при ЕГУ им И.А. Бунина" />
        <meta name="keywords" content="юридическая клиника, забыл пароль, восстановить" />
      </Helmet>
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
