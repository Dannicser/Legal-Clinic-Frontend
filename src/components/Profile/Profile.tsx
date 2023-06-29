import { Layout } from "../Layout/Layout";
import { Header } from "../UI/Header/Header";
import { Avatar, Row, Col, Typography, Divider, Button, Input, Space } from "antd";
import "./Profile.scss";
import { useState } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";

const { TextArea } = Input;

export const Profile = () => {
  const { name, created } = useAppSelector((state) => state.user);

  const [disabled, setDisabled] = useState(true);
  const [value, setValue] = useState({
    name: name,
    about: "Напишите пару слов о себе",
  });

  const onChangeDisabled = () => {
    setDisabled(!disabled);
    onChangeText();
  };

  const onChangeValue = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };

  const onChangeText = () => {
    if (disabled) {
      setValue({ ...value, about: value.about.length ? "" : "Напишите пару слов о себе" });
    } else {
      setValue({ ...value });
    }
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
              <Avatar size="large">{name[0]}</Avatar>
            </Divider>
          </Col>
          <Col span={24}>{content}</Col>
          <Col span={24}>
            <Typography.Text type={"secondary"}>
              Профиль был создан <Typography.Text strong>{created}</Typography.Text>
            </Typography.Text>
          </Col>
          <Col span={24}>
            <Divider>О себе</Divider>
            <TextArea name="about" onChange={(e) => onChangeValue(e)} disabled={disabled} autoSize rows={4} value={value.about} bordered={false} />
          </Col>
          <Divider />
          <Col span={24}>
            <Button onClick={onChangeDisabled} size="large" type="primary">
              {disabled ? "Редактировать" : "Сохранить"}
            </Button>
          </Col>
        </Row>
      </Layout>
    </>
  );
};
