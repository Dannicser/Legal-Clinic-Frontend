import { Button, Result } from "antd";
import { NavLink } from "react-router-dom";
import { PrivetRoutesNames } from "../../../../routers";

export const Accepted: React.FC = () => {
  return (
    <>
      <Result
        status="info"
        title={`Заявление было успешно зарегистрировано`}
        subTitle={`Сотрудники юридической клиники рассмотрят его в кратчайшие сроки и свяжутся с вами по телефону.`}
        extra={[
          <NavLink to={PrivetRoutesNames.APPOINTMENT_EDIT}>
            <Button type="primary">Изменить</Button>
          </NavLink>,
        ]}
      />
    </>
  );
};
