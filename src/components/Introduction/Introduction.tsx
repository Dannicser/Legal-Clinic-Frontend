import { useState, useEffect } from "react";

import { Navigate } from "react-router-dom";

import { Helmet } from "react-helmet";

import { UseLocalStorage } from "../../hooks/useLocalStorage";

import { Carousel } from "antd";

import calendar from "./assets/img/compressed/calendar.png";
import status from "./assets/img/compressed/status.png";
import news from "./assets/img/compressed/news.png";
import appointment from "./assets/img/compressed/appointment.png";

import "./Introduction.scss";

export const Introduction: React.FC = () => {
  const [position, setPosition] = useState(0);

  const onChange = (currentSlide: number) => {
    setPosition(currentSlide);
  };

  useEffect(() => {
    UseLocalStorage({ key: "intro", action: "set", data: "true" });
    UseLocalStorage({ key: "sound", action: "set", data: "true" });
  }, []);

  if (position > 3) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <Helmet>
        <title>Функционал - Юридическая клиника при ЕГУ.им И.А. Бунина</title>
        <meta name="description" content="Функционал Юридической клиники при ЕГУ им И.А. Бунина" />
        <meta name="keywords" content="помощь, календарь, запись, посещение, клиника" />
      </Helmet>
      <div className="intro__wrapper">
        <div className="intro__container">
          <Carousel afterChange={onChange}>
            <div>
              <div className="aunt__intro">
                <img src={appointment} alt="" />
                <div className="info">
                  <div className="title">Запись на посещение</div>
                  <div className="descr">
                    Расскажите нам о ваших правовых проблемах и мы решим их. Составим жалобы, заявления, обращения, иски, представим вас в
                    государственных органах.
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="aunt__intro">
                <img src={calendar} alt="" />
                <div className="info">
                  <div className="title">Календарь посещений</div>
                  <div className="descr">Просматривайте свободное и подходящее для вас время посещения Юридической Клиники.</div>
                </div>
              </div>
            </div>
            <div>
              <div className="aunt__intro">
                <img src={status} alt="" />
                <div className="info">
                  <div className="title">Отслеживайте статус обращения</div>
                  <div className="descr">В режиме реального времени отслеживайте стадии рассмотрения вашего заявления.</div>
                </div>
              </div>
            </div>
            <div>
              <div className="aunt__intro">
                <img src={news} alt="" />
                <div className="info">
                  <div className="title">Новостные сводки</div>
                  <div className="descr">Будьте в курсе обновления законодательства, читая новости из мира права.</div>
                </div>
              </div>
            </div>
            <div></div>
          </Carousel>
        </div>
        <div className="background__intro"></div>
      </div>{" "}
    </>
  );
};
