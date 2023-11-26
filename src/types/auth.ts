export interface IAuthValues {
  email: string;
  password: string;
  remember?: boolean;
}
export interface IRegisterValues {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  is_yandex?: boolean;
}

export interface IUserResponseRegisterWithEmail {
  email: string;
  first_name: string;
  last_name: string;
  about: string;
  photo: string;
  _id: string;
  is_admin: boolean;
  createdAt: string;
}

interface ITokensResponseRegisterWithEmail {
  accessToken: string;
  refreshToken: string;
}

export interface IResponseRegisterWithEmail {
  tokens: ITokensResponseRegisterWithEmail;
  user: IUserResponseRegisterWithEmail;
  status: number;
  message: string;
}

export interface IResponseRegisterWithEmailError {
  error: string | null;
  message: string;
  status: number;
}

export interface IResponseAuthWithEmail extends IResponseRegisterWithEmail {}
export interface IResponseAuthWithEmailError {
  error: string | null;
  message: string;
  status: number;
}

export interface IResponseCheckAuth extends IResponseRegisterWithEmail {}

export interface IResponseLogoutAuth {
  message: string;
  status: number;
  data: null;
}

export interface IResponseAuthWithYandexGetToken {
  access_token: string | null;
  error: string | null;
  error_description: string | null;
  message: string;
}

export interface IResponseAuthWithYandexGetData {
  first_name: string;
  last_name: string;
  default_email: string;
  error?: string | null;
  message: string;
  psuid: string;
  status: boolean;
}

export interface IPreAuthWithYandex {
  email: string;
  first_name: string;
  last_name: string;
}

//

export interface IGetUserRegisterStatus {
  data: null | boolean;
  message: string;
  error: string | null;
  status: number;
}

export interface IGetUserRegisterStatusParams {
  email: string;
}
