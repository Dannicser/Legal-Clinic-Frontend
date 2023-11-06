import { useState } from "react";

import { Segmented } from "antd";
import { NotFound as Info } from "../UI/NotFound/NotFound";

import nothing from "./assets/img/not_event.png";
import { VisitMain } from "./Visit/VisitMain/VisitMain";
import { useAppSelector } from "../../hooks/useAppSelector";
import { AppointmentProgress } from "./AppointmentProgress/AppointmentProgress";
import { VisitForm } from "./Visit/VisitForm/VisitForm";

export const Appointment = () => {
  const [toggle, setToggle] = useState(false);
  const status = useAppSelector((state) => state.appointment.status);

  const content = toggle ? (
    <VisitForm />
  ) : (
    <Info
      img={nothing}
      title="Запишитесь на очное посещение юридической клиники"
      descr="Специалисты окажут необходимую юридическую помощь и решат вашу проблему"
    />
  );

  if (status !== "none") {
    return (
      <>
        <AppointmentProgress status={status} />
        <Segmented style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 600, marginBottom: 20 }} block options={["Прогресс"]} />
        <VisitMain />
      </>
    );
  }

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
