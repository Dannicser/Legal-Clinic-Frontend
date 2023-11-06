import { Layout } from "../../Layout/Layout";
import { Header } from "../../UI/Header/Header";

import login from "../../Auth/assets/icons/login.svg";

import { Form, Input, Row, Col, Typography, Button, Tooltip } from "antd";
import { UserOutlined, BulbOutlined } from "@ant-design/icons";

import { IEditProfileState } from "../../../types/user";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { Navigate } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { thunkUpdateUserInfo } from "../../../slices/userSlice";

export const EditProfile: React.FC = () => {
  const { user, loading } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const onFinish = (values: IEditProfileState) => {
    console.log(values);
    dispatch(thunkUpdateUserInfo(values));
  };

  if (!user.first_name) {
    return <Navigate to={"/profile"} />;
  }

  return (
    <>
      <Header title="Редактирование" />
      <Layout>
        <Form
          onFinish={onFinish}
          initialValues={{ about: user.about, first_name: user.first_name, last_name: user.last_name }}
          name="basic"
          className="visit__form"
        >
          <Row>
            <Col>
              <Tooltip
                title="Необходимо указать ваше настоящее ФИО, в противном случае, мы будем вынуждены отказать вам в оказании услуг"
                color={"red"}
              >
                <Typography.Text strong>Ваше имя</Typography.Text>{" "}
              </Tooltip>
            </Col>
          </Row>
          <Form.Item className="mt-1" hasFeedback rules={[{ max: 20, message: "Не более 20 символов" }]} name={"first_name"}>
            <Input size="large" value={user.first_name} prefix={<UserOutlined />} />
          </Form.Item>
          <Row>
            <Col>
              <Tooltip
                title="Необходимо указать ваше настоящее ФИО, в противном случае, мы будем вынуждены отказать вам в оказании услуг"
                color={"red"}
              >
                <Typography.Text strong>Ваше отчество</Typography.Text>{" "}
              </Tooltip>
            </Col>
          </Row>
          <Form.Item className="mt-1" hasFeedback rules={[{ max: 20, message: "Не более 20 символов" }]} name={"last_name"}>
            <Input size="large" value={user.last_name} prefix={<UserOutlined />} />
          </Form.Item>
          <Row>
            <Col>
              <Tooltip title="Извините, функция по смене электронной почты находится в разработке." color={"green"}>
                <Typography.Text strong>Ваша электронная почта</Typography.Text>
              </Tooltip>
            </Col>
          </Row>
          <Form.Item className="mt-1">
            <Input size="large" disabled placeholder={user.email} prefix={<img src={login} />} />
          </Form.Item>
          <Row>
            <Col>
              <Tooltip title="Напишите пару слов о себе." color={"green"}>
                <Typography.Text strong>О вас</Typography.Text>{" "}
              </Tooltip>
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
            <Button htmlType="submit" loading={loading} type="primary">
              Сохранить
            </Button>
          </Form.Item>
        </Form>
      </Layout>
    </>
  );
};
