import { Layout } from "../../Layout/Layout";

import { Avatar, Row, Col, Typography, Divider, Button, Space, Skeleton, Card, Result } from "antd";

import { useEffect } from "react";

import { useAppSelector } from "../../../hooks/useAppSelector";
import { useAppDispatch } from "../../../hooks/useAppDispatch";

import { NavLink } from "react-router-dom";
import { PrivetRoutesNames } from "../../../routers";

import { thunkGetUserInfo } from "../../../slices/userSlice";

import dayjs from "dayjs";

export const Profile = () => {
  const user = useAppSelector((state) => state.user.user);
  const isLoading = useAppSelector((state) => state.user.isLoading);
  const isError = useAppSelector((state) => state.user.isError);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user._id) {
      dispatch(thunkGetUserInfo());
    }
  }, []);

  const loader = !isError && isLoading && <Loader />;

  const content = !isError && !isLoading && (
    <Row>
      <Col span={24}>
        <Divider>
          <Avatar size="large">{user.first_name[0]}</Avatar>
        </Divider>
      </Col>
      <Col span={24}>
        <Typography.Title level={3}>
          {user.first_name} {user.last_name}
        </Typography.Title>
      </Col>
      <Col span={24}>
        <Space>
          <Typography.Text type="secondary">Профиль был создан {dayjs(user.createdAt).format("D MMMM YYYY")} г</Typography.Text>
        </Space>
      </Col>
      <Col span={24}>
        <Divider>
          <Typography.Title level={5}>О себе</Typography.Title>
        </Divider>
        <Card bordered={true}>
          {user.about.length ? (
            <Typography.Text type="secondary" strong>
              {user.about}
            </Typography.Text>
          ) : (
            <Typography.Text type="secondary" strong>
              Напишите пару слов о себе...
            </Typography.Text>
          )}
        </Card>
      </Col>
      <Divider />
      <Col span={24}>
        <NavLink to={PrivetRoutesNames.EDIT}>
          <Button size={"middle"} type="primary">
            Изменить
          </Button>
        </NavLink>
      </Col>
    </Row>
  );

  return (
    <>
      <Layout>
        {content}
        {loader}
        {isError && <Result status="500" title="500" subTitle="Что-то пошло нет так..." />}
      </Layout>
    </>
  );
};

const Loader: React.FC = () => {
  return (
    <>
      <br />

      <Space>
        <Skeleton.Input active size={"small"} />
        <Skeleton.Avatar active size={"default"} shape={"circle"} />
        <Skeleton.Input active size={"small"} />
      </Space>
      <Divider />

      <Skeleton active />
    </>
  );
};
