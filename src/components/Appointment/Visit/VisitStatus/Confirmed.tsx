import { Button, Result } from "antd";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../../../hooks/useAppSelector";

export const Confirmed: React.FC = () => {
  const state = useAppSelector((state) => state.appointment.data);

  return (
    <>
      <Result
        status="success"
        title={`Заявление было успешно подтверждено`}
        subTitle={`Сотрудники юридической клиники ожидают вас по адресу  г. Елец, ул. Советская, д. 72 (редакция газеты "Красное Знамя") ${state.date} в ${state.time}`}
        extra={[
          <NavLink to={""}>
            <Button key="1" type="primary">
              Посмотреть календарь записей
            </Button>
          </NavLink>,
        ]}
      />
    </>
  );
};
