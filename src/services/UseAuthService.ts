import axios from "../config/axios";
import defaultAxios from "axios";

import { UseLocalStorage } from "../hooks/useLocalStorage";
import {
  IAuthValues,
  IRegisterValues,
  IResponseCheckAuth,
  IResponseAuthWithEmail,
  IResponseLogoutAuth,
  IResponseRegisterWithEmail,
} from "../types/auth";

export const UseAuthService = () => {
  const onGetAuthWithEmail = async (user: IAuthValues) => {
    const response = await axios.post<IResponseAuthWithEmail>("/auth/login/email", user);

    if (response.data) {
      user.remember
        ? UseLocalStorage({ key: "accessToken", data: response.data.tokens.accessToken, action: "set" })
        : window.sessionStorage.setItem("accessToken", response.data.tokens.accessToken);
    }

    return response.data;
  };

  const onGetRegisterWithEmail = async (user: IRegisterValues) => {
    const response = await axios.post<IResponseRegisterWithEmail>("/auth/register/email", user);

    if (response.data) {
      UseLocalStorage({ key: "accessToken", data: response.data.tokens.accessToken, action: "set" });
    }

    return response.data;
  };

  const onLogoutWithEmail = async () => {
    const response = await axios.post<IResponseLogoutAuth>("/auth/logout/email");

    return response.data;
  };

  const onCheckAuth = async () => {
    const response = await defaultAxios.get<IResponseCheckAuth>("http://localhost:5000/api/auth/refresh/email", { withCredentials: true });

    return response.data;
  };

  return { onGetAuthWithEmail, onGetRegisterWithEmail, onLogoutWithEmail, onCheckAuth };
};
