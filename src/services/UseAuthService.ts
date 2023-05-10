import axios from "axios";
import { IAuth, IRecover, IRegister } from "../types/auth";
import { UseLocalStorage } from "../hooks/useLocalStorage";

const API_KEY = "AIzaSyCb5njo3VC4pcqX_aCrgTHvtmsD7NYA91s";
const BASE = "https://identitytoolkit.googleapis.com/v1/accounts:";

export const UseAuthService = () => {
  const onGetAuthWithEmail = async (user: IAuth) => {
    const response = await axios
      .post(`${BASE}signInWithPassword?key=${API_KEY}`, { ...user, returnSecureToken: true })
      .then((data) => data.data)
      .then(({ idToken }) => user.remember && UseLocalStorage({ key: "userId", data: idToken, action: "set" }))
      .catch((error) => {
        if (error.response) throw new Error(JSON.stringify(error.response.data.error));
        throw new Error(JSON.stringify({ message: "TRY_LATER" }));
      });

    return response;
  };

  const onGetRegister = async (user: IRegister) => {
    const response = await axios
      .post(`${BASE}signUp?key=${API_KEY}`, { ...user, returnSecureToken: true })
      .then((data) => data.data)
      .then(({ idToken }) => UseLocalStorage({ key: "userId", data: idToken, action: "set" }))
      .catch((error) => {
        if (error.response) throw new Error(JSON.stringify(error.response.data.error));
        throw new Error(JSON.stringify({ message: "TRY_LATER" }));
      });

    return response;
  };

  const onGetRecovery = async (email: IRecover) => {
    const response = await axios
      .post(`${BASE}sendOobCode?key=${API_KEY}`, { ...email, requestType: "PASSWORD_RESET" })
      .then((data) => data.data)
      .catch((error) => {
        if (error.response) throw new Error(JSON.stringify(error.response.data.error));
        throw new Error(JSON.stringify({ message: "TRY_LATER" }));
      });

    return response;
  };

  return { onGetAuthWithEmail, onGetRegister, onGetRecovery };
};
