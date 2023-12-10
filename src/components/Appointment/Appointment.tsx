import { useState } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";

import { VisitForm } from "./Visit/VisitForm/VisitForm";
import { VisitMain } from "./Visit/VisitMain/VisitMain";

import { Segmented } from "antd";
import { Spinner } from "../UI/Spinner/Spinner";

import { AppointmentProgress } from "./AppointmentProgress/AppointmentProgress";

import { NotFound as Info } from "../UI/NotFound/NotFound";
import calendar from "./assets/img/calendar.png";

import { AppointmentStatus } from "../../types/appointment";

export const Appointment: React.FC = () => {
  const [toggle, setToggle] = useState(false);
  const isLoading = useAppSelector((state) => state.appointment.isLoading);
  const status = useAppSelector((state) => state.appointment.data.status);

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
      img={calendar}
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
