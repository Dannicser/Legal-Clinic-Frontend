import { Segmented } from "antd";
import { Header } from "../UI/Header/Header";
import { Layout } from "../Layout/Layout";
import { NotFound } from "../UI/NotFound/NotFound";
import nothing from "./assets/img/not_event.png";
import { useState } from "react";
import { Visit } from "./Visit/Visit";

export const Appointment = () => {
  const [toggle, setToggle] = useState(false);

  const content = toggle ? (
    <Visit />
  ) : (
    <NotFound
      img={nothing}
      title="Запишитесь на очное посещение юридической клиники"
      descr="Специалисты окажут необходимую юридическую помощь и решат вашу проблему"
    />
  );

  return (
    <>
      <Header title="Запись на посещение" />

      <Layout>
        <Segmented
          onChange={() => setToggle(!toggle)}
          style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 600 }}
          block
          options={["О записи", "Записаться"]}
        />
        {content}
      </Layout>
    </>
  );
};
