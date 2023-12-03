import type { Dayjs } from "dayjs";

export interface IApointmentState {
  date: Dayjs;
  time: Dayjs;
  problem: string;
  type: string;
  phone: number;
}

export interface IRegisterApointmentData {
  first_name: string;
  last_name: string;
  date: string;
  time: string;
  problem: string;
  type: string;
  phone: string;
}

//
interface IRegisterApointmentDataResponse {
  isReserved: boolean;
  doc: IRegisterApointmentData;
}

export interface IRegisterApointmentResponse {
  data: IRegisterApointmentDataResponse;
  message: string;
  status: number;
  error: string | null;
}
//

export enum AppointmentStatus {
  NONE = "none",
  ERROR = "error",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
  PROVIDED = "provided",
  CONFIRMED = "confirmed",
}

export type Status = "none" | "error" | "accepted" | "confirmed" | "rejected" | "provided";

//
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
  status: number;
  error: string | null;
}

//
export interface IEditAppointmentData {
  problem: string;
  type: string;
  time: string;
  date: string;
  phone: string;
}

export interface IChangeAppointmentResponse {
  data: IRegisterApointmentDataResponse;
  message: string;
  status: number;
  error: string | null;
}

export interface IChangeStatusAppointment {
  message: string;
  status: "confirmed" | "rejected" | "provided";
}

//
export interface IRemoveAppointmentResponse {
  message: string;
  status: number;
  error: string | null;
  data: null;
}

export interface ITimeResponse {
  time: string;
  date: string;
  _id: string;
}

export interface ICheckReservationResponse {
  message: string;
  data: ITimeResponse[];
}
