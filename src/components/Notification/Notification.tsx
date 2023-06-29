import { notification } from "antd";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useEffect } from "react";
import { NotificationType } from "../../types/notification";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { onHideNotice } from "../../slices/notificationSlice";

export const Notification: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();

  const state = useAppSelector((state) => state.notification);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (state.status === "show") {
      openNotificationWithIcon(state.type);
      dispatch(onHideNotice());
    }
  }, [state.status]);

  const openNotificationWithIcon = (type: NotificationType) => {
    api[type]({
      message: state.message,
      description: state.description,
      duration: state.duration,
      placement: state.placement,
    });
  };

  return <>{contextHolder}</>;
};
