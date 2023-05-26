import axios from "axios";
import { IAuth, IRecover, IRegister } from "../types/auth";
import { UseLocalStorage } from "../hooks/useLocalStorage";
import { app } from "../config/firebase";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

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

  const onGetAuthWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);

    const response = await signInWithPopup(auth, provider)
      .then((data) => {
        if (data.user) {
          return {
            name: data.user.displayName,
            id: data.user.uid,
          };
        }
      })
      .then((data) => {
        UseLocalStorage({ key: "userId", data: data?.id, action: "set" });
        return data;
      })
      .catch((error) => {
        if (error) throw new Error();
      });

    return response;
  };

  const onGetRegisterWithEmail = async (user: IRegister) => {
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

  const onGetRecoveryWithEmail = async (email: IRecover) => {
    const response = await axios
      .post(`${BASE}sendOobCode?key=${API_KEY}`, { ...email, requestType: "PASSWORD_RESET" })
      .then((data) => data.data)
      .catch((error) => {
        if (error.response) throw new Error(JSON.stringify(error.response.data.error));
        throw new Error(JSON.stringify({ message: "TRY_LATER" }));
      });

    return response;
  };

  return { onGetAuthWithEmail, onGetRegisterWithEmail, onGetRecoveryWithEmail, onGetAuthWithGoogle };
};
