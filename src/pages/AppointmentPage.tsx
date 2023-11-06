import { Header } from "../components/UI/Header/Header";
import { Appointment } from "../components/Appointment/Appointment";
import { Layout } from "../components/Layout/Layout";

export const AppointmentPage: React.FC = () => {
  return (
    <>
      <Header title="Запись на посещение" />
      <Layout>
        <Appointment />
      </Layout>
    </>
  );
};
