import { useEffect } from "react";

import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { onAddNotification } from "../../../slices/notificationSlice";
import { onSoundEffect } from "../audio";
import { onChangeStatusAppointment } from "../../../slices/appointmentSlice";
import { UseLocalStorage } from "../../../hooks/useLocalStorage";
import { BACKEND_URL } from "../../../http/vars";

export const Connection = () => {
  const dispatch = useAppDispatch();
  const user_id = useAppSelector((state) => state.user.user._id);

  console.log("connect");

  useEffect(() => {
    const eventSource = new EventSource(`${BACKEND_URL}/api/notification/connect/notification/?user_id=${user_id}`, {
      withCredentials: true,
    });

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const isSound = JSON.parse(UseLocalStorage({ key: "sound", action: "get" }));
      console.log(data);

      if (data.event === "change-status") {
        dispatch(onChangeStatusAppointment(data));
      }

      if (data.event === "get-notification") {
        dispatch(onAddNotification(data));
        console.log(isSound);
        isSound && onSoundEffect();
      }
    };
    eventSource.onerror = (error) => {
      console.log(error);
    };

    return () => {
      console.log("close connection");
      eventSource.close();
    };
  }, []);
  return <></>;
};
