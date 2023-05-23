import type { Dayjs } from "dayjs";

export interface IApointmentState {
  date: Dayjs;
  time: Dayjs;
  problem: string;
  type: string;
}

export interface IApointment {
  date: string;
  time: string;
  problem: string;
  type: string;
  id: number;
}
