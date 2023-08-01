import { Layout } from "../../Layout/Layout";
import { Header } from "../../UI/Header/Header";
import { NotFound } from "../../UI/NotFound/NotFound";

import { Avatar, Row, Col, Typography, Divider, Button, Input, Space, Skeleton, Card } from "antd";

import { useEffect } from "react";

import { useAppSelector } from "../../../hooks/useAppSelector";
import { useAppDispatch } from "../../../hooks/useAppDispatch";

import { onGetUserInfo } from "../../../slices/userSlice";
import { onValidateDate } from "../../../utils/validators/date";

import "./Profile.scss";
import { NavLink } from "react-router-dom";
import { PrivetRoutesNames } from "../../../routers";

export const Profile = () => {
  const { loading, error, user } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(onGetUserInfo());
  }, []);

  const loader = !error && loading && <Loader />;

  const content = !error && !loading && (
    <Row>
      <Col span={24}>
        <Divider>
          <Avatar size="large">{user?.name[0]}</Avatar>
        </Divider>
      </Col>
      <Col span={24}>
        <Typography.Title level={2}>{user.name}</Typography.Title>
      </Col>
      <Col span={24}>
        <Typography.Text type={"secondary"}>
          <Space>
            Профиль был создан:
            <Typography.Text strong>{onValidateDate(user.createdAt)}</Typography.Text>
          </Space>
        </Typography.Text>
      </Col>
      <Col span={24}>
        <Divider>О себе</Divider>
        <Card bordered={true}>
          {user.about.length ? (
            <Typography.Text type="secondary" strong>
              {user.about}
            </Typography.Text>
          ) : (
            <Typography.Text type="secondary" strong>
              Напиши пару слов о себе...
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
      <Header title="Профиль" />
      <Layout>
        {content}
        {loader}
        {error && <NotFound title="Ошибка 404" descr="Пользователь не найден, попробуйте обновить страницу" />}
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
