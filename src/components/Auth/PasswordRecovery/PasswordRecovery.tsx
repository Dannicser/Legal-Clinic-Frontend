import { useEffect, useState } from "react";

import { useAppDispatch } from "../../../hooks/useAppDispatch";

import { onResetErrors } from "../../../slices/authSlice";
import { NavLink } from "react-router-dom";

import defaultAxios, { Axios, AxiosError } from "axios";

import { Helmet } from "react-helmet";

import { Typography, Input, Button, Form, Alert, Result, Row } from "antd";

import { Header } from "../../UI/Header/Header";

import login from "../assets/icons/png/login.png";

import { PublicRoutesNames } from "../../../routers";

import "./PasswordRecovery.scss";
import { BACKEND_URL } from "../../../http/vars";

interface IValues {
  email: string;
}

interface IRecoveryResponse {
  message: string;
  error: null;
  status: number;
  data: null;
}

export const PasswordRecovery: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [isRedirect, setIsRedirect] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(onResetErrors());
  }, []);

  const onResetPassword = async (values: IValues) => {
    try {
      setIsLoading(true);

      const response = await defaultAxios.post<IRecoveryResponse>(`${BACKEND_URL}/auth/reset-password`, { email: values.email });

      setIsRedirect(true);
    } catch (error) {
      if (defaultAxios.isAxiosError(error)) {
        setErrorMessage(error.response?.data.message);
      }

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
            <Form.Item
              hasFeedback
              rules={[
                { type: "email", message: "Некорректный формат email" },
                { required: true, message: "Поле обязательно" },
              ]}
              name={"email"}
            >
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
            <Alert type="error" showIcon className="mt-1 error__message" message={errorMessage || "Непредвиденная ошибка"} banner closable />
          )}
        </div>
      </div>
    </>
  );
};
