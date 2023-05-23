export interface IState {
  type: NotificationType;
  message: string;
  description: string;
  duration: number;
  status: "none" | "show";
  placement: "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
}

export type NotificationType = "success" | "info" | "warning" | "error";
