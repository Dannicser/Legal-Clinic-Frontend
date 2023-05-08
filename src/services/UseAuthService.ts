import axios from "axios";
import { IAuth } from "../types/auth";

const API_KEY = "AIzaSyCb5njo3VC4pcqX_aCrgTHvtmsD7NYA91s";
const BASE = "https://identitytoolkit.googleapis.com/v1/accounts:";
const WAY = "signInWithPassword";

export const UseAuthService = () => {
  const onGetAuthWithEmail = async (data: IAuth) => {
    const response = await axios.post(`${BASE}${WAY}?key=${API_KEY}`, { ...data, returnSecureToken: true });
    return response.data;
  };

  return { onGetAuthWithEmail };
};
