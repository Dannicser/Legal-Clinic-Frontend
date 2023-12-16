import { Row, Spin } from "antd";

export const Spinner: React.FC = () => {
  return (
    <Row style={{ height: "100%" }} justify={"center"} align={"middle"}>
      <Spin size="large" />
    </Row>
  );
};
