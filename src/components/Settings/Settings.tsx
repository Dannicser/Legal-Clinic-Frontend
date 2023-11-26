import { Col, Divider, Row, Space, Switch, SwitchProps, Typography } from "antd";
import { Layout } from "../Layout/Layout";
import { Header } from "../UI/Header/Header";
import { UseLocalStorage } from "../../hooks/useLocalStorage";

import { useState, useEffect } from "react";

export const Settings = () => {
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
