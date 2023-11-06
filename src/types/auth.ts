export interface IAuthValues {
  email: string;
  password: string;
  remember: boolean;
}
export interface IRegisterValues {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface IUserResponseRegisterWithEmail {
  email: string;
  first_name: string;
  last_name: string;
  about: string;
  photo: string;
  _id: string;
  is_admin: boolean;
  is_appointment: boolean;
  createdAt: string;
}

interface ITokensResponseRegisterWithEmail {
  accessToken: string;
  refreshToken: string;
}

export interface IResponseRegisterWithEmail {
  tokens: ITokensResponseRegisterWithEmail;
  user: IUserResponseRegisterWithEmail;
}

export interface IResponseAuthWithEmail extends IResponseRegisterWithEmail {}

export interface IResponseCheckAuth extends IResponseRegisterWithEmail {}

export interface IResponseLogoutAuth {
  message: string;
}
