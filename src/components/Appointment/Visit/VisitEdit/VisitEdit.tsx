import { Layout } from "../../../Layout/Layout";
import { Header } from "../../../UI/Header/Header";
import { VisitForm } from "../VisitForm/VisitForm";

export const VisitEdit: React.FC = () => {
  return (
    <>
      <Header title="Редактирование" />
      <Layout internal={{ paddingTop: 50 }}>
        <VisitForm edit={true} />
      </Layout>
    </>
  );
};
