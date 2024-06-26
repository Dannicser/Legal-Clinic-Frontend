import { Layout } from "../Layout/Layout";
import { Col, QRCode, Result, Row, Typography } from "antd";

import { FRONTEND_URL } from "../../http/vars";

export const NotSupport: React.FC = () => {
  return (
    <Layout>
      <Result
        icon={
          <Row justify={"center"}>
            <Col>
              <QRCode value={FRONTEND_URL} />
            </Col>
          </Row>
        }
        title={
          <Row justify={"center"}>
            <Col span={12}>
              <Typography.Title type="warning" level={5}>
                К сожалению, наше приложение доступно только на мобильных устройствах :(
              </Typography.Title>{" "}
            </Col>
          </Row>
        }
        extra={
          <Row justify={"center"}>
            <Col span={7}>
              <Typography.Text strong>Наведите камеру вашего телефона на QR код, чтобы открыть приложение на смартфоне!</Typography.Text>
            </Col>
          </Row>
        }
      />
    </Layout>
  );
};
