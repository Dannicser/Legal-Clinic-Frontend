import "./Introduction.scss";
import { Carousel, Spin } from "antd";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

import calendar from "./assets/img/calendar.png";
import status from "./assets/img/status.png";
import news from "./assets/img/news.png";
import appointment from "./assets/img/appointment.png";

import { UseLocalStorage } from "../../hooks/useLocalStorage";

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
    <div className="intro__wrapper">
      <div className="intro__container">
        <Carousel afterChange={onChange}>
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
              <img src={appointment} alt="" />
              <div className="info">
                <div className="title">Запись на посещение</div>
                <div className="descr">Заполните форму и специалисты рассмотрят ваше обращение в кратчайшие сроки.</div>
              </div>
            </div>
          </div>
          <div>
            <div className="aunt__intro">
              <img src={status} alt="" />
              <div className="info">
                <div className="title">Отслеживайте статус обращения</div>
                <div className="descr">В режиме реального времени вы можете отслежить стадии рассмотрения вашего заявления.</div>
              </div>
            </div>
          </div>
          <div>
            <div className="aunt__intro">
              <img src={news} alt="" />
              <div className="info">
                <div className="title">Новостные сводки</div>
                <div className="descr">Читайте самые свежие новости из мира права.</div>
              </div>
            </div>
          </div>
          <div>
            <Spin style={{ marginTop: "40px" }} size="large" />
          </div>
        </Carousel>
      </div>
      <div className="background__intro"></div>
    </div>
  );
};
