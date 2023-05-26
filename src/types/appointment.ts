import type { Dayjs } from "dayjs";

export interface IApointmentState {
  date: Dayjs;
  time: Dayjs;
  problem: string;
  type: string;
  name: string;
  phone: number;
}

export interface IApointment {
  name: string;
  date: string;
  time: string;
  problem: string;
  type: string;
  id: number;
  phone: number;
}
