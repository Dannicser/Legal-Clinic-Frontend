import { useAppSelector } from "../../../../hooks/useAppSelector";
import { Header } from "../../../UI/Header/Header";

export const VisitEdit: React.FC = () => {
  const state = useAppSelector((state) => state.appointment);

  return (
    <>
      <Header title="Редактирование" />
    </>
  );
};
