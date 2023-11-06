export interface IUserProfile {
  email: string;
  first_name: string;
  last_name: string;
  photo: string;
  _id: string;
  is_admin: boolean;
  is_appointment: boolean;
  about: string;
  createdAt: string;
}

export interface IEditProfileState {
  first_name: string;
  last_name: string;
  email?: string;
  about: string;
}

export interface IResponseUpdateUser {
  message: string;
}
