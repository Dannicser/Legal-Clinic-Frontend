import axios from "axios";
import { UseLocalStorage } from "../hooks/useLocalStorage";
import { IResponseRegisterWithEmail } from "../types/auth";
import { BACKEND_URL } from "../http/vars";

const instanse = axios.create({
  baseURL: `${BACKEND_URL}/api`,
  //отправлять куки автоматически с запросом
  withCredentials: true,
});

instanse.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("accessToken") || window.sessionStorage.getItem("accessToken") || "";

  return config;
});

instanse.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && error.config && !error.config._isRetry) {
      try {
        originalRequest._isRetry = true; //чтобы не зациклить, если опять прилетел 401

        const res = await axios.get<IResponseRegisterWithEmail>(`${BACKEND_URL}/api/auth/refresh/email`, { withCredentials: true });

        UseLocalStorage({ key: "accessToken", data: res.data.tokens.accessToken, action: "set" });

        return instanse.request(originalRequest);
      } catch (error) {
        UseLocalStorage({ key: "accessToken", action: "remove" });

        console.log("Ошибка обновления токена");
      }
    }
    throw error;
  }
);

export default instanse;
