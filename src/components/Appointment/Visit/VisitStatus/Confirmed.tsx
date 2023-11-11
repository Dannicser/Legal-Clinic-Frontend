import { Button, Result } from "antd";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../../../hooks/useAppSelector";

import dayjs from "dayjs";

export const Confirmed: React.FC = () => {
  const state = useAppSelector((state) => state.appointment.data);

  const date = dayjs(state.date).locale("ru").format("D MMMM");

  return (
    <>
      <Result
        status="success"
        title={`Заявление было успешно подтверждено`}
        subTitle={`Сотрудники юридической клиники ожидают вас по адресу  г. Елец, ул. Советская, д. 72 (редакция газеты "Красное Знамя") ${date} в ${state.time}`}
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
