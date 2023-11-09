import { useEffect, useState } from "react";

import { useAppSelector } from "../../hooks/useAppSelector";

import { Button, Modal, message } from "antd";

import { AppointmentStatus } from "../../types/appointment";

import { UseLocalStorage } from "../../hooks/useLocalStorage";

import "./Map.scss";

export const Map: React.FC = () => {
  const [isOpenModal, isSetOpenModal] = useState<boolean>(false);
  const [isMessage, isSetMessage] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();
  const state = useAppSelector((state) => state.appointment);

  const isShown = UseLocalStorage({ key: "roadhelp", data: "true", action: "get" });

  const onShowMessage = () => {
    messageApi.open({
      type: "info",
      content: `Мы находимся напротив «Курантов», в здании редации газеты «Красное Знамя» по адресу ул. Советская, д. 72`,
      duration: 10,
      style: {
        marginTop: "45px",
      },
    });
  };

  useEffect(() => {
    if (state.data.status === AppointmentStatus.CONFIRMED && !isShown) {
      isSetOpenModal(true);
    }
  }, []);

  useEffect(() => {
    if (state.data.status === AppointmentStatus.CONFIRMED && isShown) {
      isSetMessage(true);
    }
  }, []);

  useEffect(() => {
    if (state.data.status !== AppointmentStatus.CONFIRMED) {
      isSetMessage(true);
    }
  }, []);

  useEffect(() => {
    if (isMessage) {
      onShowMessage();
    }
  }, [isMessage]);

  const content =
    state.data.status === AppointmentStatus.CONFIRMED && isOpenModal && !isShown ? (
      <ModalInfo date={`${state.data.date}`} isSetMessage={isSetMessage} isOpenModal={isOpenModal} isSetOpenModal={isSetOpenModal} />
    ) : null;

  return (
    <>
      <div className="map__wrapper">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d605.5418347323679!2d38.49929636562404!3d52.62082005749834!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2sru!4v1699517538681!5m2!1sru!2sru"
          width="600"
          height="450"
        ></iframe>
        {contextHolder}
        {content}
      </div>
    </>
  );
};

interface IModalInfoProps {
  isOpenModal: boolean;
  isSetOpenModal: (param: boolean) => void;
  isSetMessage: (param: boolean) => void;
  date: string;
}

const ModalInfo: React.FC<IModalInfoProps> = ({ isOpenModal, isSetOpenModal, date, isSetMessage }) => {
  const onCloseWithoutHelp = () => {
    isSetOpenModal(false);
    isSetMessage(true);
    UseLocalStorage({ key: "roadhelp", data: "true", action: "set" });
  };

  const onCloseWithHelp = () => {
    isSetMessage(true);
    isSetOpenModal(false);
  };

  return (
    <>
      <Modal
        footer={[
          <>
            <Button onClick={onCloseWithoutHelp}>Я знаю маршрут</Button>

            <Button onClick={onCloseWithHelp} type="primary">
              <a
                style={{ color: "white" }}
                target="_blank"
                href="https://www.google.ru/maps/dir//52.6207002,38.4998861/@52.6207002,38.4998861,19z?entry=ttu"
              >
                Да
              </a>
            </Button>
          </>,
        ]}
        title={`У вас запланиривано посещение юридической клиники ${date}`}
        open={isOpenModal}
        onCancel={onCloseWithHelp}
      >
        <p>{"Если вы имете некоторые трудности в поиске нашего офиса, мы можем помочь вам построить маршрут до него"}</p>
      </Modal>
    </>
  );
};
