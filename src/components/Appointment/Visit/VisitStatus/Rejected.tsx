import { Button, Result } from "antd";
import { useEffect } from "react";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { thunkRemoveAppointment } from "../../../../slices/appointmentSlice";
import { UseLocalStorage } from "../../../../hooks/useLocalStorage";

interface IRejectedProps {
  message?: string;
}

export const Rejected: React.FC<IRejectedProps> = ({ message }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("effect");

    return () => {
      console.log("delete");
      UseLocalStorage({ key: "roadhelp", action: "remove" });
      dispatch(thunkRemoveAppointment());
    };
  }, []);

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
