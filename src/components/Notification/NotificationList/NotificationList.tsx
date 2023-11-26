import { useEffect, useState } from "react";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { onReadNotifications, thunkReadNotifications } from "../../../slices/notificationSlice";

import { Alert, Col, Divider, Empty, Row, Segmented, Typography } from "antd";
import { FieldTimeOutlined } from "@ant-design/icons";
import { Header } from "../../UI/Header/Header";
import { Layout } from "../../Layout/Layout";

import "./NotificationList.scss";

import dayjs from "dayjs";
import relative from "dayjs/plugin/relativeTime";

dayjs.extend(relative);

export const NotificationList = () => {
  const dispatch = useAppDispatch();

  const [isToggle, setIsToggle] = useState<boolean>(false);

  const userNotifications = useAppSelector((state) => state.notification.user);
  const commonNotifications = useAppSelector((state) => state.notification.common);
  const isError = useAppSelector((state) => state.notification.isError);

  useEffect(() => {
    const isRead = userNotifications.filter((el) => !el.is_read);

    if (isRead.length) {
      console.log("read");
      dispatch(thunkReadNotifications());
    }

    return () => {
      dispatch(onReadNotifications());
    };
  }, []);

  const onToggleType = () => {
    setIsToggle(!isToggle);
  };

  const notifications = isToggle ? commonNotifications : userNotifications;

  const content = [...notifications].reverse().map((el) => {
    return el.is_read ? (
      <Alert
        key={el._id}
        showIcon={true}
        className="mt-1 notification_item"
        message={
          <>
            <Row justify={"end"}>
              <Typography.Text strong>{el.title}</Typography.Text>
            </Row>
            <div>{el.message}</div>
            <Row justify={"end"}>
              <Col>
                <div className="time_item">
                  {dayjs(el.createdAt).fromNow(true)} назад <FieldTimeOutlined />
                </div>
              </Col>
            </Row>
          </>
        }
        banner
        type="info"
      />
    ) : (
      <Alert
        key={el.user_id}
        showIcon={true}
        className="mt-1 notification_item"
        message={
          <>
            <Row justify={"end"}>
              <Typography.Text strong>{el.title}</Typography.Text>
            </Row>
            <div className="message_item">{el.message}</div>
            <Row justify={"end"}>
              <Col>
                <div className="time_item">{dayjs(el.createdAt).fromNow(true)} назад</div>
              </Col>
            </Row>
          </>
        }
        banner
        type="success"
      />
    );
  });

  return (
    <>
      <Header title="Уведомления" />
      <Layout internal={{ paddingTop: 60 }} external={{ paddingTop: 0 }}>
        <Segmented onChange={onToggleType} style={{ fontWeight: 500 }} block options={["Пользовательские", "Общие"]} />
        <Divider />
        {!notifications.length ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={"Уведомлений пока нет"} /> : content}
      </Layout>
    </>
  );
};
