export interface IAuth {
  email: string;
  password: string;
  remember: boolean;
}
export interface IRegister {
  name: string;
  email: string;
  password: string;
  created: string;
}

export interface IRegisterError {
  code: number;
  message: string;
  errors?: any;
}

export interface IRecover {
  email: string;
}
