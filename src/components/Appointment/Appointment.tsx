import { useState, useEffect } from "react";

import { Segmented } from "antd";
import { NotFound as Info } from "../UI/NotFound/NotFound";

import nothing from "./assets/img/not_event.png";
import { VisitMain } from "./Visit/VisitMain/VisitMain";
import { useAppSelector } from "../../hooks/useAppSelector";
import { AppointmentProgress } from "./AppointmentProgress/AppointmentProgress";
import { VisitForm } from "./Visit/VisitForm/VisitForm";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { thunkGetStatusAppointment } from "../../slices/appointmentSlice";
import { Spinner } from "../UI/Spinner/Spinner";
import { AppointmentStatus } from "../../types/appointment";

export const Appointment = () => {
  const [toggle, setToggle] = useState(false);
  const state = useAppSelector((state) => state.appointment);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(thunkGetStatusAppointment());
  }, []);

  if (state.isLoading) {
    return (
      <>
        <Spinner />
      </>
    );
  }

  if (state.data.status !== AppointmentStatus.NONE) {
    return (
      <>
        <AppointmentProgress status={state.data.status} />
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
