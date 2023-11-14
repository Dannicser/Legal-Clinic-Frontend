import { useAppSelector } from "../../../../hooks/useAppSelector";
import { NavLink } from "react-router-dom";

import { Button, Result } from "antd";

export const Confirmed: React.FC = () => {
  const state = useAppSelector((state) => state.appointment.data);

  return (
    <>
      <Result
        status="success"
        title={`Заявление было успешно подтверждено`}
        subTitle={`Сотрудники юридической клиники ожидают вас по адресу  г. Елец, ул. Советская, д. 72 (редакция газеты "Красное Знамя") ${state.formatDate}`}
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
