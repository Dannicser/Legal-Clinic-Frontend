import { useAppSelector } from "../../../../hooks/useAppSelector";
import { useEffect } from "react";

import { Accepted } from "../VisitStatus/Accepted";
import { Problem } from "../VisitStatus/Problem";
import { Provided } from "../VisitStatus/Provided";
import { Rejected } from "../VisitStatus/Rejected";
import { Confirmed } from "../VisitStatus/Confirmed";
import { VisitForm } from "../VisitForm/VisitForm";

import { AppointmentStatus } from "../../../../types/appointment";

export const VisitMain = () => {
  const status = useAppSelector((state) => state.appointment.data.status);
  const message = useAppSelector((state) => state.appointment.message);

  if (status === AppointmentStatus.NONE) {
    return <VisitForm />;
  }

  if (status === AppointmentStatus.ACCEPTED) {
    return <Accepted />;
  }

  if (status === AppointmentStatus.REJECTED) {
    return <Rejected message={message} />;
  }

  if (status === AppointmentStatus.CONFIRMED) {
    return <Confirmed />;
  }

  if (status === AppointmentStatus.ERROR) {
    return <Problem />;
  }

  if (status === AppointmentStatus.PROVIDED) {
    return <Provided />;
  }

  return <Problem />;
};
