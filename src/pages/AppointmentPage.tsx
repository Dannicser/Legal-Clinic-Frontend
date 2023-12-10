import { Helmet } from "react-helmet";

import { Header } from "../components/UI/Header/Header";
import { Appointment } from "../components/Appointment/Appointment";
import { Layout } from "../components/Layout/Layout";

export const AppointmentPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title> Запись на посещение - Юридическая клиника при ЕГУ.им И.А. Бунина</title>
        <meta
          name="description"
          content="Запишитесь на очное посещение юридической клиники и получите бесплатную юридическую помощь по различным правовым вопросам"
        />
        <meta name="keywords" content="посещение, бесплатно, помощь, право, отрасли" />
      </Helmet>
      <Header title="Запись на посещение" />
      <Layout>
        <Appointment />
      </Layout>
    </>
  );
};
