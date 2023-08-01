import { Layout } from "../../Layout/Layout";
import { Header } from "../../UI/Header/Header";

import login from "../../Auth/assets/icons/login.svg";

import { Form, Input, Row, Col, Typography, Button } from "antd";
import { UserOutlined, BulbOutlined } from "@ant-design/icons";
import { onValidateName } from "../../../utils/validators/auth";
import { IEditProfileState } from "../../../types/user";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { Navigate } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { onUpdateUserInfo } from "../../../slices/userSlice";

export const EditProfile: React.FC = () => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const onFinish = (values: IEditProfileState) => {
    console.log(values);
    dispatch(onUpdateUserInfo(values));
  };

  if (!user.name) {
    return <Navigate to={"/profile"} />;
  }

  return (
    <>
      <Header title="Редактирование" />
      <Layout>
        <Form onFinish={onFinish} initialValues={{ about: user.about, name: user.name }} name="basic" className="visit__form">
          <Row>
            <Col>
              <Typography.Text strong>Ваше имя и отчество</Typography.Text>
            </Col>
          </Row>
          <Form.Item className="mt-1" hasFeedback rules={[{ validator: onValidateName }]} name={"name"}>
            <Input size="large" defaultValue={user.name} prefix={<UserOutlined />} />
          </Form.Item>
          <Row>
            <Col>
              <Typography.Text strong>Ваша электронная почта</Typography.Text>
            </Col>
          </Row>
          <Form.Item className="mt-1">
            <Input size="large" disabled placeholder={user.email} prefix={<img src={login} />} />
          </Form.Item>
          <Row>
            <Col>
              <Typography.Text strong>О вас</Typography.Text>
            </Col>
          </Row>
          <Form.Item
            className="mt-1"
            hasFeedback
            rules={[
              {
                max: 50,
                message: "Не более 50 символов",
              },
            ]}
            name="about"
          >
            <Input size="large" placeholder={user.about.length ? user.about : "Напишите пару слов о себе..."} prefix={<BulbOutlined />} />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              Сохранить
            </Button>
          </Form.Item>
        </Form>
      </Layout>
    </>
  );
};
