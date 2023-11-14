import { Progress } from "antd";

import { AppointmentStatus, Status } from "../../../types/appointment";

interface IAppointmentProgress {
  status: Status;
}

export const AppointmentProgress: React.FC<IAppointmentProgress> = ({ status }) => {
  if (status === AppointmentStatus.ACCEPTED) {
    return <Progress percent={25} status="active" showInfo={false} />;
  }

  if (status === AppointmentStatus.REJECTED) {
    return <Progress percent={100} status="exception" showInfo={true} />;
  }

  if (status === AppointmentStatus.CONFIRMED) {
    return <Progress percent={65} status="success" showInfo={true} />;
  }

  if (status === AppointmentStatus.PROVIDED) {
    return <Progress percent={100} status="success" showInfo={true} />;
  }

  if (status === AppointmentStatus.ERROR) {
    return <Progress percent={0} showInfo={false} />;
  }

  return null;
};
