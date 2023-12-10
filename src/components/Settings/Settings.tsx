import { useState, useEffect } from "react";

import { Helmet } from "react-helmet";

import { Layout } from "../Layout/Layout";
import { Header } from "../UI/Header/Header";

import { UseLocalStorage } from "../../hooks/useLocalStorage";

import { Col, Divider, Row, Switch, Typography } from "antd";

export const Settings: React.FC = () => {
  const [isSound, setIsSound] = useState<boolean>(false);

  useEffect(() => {
    if (JSON.parse(UseLocalStorage({ key: "sound", action: "get" }))) {
      setIsSound(true);
    }
  }, []);

  const onChangeSound = (value: boolean) => {
    if (value) {
      setIsSound(true);
      UseLocalStorage({ key: "sound", data: "true", action: "set" });
    } else {
      UseLocalStorage({ key: "sound", data: "false", action: "set" });
      setIsSound(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Настройки - Юридическая клиника при ЕГУ.им И.А. Бунина</title>
        <meta name="description" content="Здесь вы можете посмотреть настройки приложения Юридической клиники и изменить их при необходимости" />
        <meta name="keywords" content="настройки, звук, уведомления" />
      </Helmet>
      <Header title="Настройки" />
      <Layout internal={{ paddingTop: 45, paddingLeft: 30, paddingRight: 30 }}>
        <Divider />
        <Row align={"middle"} justify={"space-between"}>
          <Col>
            <Typography.Text strong>Звук уведомлений</Typography.Text>
          </Col>
          <Col>
            <Divider type="vertical" />
            <Switch checked={isSound} onChange={onChangeSound} />
          </Col>
        </Row>
        <Divider />
      </Layout>
    </>
  );
};
