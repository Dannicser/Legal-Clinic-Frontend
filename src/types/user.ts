export interface IUserProfile {
  name: string;
  email: string;
  photo: string;
  createdAt: string;
  about: string;
}
export interface IGetUserPayload {
  data: IUserProfile;
  message: string;
  success: boolean;
}

export interface IEditProfileState {
  name: string;
  email?: string;
  about: string;
}
