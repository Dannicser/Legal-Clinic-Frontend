import axios from "../config/axios";
import { IAuth, IRecover, IRegister } from "../types/auth";
import { UseLocalStorage } from "../hooks/useLocalStorage";
import { app } from "../config/firebase";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { firebaseConfig } from "../config/firebase";
import { IUserAuthParams } from "../types/auth";

//
const { apiKey, base } = firebaseConfig;
const API_KEY = apiKey;
const BASE = base;

export const UseAuthService = () => {
  const onGetAuthWithEmail = async (user: IAuth) => {
    const response = await axios
      .post(`${BASE}signInWithPassword?key=${API_KEY}`, { ...user, returnSecureToken: true })
      .then((data) => data.data)
      .then(({ localId }) => user.remember && UseLocalStorage({ key: "token", data: localId, action: "set" }))
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
          UseLocalStorage({ key: "token", data: data.user.uid, action: "set" });
          return {
            name: data.user.displayName,
            email: data.user.email,
            photo: data.user.photoURL,
            userId: data.user.uid,
          };
        }
      })
      .catch((error) => {
        if (error) throw new Error();
      });

    return response;
  };

  const onGetRegisterWithEmail = async (user: IRegister) => {
    const response = await axios
      .post(`${BASE}signUp?key=${API_KEY}`, { ...user, returnSecureToken: true })
      .then(({ data }) => {
        if (data) UseLocalStorage({ key: "token", data: data?.localId, action: "set" });
        return data;
      })
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

  const onAddUserToDataBase = async (user: IUserAuthParams) => {
    const response = await axios.post("/user/add-user", user).then(({ data }) => {
      return data;
    });

    return response;
  };

  const onCheckAuth = async () => {
    const response = await axios.get("/user/check-access").then(({ data }) => data);
    return response;
  };

  return { onGetAuthWithEmail, onGetRegisterWithEmail, onGetRecoveryWithEmail, onGetAuthWithGoogle, onAddUserToDataBase, onCheckAuth };
};
