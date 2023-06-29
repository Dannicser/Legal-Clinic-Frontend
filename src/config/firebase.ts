import { initializeApp } from "firebase/app";

export const firebaseConfig = {
  apiKey: "AIzaSyCb5njo3VC4pcqX_aCrgTHvtmsD7NYA91s",
  authDomain: "legal-clinic-5c164.firebaseapp.com",
  projectId: "legal-clinic-5c164",
  storageBucket: "legal-clinic-5c164.appspot.com",
  messagingSenderId: "796025684430",
  appId: "1:796025684430:web:ac9e7b141f40a769b4eb9f",
  base: "https://identitytoolkit.googleapis.com/v1/accounts:",
};

export const app = initializeApp(firebaseConfig);
