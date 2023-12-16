import { store } from "../store";
import { onShowAlert } from "../slices/alertSlice";

import axios from "axios";

import { UseLocalStorage } from "../hooks/useLocalStorage";

import { IResponseRegisterWithEmail } from "../types/auth";
import { BACKEND_URL } from "../http/vars";

const instanse = axios.create({
  baseURL: `${BACKEND_URL}`,
  //отправлять куки автоматически с запросом
  withCredentials: true,
});

instanse.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${window.localStorage.getItem("accessToken")}` || `Bearer ${window.sessionStorage.getItem("accessToken")}`;

  return config;
});

instanse.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;

    console.log(error);

    if (error.response.status === 401 && error.config && !error.config._isRetry) {
      try {
        originalRequest._isRetry = true; //чтобы не зациклить, если опять прилетел 401

        const res = await axios.get<IResponseRegisterWithEmail>(`${BACKEND_URL}/auth/refresh/email`, { withCredentials: true });

        UseLocalStorage({ key: "accessToken", data: res.data.tokens.accessToken, action: "set" });

        return instanse.request(originalRequest);
      } catch (error) {
        UseLocalStorage({ key: "accessToken", action: "remove" });

        console.log("Ошибка обновления токена");
      }
    }

    if (error.response.status === 429) {
      const { dispatch } = store;

      dispatch(
        onShowAlert({
          status: "show",
          type: "error",
          message: "Заподозрена необычная активность",
          description: "",
          duration: 3,
          placement: "topRight",
        })
      );
    }

    throw Error;
  }
);

export default instanse;
