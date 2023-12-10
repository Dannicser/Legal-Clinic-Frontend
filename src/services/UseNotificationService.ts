import { AxiosError } from "axios";
import axios from "../config/axios";
import { INotificationGetAllResponse, INotificationReadResponse } from "../types/notification";

export const UseNotificationService = () => {
  const onGetAllNotifications = async () => {
    const response = await axios
      .get<INotificationGetAllResponse>("/notification/get-all")
      .then(({ data }) => {
        return data;
      })
      .catch((error: AxiosError<INotificationGetAllResponse>) => {
        return {
          data: [],
          error: error.response?.data.error || null,
          status: error.response?.data.status || 500,
          message: error.response?.data.message || "",
        };
      });

    return response;
  };

  const onReadNotifications = async () => {
    const response = await axios
      .patch<INotificationReadResponse>("/notification/read")
      .then(({ data }) => {
        return data;
      })
      .catch((error: AxiosError<INotificationReadResponse>) => {
        return {
          data: [],
          error: error.response?.data.error || null,
          status: error.response?.data.status || 500,
          message: error.response?.data.message || "",
        };
      });

    return response;
  };

  return { onGetAllNotifications, onReadNotifications };
};
