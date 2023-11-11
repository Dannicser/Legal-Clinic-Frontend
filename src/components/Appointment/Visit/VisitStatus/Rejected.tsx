import { Button, Result } from "antd";
import { useEffect } from "react";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { thunkRemoveAppointment } from "../../../../slices/appointmentSlice";
import { UseLocalStorage } from "../../../../hooks/useLocalStorage";
import { useAppSelector } from "../../../../hooks/useAppSelector";

import axios from "../../../../config/axios";

interface IRejectedProps {
  message?: string;
}

export const Rejected: React.FC<IRejectedProps> = ({ message }) => {
  const { problem, type, date } = useAppSelector((state) => state.appointment.data);

  const dispatch = useAppDispatch();

  const onAddAppointmentHistory = async () => {
    await axios.post("./appointment/history", { review: " ", rate: 0, problem, type, date, rejected: true, message });
  };

  useEffect(() => {
    console.log("effect");

    return () => {
      console.log("delete");
      UseLocalStorage({ key: "roadhelp", action: "remove" });
      onAddAppointmentHistory();
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
