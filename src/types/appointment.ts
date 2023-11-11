import type { Dayjs } from "dayjs";

export interface IApointmentState {
  date: Dayjs;
  time: Dayjs;
  problem: string;
  type: string;
  phone: number;
}

export interface IRegisterApointmentData {
  date: string;
  time: string;
  problem: string;
  type: string;
  phone: number | string;
}

export interface IRegisterApointmentDataResponse {
  message: string;
  status?: Status;
}

export enum AppointmentStatus {
  NONE = "none",
  ERROR = "error",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
  PROVIDED = "provided",
  CONFIRMED = "confirmed",
}

export type Status = "none" | "error" | "accepted" | "confirmed" | "rejected" | "provided";

export interface AppointmentGetInfoResponseData {
  problem: string;
  type: string;
  status: Status;
  id: string;
  time: string;
  date: string;
  phone: string;
  createdAt: string;
}

export interface IGetApointmentInfoResponse {
  message: string;
  data: AppointmentGetInfoResponseData;
  status?: Status;
}
export interface IGetApointmentInfoResponseError {
  message: string;
  error: string;
  status: string;
}

export interface IRemoveAppointmentResponse {
  message: string;
  status: string;
}

export interface IEditAppointmentData {
  problem: string;
  type: string;
  time: string;
  date: string;
  phone: string;
}
