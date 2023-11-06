import type { Dayjs } from "dayjs";

export interface IApointmentState {
  first_name: string;
  last_name: string;
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
  phone: number;
}

export interface IRegisterApointmentDataResponse {
  message: string;
}

export enum AppointmentStatus {
  NONE = "none",
  ERROR = "error",
  CONSIDERING = "considering",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
  PROVIDED = "provided",
}

export type Status = "none" | "error" | "accepted" | "rejected" | "provided";

export interface IGetApointmentStatusResponse {
  message: string;
  status: Status;
  id?: string;
}
