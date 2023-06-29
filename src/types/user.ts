export interface IFetchedUserPayload {
  name: string;
  email: string;
  created: string;
}

export interface IFetchedUserAction {
  payload: IFetchedUserPayload;
  type: any;
}
