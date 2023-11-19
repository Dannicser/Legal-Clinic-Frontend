import { useState, useEffect } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { thunkGetStatusAppointment } from "../../slices/appointmentSlice";

import { VisitForm } from "./Visit/VisitForm/VisitForm";
import { VisitMain } from "./Visit/VisitMain/VisitMain";

import { Result, Segmented } from "antd";
import { Spinner } from "../UI/Spinner/Spinner";

import { AppointmentProgress } from "./AppointmentProgress/AppointmentProgress";

import { NotFound as Info } from "../UI/NotFound/NotFound";
import nothing from "./assets/img/not_event.png";

import { AppointmentStatus } from "../../types/appointment";

export const Appointment = () => {
  const [toggle, setToggle] = useState(false);
  const isLoading = useAppSelector((state) => state.appointment.isLoading);
  const status = useAppSelector((state) => state.appointment.data.status);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(thunkGetStatusAppointment());

    console.log("effect status");
  }, []);

  if (isLoading) {
    return (
      <>
        <Spinner />
      </>
    );
  }

  if (status !== AppointmentStatus.NONE) {
    return (
      <>
        <AppointmentProgress status={status} />
        <Segmented style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 600, marginBottom: 20 }} block options={["Прогресс"]} />
        <VisitMain />
      </>
    );
  }

  const content = toggle ? (
    <VisitForm />
  ) : (
    <Info
      img={nothing}
      title="Запишитесь на очное посещение юридической клиники"
      descr="Специалисты окажут необходимую юридическую помощь и решат вашу проблему"
    />
  );

  return (
    <>
      <Segmented
        onChange={() => setToggle(!toggle)}
        style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 600, marginBottom: 20 }}
        block
        options={["О записи", "Записаться"]}
      />
      {content}
    </>
  );
};
