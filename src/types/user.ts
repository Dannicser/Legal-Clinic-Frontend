export interface IUserAuthParams {
  name: string;
  email: string;
  userId: string;
  photo: string;
  appointment: object;
}

export interface IUserAppointment {}

export interface IFetchedUserPayload {
  name: string;
  email: string;
  created: string;
}

export interface IFetchedUserAction {
  payload: IFetchedUserPayload;
  type: any;
}
