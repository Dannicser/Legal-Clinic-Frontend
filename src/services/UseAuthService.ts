import axios from "../config/axios";
import defaultAxios, { AxiosError } from "axios";

import { UseLocalStorage } from "../hooks/useLocalStorage";

import { url_get_token, client_id, client_secret, url_get_data } from "../config/oauth";

import {
  IAuthValues,
  IRegisterValues,
  IResponseCheckAuth,
  IResponseAuthWithEmail,
  IResponseLogoutAuth,
  IResponseRegisterWithEmail,
  IResponseAuthWithYandexGetToken,
  IResponseAuthWithYandexGetData,
  IGetUserRegisterStatus,
  IGetUserRegisterStatusParams,
  IResponseAuthWithEmailError,
  IResponseRegisterWithEmailError,
} from "../types/auth";
import { BACKEND_URL } from "../http/vars";

export const UseAuthService = () => {
  const onGetAuthWithEmail = async (user: IAuthValues) => {
    const response = await axios
      .post<IResponseAuthWithEmail>("/auth/login/email", user)
      .then(({ data }) => {
        user.remember
          ? UseLocalStorage({ key: "accessToken", data: data.tokens.accessToken, action: "set" })
          : window.sessionStorage.setItem("accessToken", data.tokens.accessToken);

        return data;
      })
      .catch((error: AxiosError<IResponseAuthWithEmailError>) => {
        return {
          message: error.response?.data.message || "Непредвиденная ошибка",
          status: error.response?.data.status || 500,
        };
      });

    return response;
  };

  const onGetRegisterWithEmail = async (user: IRegisterValues) => {
    const response = await axios
      .post<IResponseRegisterWithEmail>("/auth/register/email", user)
      .then(({ data }) => {
        UseLocalStorage({ key: "accessToken", data: data.tokens.accessToken, action: "set" });

        return data;
      })
      .catch((error: AxiosError<IResponseRegisterWithEmailError>) => {
        return { message: error.response?.data.message || "Непредвиденная ошибка", status: error.response?.data.status || 500 };
      });

    return response;
  };

  const onLogoutWithEmail = async () => {
    const response = await axios
      .post<IResponseLogoutAuth>("/auth/logout/email")
      .then((data) => {
        UseLocalStorage({ key: "accessToken", action: "remove" });
        sessionStorage.removeItem("accessToken");

        return data;
      })
      .catch((error: AxiosError<IResponseLogoutAuth>) => {
        return {
          data: null,
          status: error.response?.data.status || 500,
          message: error.response?.data.message || "Непредвиденная ошибка",
        };
      });

    return response;
  };

  const onCheckAuth = async () => {
    const response = await defaultAxios.get<IResponseCheckAuth>(`${BACKEND_URL}/auth/refresh/email`, { withCredentials: true });

    return response.data;
  };

  const onGetTokenWithYandex = async (code: string) => {
    const response = await defaultAxios
      .post<IResponseAuthWithYandexGetToken>(
        url_get_token,
        {
          grant_type: "authorization_code",
          client_id,
          client_secret,
          code,
        },
        {
          headers: {
            "Content-type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then(({ data }) => {
        return {
          access_token: data.access_token,
          error: null,
          error_discription: null,
          message: "",
        };
      })
      .catch((error: AxiosError<IResponseAuthWithYandexGetToken>) => {
        return {
          access_token: null,
          error: error.response?.data.error || "unexpected error",
          error_description: error.response?.data.error_description || "",
          message: "Ошибка получения access токена",
        };
      });

    return response;
  };

  const onGetDataFromYandex = async (access_token: string) => {
    const response = await defaultAxios
      .get<IResponseAuthWithYandexGetData>(url_get_data, {
        headers: { Authorization: `OAuth ${access_token}` },
      })
      .then(({ data }) => {
        return { default_email: data.default_email, first_name: data.first_name, last_name: data.last_name, error: null, psuid: data.psuid };
      })
      .catch((error: AxiosError) => {
        return {
          error: "error",
          message: "Ошибка получения данных из yandex",
          default_email: "",
          first_name: "",
          last_name: "",
        };
      });

    return response;
  };

  const onGetUserRegisterStatus = async (data: IGetUserRegisterStatusParams) => {
    const response = await axios
      .post<IGetUserRegisterStatus>("/auth/register/status", data)
      .then(({ data }) => {
        return data;
      })
      .catch((error: AxiosError) => {
        return {
          error: "error",
          message: "Ошибка получения данных из yandex",
          data: null,
        };
      });

    return response;
  };

  return {
    onGetAuthWithEmail,
    onGetRegisterWithEmail,
    onLogoutWithEmail,
    onCheckAuth,
    onGetTokenWithYandex,
    onGetDataFromYandex,
    onGetUserRegisterStatus,
  };
};
