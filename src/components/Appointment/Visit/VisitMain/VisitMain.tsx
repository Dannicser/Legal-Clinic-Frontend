import { useEffect } from "react";
import { VisitForm } from "../VisitForm/VisitForm";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { thunkGetStatusAppointment } from "../../../../slices/appointmentSlice";
import { useAppSelector } from "../../../../hooks/useAppSelector";
import { AppointmentStatus } from "../../../../types/appointment";
import { Divider } from "antd";
import { Spinner } from "../../../UI/Spinner/Spinner";

import { Accepted } from "../VisitStatus/Accepted";
import { Problem } from "../VisitStatus/Problem";
import { Provided } from "../VisitStatus/Provided";
import { Rejected } from "../VisitStatus/Rejected";

export const VisitMain = () => {
  const { appointment } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(thunkGetStatusAppointment());
  }, []);

  if (appointment.isLoading) {
    return (
      <>
        <Divider></Divider>
        <Spinner />
      </>
    );
  }

  if (appointment.status === AppointmentStatus.NONE) {
    return <VisitForm />;
  }

  if (appointment.status === AppointmentStatus.ACCEPTED) {
    return <Accepted />;
  }

  if (appointment.status === AppointmentStatus.ERROR) {
    return <Problem />;
  }

  if (appointment.status === AppointmentStatus.PROVIDED) {
    return <Provided />;
  }

  if (appointment.status === AppointmentStatus.REJECTED) {
    return <Rejected message={appointment.message} />;
  }

  return <VisitForm />;
};
