import { useAppSelector } from "../../../../hooks/useAppSelector";
import { NavLink } from "react-router-dom";
import { PrivetRoutesNames } from "../../../../routers";

import { Button, Result } from "antd";

export const Confirmed: React.FC = () => {
  const formatDate = useAppSelector((state) => state.appointment.data.formatDate);

  return (
    <>
      <Result
        status="success"
        title={`Заявление было успешно подтверждено`}
        subTitle={`Сотрудники юридической клиники ожидают вас по адресу  г. Елец, ул. Советская, д. 72 (редакция газеты "Красное Знамя") ${formatDate}. Не забудьте взять паспорт.`}
        extra={[
          <NavLink to={PrivetRoutesNames.APPOINTMENT_CALENDAR}>
            <Button key="1" type="primary">
              Посмотреть календарь записей
            </Button>
          </NavLink>,
        ]}
      />
    </>
  );
};
