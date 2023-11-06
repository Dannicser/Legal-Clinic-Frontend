import { Progress } from "antd";
import { Status } from "../../../types/appointment";

interface IAppointmentProgress {
  status: Status;
}

export const AppointmentProgress: React.FC<IAppointmentProgress> = ({ status }) => {
  if (status === "accepted") {
    return <Progress percent={40} status="active" showInfo={false} />;
  }

  if (status === "rejected") {
    return <Progress percent={100} status="exception" showInfo={true} />;
  }

  if (status === "provided") {
    return <Progress percent={100} status="success" showInfo={true} />;
  }

  if (status === "error") {
    return <Progress percent={0} showInfo={false} />;
  }

  return null;
};
