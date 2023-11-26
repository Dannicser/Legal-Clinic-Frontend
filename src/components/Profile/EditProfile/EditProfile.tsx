import { Layout } from "../../Layout/Layout";
import { Header } from "../../UI/Header/Header";

import login from "../../Auth/assets/icons/png/login.png";

import { Form, Input, Row, Col, Typography, Button, Tooltip, Popconfirm } from "antd";
import { UserOutlined, BulbOutlined, LockOutlined } from "@ant-design/icons";

import { useAppSelector } from "../../../hooks/useAppSelector";
import { Navigate } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { thunkUpdateUserInfo } from "../../../slices/userSlice";

export const EditProfile: React.FC = () => {
  const isLoading = useAppSelector((state) => state.user.isLoading);
  const user = useAppSelector((state) => state.user.user);

  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const onChangeData = () => {
    if (!onFormErrorValidation() && form.isFieldsTouched()) {
      dispatch(thunkUpdateUserInfo(form.getFieldsValue()));
    }
  };

  const onFormErrorValidation = () => {
    let isError = false;
    form.getFieldsError().map((el) => {
      if (el.errors.length) {
        isError = true;
      }
    });

    return isError;
  };

  if (!user.first_name) {
    return <Navigate to={"/profile"} />;
  }

  return (
    <>
      <Header title="Редактирование" />
      <Layout>
        <Form form={form} initialValues={{ about: user.about, first_name: user.first_name, last_name: user.last_name }} name="basic">
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
          <Form.Item className="mt-1" hasFeedback rules={[{ required: true, min: 2, max: 20, message: "2 - 20 символов" }]} name={"first_name"}>
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
          <Form.Item className="mt-1" hasFeedback rules={[{ required: true, min: 2, max: 20, message: "2 - 20 символов" }]} name={"last_name"}>
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
            <Input size="large" disabled placeholder={user.email} prefix={<img style={{ width: 20 }} src={login} />} />
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
                message: "Не 50 более символов",
              },
            ]}
            name="about"
          >
            <Input size="large" placeholder={user.about.length ? user.about : "Напишите пару слов о себе..."} prefix={<BulbOutlined />} />
          </Form.Item>
          <Row>
            <Col>
              <Tooltip title="Извините, функция по смене электронной почты находится в разработке." color={"green"}>
                <Typography.Text copyable={{ text: user._id, tooltips: false }} strong>
                  Ваш уникальный ID
                </Typography.Text>
              </Tooltip>
            </Col>
          </Row>
          <Form.Item className="mt-1">
            <Input size="large" disabled placeholder={user._id} prefix={<LockOutlined />} />
          </Form.Item>

          <Form.Item>
            <Popconfirm
              title="Вы действительно хотите изменить данные?"
              description="Если вы укажите некорректные данные, мы будем вынуждены отказать вам в обращении."
              okText="Да"
              cancelText="Нет"
              onConfirm={onChangeData}
            >
              <Button htmlType="submit" loading={isLoading} type="primary">
                Сохранить
              </Button>
            </Popconfirm>
          </Form.Item>
        </Form>
      </Layout>
    </>
  );
};
