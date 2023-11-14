import { useEffect, useState } from "react";
import { UseLocalStorage } from "../../../../hooks/useLocalStorage";

import { NavLink } from "react-router-dom";
import { PrivetRoutesNames } from "../../../../routers";

import { Button, Modal, Result } from "antd";
import Typography from "antd/es/typography";

export const Accepted: React.FC = () => {
  const [isShown, setIsShown] = useState<boolean>(false);

  useEffect(() => {
    if (!UseLocalStorage({ key: "statushelp", action: "get" })) {
      setIsShown(true);
    }
  }, []);

  return (
    <>
      {isShown && <ModalHelp setIsShown={setIsShown} />}
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

interface IModalHelpProps {
  setIsShown: (param: boolean) => void;
}

const ModalHelp: React.FC<IModalHelpProps> = ({ setIsShown }) => {
  const onCloseModal = () => {
    UseLocalStorage({ key: "statushelp", data: "true", action: "set" });
    setIsShown(false);
  };

  return (
    <Modal
      footer={[
        <>
          <Button onClick={onCloseModal} type="primary">
            Хорошо
          </Button>
        </>,
      ]}
      title={`Обращение было оформлено`}
      open={true}
      onCancel={onCloseModal}
    >
      <Typography.Text type="secondary">В этом разделе вы сможете отслеживать </Typography.Text>
      <Typography.Text strong type="success">
        статус вашего обращения{" "}
      </Typography.Text>
      <Typography.Text type="secondary">и получать необходимую информацию о нем.</Typography.Text>
    </Modal>
  );
};
