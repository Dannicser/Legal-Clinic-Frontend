import { Layout } from "../Layout/Layout";
import { Header } from "../UI/Header/Header";
import { Avatar, Row, Col, Typography, Divider, Button, Input, Space } from "antd";
import "./Profile.scss";
import { useState } from "react";

const { TextArea } = Input;
const about =
  "Enjoy your favorite dishe and a lovely your friends and family and have a great time. Food from local food trucks will be available for purchase";

export const Profile = () => {
  const [disabled, setDisabled] = useState(true);
  const [value, setValue] = useState({
    name: "Даниил Дмитриев",
    about,
  });

  const onChangeDisabled = () => {
    setDisabled(!disabled);
  };

  const onChangeValue = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };

  const content = disabled ? (
    <Typography.Title level={4}>{value.name}</Typography.Title>
  ) : (
    <Space>
      <TextArea name="name" onChange={(e) => onChangeValue(e)} size="large" bordered={false} value={value.name} maxLength={30} />
    </Space>
  );

  return (
    <>
      <Header title="Профиль" />
      <Layout>
        <Row>
          <Col span={24}>
            <Divider>
              <Avatar size="large">{"Д"}</Avatar>
            </Divider>
          </Col>
          <Col span={24}>{content}</Col>
          <Col span={24}>
            <Typography.Text type={"secondary"}>
              Профиль был создан <Typography.Text strong>20.05.2023</Typography.Text>
            </Typography.Text>
          </Col>
          <Col span={24}>
            <Divider>О себе</Divider>
            <TextArea name="about" onChange={(e) => onChangeValue(e)} disabled={disabled} autoSize rows={4} value={value.about} bordered={false} />
          </Col>
          <Divider />
          <Col span={24}>
            <Button onClick={onChangeDisabled} type="primary">
              {disabled ? "Редактировать" : "Сохранить"}
            </Button>
          </Col>
        </Row>
      </Layout>
    </>
  );
};
