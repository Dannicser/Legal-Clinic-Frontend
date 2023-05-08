import Form from "antd/es/form/Form";

interface IProps {
  children: React.ReactNode;
  callback: (obj: any) => void;
}

export const FormUI: React.FC<IProps> = ({ children, callback }) => {
  const onFinish = (values: any) => {
    callback(values);
  };
  return (
    <Form autoComplete="on" name="basic" onFinish={onFinish}>
      {children}
    </Form>
  );
};
