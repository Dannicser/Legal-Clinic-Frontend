import { VisitForm } from "../VisitForm/VisitForm";

import { useAppSelector } from "../../../../hooks/useAppSelector";
import { AppointmentStatus } from "../../../../types/appointment";

import { Accepted } from "../VisitStatus/Accepted";
import { Problem } from "../VisitStatus/Problem";
import { Provided } from "../VisitStatus/Provided";
import { Rejected } from "../VisitStatus/Rejected";
import { Confirmed } from "../VisitStatus/Confirmed";

export const VisitMain = () => {
  const { appointment } = useAppSelector((state) => state);

  if (appointment.data.status === AppointmentStatus.NONE) {
    return <VisitForm />;
  }

  if (appointment.data.status === AppointmentStatus.ACCEPTED) {
    return <Accepted />;
  }

  if (appointment.data.status === AppointmentStatus.REJECTED) {
    return <Rejected message={appointment.message} />;
  }

  if (appointment.data.status === AppointmentStatus.CONFIRMED) {
    return <Confirmed />;
  }

  if (appointment.data.status === AppointmentStatus.ERROR) {
    return <Problem />;
  }

  if (appointment.data.status === AppointmentStatus.PROVIDED) {
    return <Provided />;
  }

  return <Problem />;
};
