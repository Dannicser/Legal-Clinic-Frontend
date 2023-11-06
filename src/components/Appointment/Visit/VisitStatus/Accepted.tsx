import { Button, Result } from "antd";
import { NavLink } from "react-router-dom";
import { PrivetRoutesNames } from "../../../../routers";

export const Accepted: React.FC = () => {
  return (
    <>
      <Result
        status="success"
        title={`Заявление было успешно зарегистрировано`}
        subTitle={`Сотрудники юридической клиники рассмотрят его в кратчайшие сроки`}
        extra={[
          <NavLink to={PrivetRoutesNames.APPOINTMENT_EDIT}>
            <Button key="1" type="primary">
              Изменить
            </Button>
          </NavLink>,
        ]}
      />
    </>
  );
};
