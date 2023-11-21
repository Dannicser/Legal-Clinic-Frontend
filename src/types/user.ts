export interface IUserProfile {
  email: string;
  first_name: string;
  last_name: string;
  photo: string;
  _id: string;
  is_admin: boolean;
  about: string;
  createdAt: string;
}

//
export interface IEditProfileState {
  first_name: string;
  last_name: string;
  email?: string;
  about: string;
}

export interface IResponseUpdateUser {
  data: IEditProfileState;
  error: null | string;
  status: number;
  message: string;
}
//

export interface IResponseGetUser {
  data: IUserProfile;
  error: null | string;
  status: number;
  message: string;
}
