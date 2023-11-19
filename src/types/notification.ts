export interface INotificationItem {
  title: string;
  message: string;
  user?: string;
  is_read: boolean;
  is_everyone: boolean;
  createdAt: string;
  _id: string;
}

export interface INotificationGetAllResponse {
  data: INotificationItem[] | [];
  error: string | null;
  message: string;
  status: number;
}

//

export interface INotificationDeleteAllResponse {
  data: INotificationDeleteAllResponseData;
  error: string | null;
  message: string;
  status: number;
}

interface INotificationDeleteAllResponseData {
  count: number;
}

//

interface INotificationReadResponseData {
  modifiedCount: number;
}

export interface INotificationReadResponse {
  data: INotificationReadResponseData;
  error: string | null;
  message: string;
  status: number;
}

//
