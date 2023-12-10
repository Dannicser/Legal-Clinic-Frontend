import { useEffect } from "react";

import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { onAddNotification } from "../../../slices/notificationSlice";
import { onChangeStatusAppointment } from "../../../slices/appointmentSlice";
import { UseLocalStorage } from "../../../hooks/useLocalStorage";

import { message } from "antd";

import { onSoundEffect } from "../audio";
import { BACKEND_URL } from "../../../http/vars";

export const Connection: React.FC = () => {
  const dispatch = useAppDispatch();
  const user_id = useAppSelector((state) => state.user.user._id);
  const [messageApi, contextHolder] = message.useMessage({ maxCount: 1 });

  useEffect(() => {
    const eventSource = new EventSource(`${BACKEND_URL}/notification/connect/notification/?user_id=${user_id}`, {
      withCredentials: true,
    });

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const isSound = JSON.parse(UseLocalStorage({ key: "sound", action: "get" }));

      if (data.event === "change-status") {
        dispatch(onChangeStatusAppointment(data));
      }

      if (data.event === "get-notification") {
        dispatch(onAddNotification(data));
        isSound && onSoundEffect();
      }
    };

    eventSource.onerror = (error) => {
      onErrorConnection();
      console.log(error);
    };

    return () => {
      console.log("close connection");
      eventSource.close();
    };
  }, []);

  const onErrorConnection = () => {
    messageApi.open({
      type: "error",
      content: "Ошибка real-time соединения",
      duration: 5,
    });
  };

  return <>{contextHolder}</>;
};
