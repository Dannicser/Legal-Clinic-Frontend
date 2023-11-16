import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../../hooks/useAppSelector";
import { thunkRemoveAppointment } from "../../../../slices/appointmentSlice";
import { UseLocalStorage } from "../../../../hooks/useLocalStorage";

import axios from "../../../../config/axios";

import { Button, Result, Alert, Divider } from "antd";

interface IRejectedProps {
  message?: string;
}

export const Rejected: React.FC<IRejectedProps> = ({ message }) => {
  const problem = useAppSelector((state) => state.appointment.data.problem);
  const type = useAppSelector((state) => state.appointment.data.type);
  const date = useAppSelector((state) => state.appointment.data.date);
  const isError = useAppSelector((state) => state.appointment.isError);

  const [isErrorHistory, setIsErrorHistory] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const onAddAppointmentHistory = async () => {
    await axios.post("./appointment/history", { review: " ", rate: 0, problem, type, date, rejected: true });
  };

  const onFinish = async () => {
    try {
      UseLocalStorage({ key: "roadhelp", action: "remove" });
      await onAddAppointmentHistory();
      console.log("delete");
      dispatch(thunkRemoveAppointment());
    } catch (error) {
      console.log(error);

      setIsErrorHistory(true);
    }
  };

  return (
    <Result
      status="error"
      title={"В оказании услуги было отказано"}
      subTitle={`Причина отказа: ${message}`}
      extra={[
        <Button onClick={onFinish} type="primary" danger key="console">
          Попробовать снова
        </Button>,

        isErrorHistory && (
          <>
            <Divider />
            <Alert banner className="alert" type="error" message="Произошла ошибка при добавлении заявления в историю" />
          </>
        ),
      ]}
    />
  );
};
