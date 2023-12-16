import { useEffect, useState } from "react";

import { useAppDispatch } from "../../../hooks/useAppDispatch";

import { onResetErrors } from "../../../slices/authSlice";
import { NavLink } from "react-router-dom";

import axios from "../../../config/axios";

import { Helmet } from "react-helmet";

import { Typography, Input, Button, Form, Alert, Result, Row } from "antd";

import { Header } from "../../UI/Header/Header";

import login from "../assets/icons/png/login.png";

import { PublicRoutesNames } from "../../../routers";

import "./PasswordRecovery.scss";
interface IValues {
  email: string;
}

export const PasswordRecovery: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isRedirect, setIsRedirect] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(onResetErrors());
  }, []);

  const onResetPassword = async (values: IValues) => {
    try {
      setIsLoading(true);
      const response = await axios.post("/auth/reset-password", { email: values.email });

      setIsRedirect(true);
    } catch (error: unknown) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (isRedirect) {
    const email = form.getFieldValue("email");

    return (
      <Row align={"middle"} style={{ height: "100%" }}>
        <Result
          status="success"
          title="Письмо было успешно отправлено."
          subTitle={`Перейдите по ссылке, отправленной нами, на адрес ${email}`}
          extra={[
            <NavLink to={PublicRoutesNames.AUTH}>
              <Button type="primary">На главную</Button>
            </NavLink>,
          ]}
        />
      </Row>
    );
  }

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
          <Form form={form} onFinish={onResetPassword}>
            <Form.Item hasFeedback rules={[{ type: "email", message: "Некорректный формат email" }]} name={"email"}>
              <Input
                autoComplete="on"
                placeholder={"abc@email.com"}
                className="auth__input"
                prefix={<img style={{ width: 30 }} src={login} />}
                size="large"
              />
            </Form.Item>
            <Form.Item>
              <Button loading={isLoading} htmlType="submit" size="large" type="primary" block>
                Отправить
              </Button>
            </Form.Item>
          </Form>
          {isError && (
            <Alert
              type="error"
              showIcon
              className="mt-1 error__message"
              message={"Произошла ошибка, возможно пользователя с таким email нет."}
              banner
              closable
            />
          )}
        </div>
      </div>
    </>
  );
};
