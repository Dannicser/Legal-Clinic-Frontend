import { NavLink, Navigate, useParams } from "react-router-dom";
import { Layout } from "../../Layout/Layout";
import { Header } from "../../UI/Header/Header";
import { useEffect, useState } from "react";

import axios from "../../../config/axios";
import { onValidatePassword } from "../../../utils/validators/auth";
import { Alert, Button, Col, Divider, Form, Input, Result, Row, Skeleton, Typography } from "antd";

import password from "../assets/icons/png/password.png";
import { PublicRoutesNames } from "../../../routers";
import { Spinner } from "../../UI/Spinner/Spinner";

interface IValues {
  password: string;
  confirm: string;
}

interface IResponseConfirm {
  message: string;
}

export const ResetPassword: React.FC = () => {
  const [isLoadingHash, setIsLoadingHash] = useState<boolean>(false);
  const [isLoadingPassword, setIsLoadingPassword] = useState<boolean>(false);
  const [isErrorHash, setIsErrorHash] = useState<boolean>(false);
  const [isErrorPassword, setIsErrorPassword] = useState<boolean>(false);
  const [isRedirect, setIsRedirect] = useState<boolean>(false);

  const { id } = useParams();

  useEffect(() => {
    onConfirmHash();
  }, []);

  const onConfirmHash = async () => {
    try {
      setIsLoadingHash(true);
      const response = await axios.post<IResponseConfirm>("/auth/confirm-hash", { hash: id });
    } catch (error) {
      setIsErrorHash(true);
      console.log(error);
    } finally {
      setIsLoadingHash(false);
    }
  };

  const onChangePassword = async (values: IValues) => {
    try {
      setIsLoadingPassword(true);
      setIsErrorPassword(false);

      const response = await axios.post<IResponseConfirm>("/auth/change-password", { password: values.password, hash: id });

      setIsRedirect(true);
    } catch (error) {
      setIsErrorPassword(true);
      console.log(error);
    } finally {
      setIsLoadingPassword(false);
    }
  };

  if (isLoadingHash) {
    return <Spinner />;
  }

  if (isRedirect) {
    return (
      <Row align={"middle"} style={{ height: "100%" }}>
        <Result
          status="success"
          title="Вы успешно изменили пароль."
          extra={[
            <NavLink to={PublicRoutesNames.AUTH}>
              <Button type="primary" key="console">
                Войти
              </Button>
            </NavLink>,
          ]}
        />
      </Row>
    );
  }

  if (isErrorHash) {
    return <Navigate to={PublicRoutesNames.RECOVERY} />;
  }

  return (
    <>
      <Header title="Смена пароля" />
      <Layout>
        <Form onFinish={onChangePassword}>
          <Form.Item hasFeedback rules={[{ validator: onValidatePassword }]} name={"password"}>
            <Input.Password
              autoComplete="off"
              placeholder={"Новый пароль"}
              className="auth__input"
              prefix={<img style={{ width: 32 }} src={password} />}
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
              placeholder={"Повторите новый пароль"}
              className="auth__input"
              prefix={<img style={{ width: 32 }} src={password} />}
              size="large"
            />
          </Form.Item>
          <Col span={24}>
            <Form.Item>
              <Button loading={isLoadingPassword} htmlType="submit" size="large" type="primary" block>
                Сменить пароль
              </Button>
              {isErrorPassword && (
                <Alert
                  type="error"
                  showIcon
                  className="mt-1 error__message"
                  message={"Произошла ошибка, возможно время для смены пароля истекло"}
                  banner
                  closable
                />
              )}
            </Form.Item>
          </Col>
        </Form>
      </Layout>
    </>
  );
};
