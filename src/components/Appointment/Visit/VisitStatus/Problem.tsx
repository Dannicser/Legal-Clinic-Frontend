import { Button, Result } from "antd";
import { NavLink } from "react-router-dom";

export const Problem: React.FC = () => {
  return (
    <Result
      status="warning"
      title="Что-то пошло не так..."
      subTitle={"Возникли некоторые проблемы, попробуйте обновить страницу или обратиться в службу поддержки"}
      extra={
        <NavLink to={""}>
          <Button type="primary" key="console">
            Служба поддержки
          </Button>
        </NavLink>
      }
    />
  );
};
