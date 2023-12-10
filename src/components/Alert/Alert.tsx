import { useEffect } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { onHideAlert } from "../../slices/alertSlice";

import { notification } from "antd";

import { NotificationType } from "../../types/alert";

export const Alert: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();

  const state = useAppSelector((state) => state.alert);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (state.status === "show") {
      openNotificationWithIcon(state.type);
      dispatch(onHideAlert());
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
