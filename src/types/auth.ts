export interface IAuth {
  email: string;
  password: string;
  remember: boolean;
}
export interface IRegister {
  name: string;
  email: string;
  password: string;
}

export interface IRegisterError {
  code: number;
  message: string;
  errors?: any;
}

export interface IRecover {
  email: string;
}

export interface IResponseWithEmail {
  email: string;
  expiresIn: string;
  idToken: string;
  kind: string;
  localId: string;
  refreshToken: string;
}
