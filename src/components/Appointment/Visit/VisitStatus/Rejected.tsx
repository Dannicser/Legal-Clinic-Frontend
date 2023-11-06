import { Button, Result } from "antd";

interface IRejectedProps {
  message: string;
}

export const Rejected: React.FC<IRejectedProps> = ({ message }) => {
  return (
    <Result
      status="error"
      title={"В оказании услуги было отказано"}
      subTitle={`Причина отказа: ${message}`}
      extra={[
        <Button type="primary" danger key="console">
          Попробовать снова
        </Button>,
      ]}
    />
  );
};
