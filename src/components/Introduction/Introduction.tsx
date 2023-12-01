import "./Introduction.scss";
import { Carousel, Spin } from "antd";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import calendar from "./assets/img/picture_calendar.png";
import map from "./assets/img/picture_map.png";
import phone from "./assets/img/picture_phone.png";
import test from "./assets/img/111.png";
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

  if (position > 2) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="intro__wrapper">
      <div className="intro__container">
        <Carousel afterChange={onChange}>
          <div>
            <h2 className="aunt__intro">
              <img src={phone} alt="" />
              <div className="info">Получи бесплатную юридическую помощь от ведущих специалистов юридической клиники</div>
            </h2>
          </div>
          <div>
            <div className="aunt__intro">
              <img src={calendar} alt="" />
              <div className="info">Запишитесь на очное посещение клиники в удобное для вас время </div>
            </div>
          </div>
          <div>
            <div className="aunt__intro">
              <img src={map} alt="" />
              <div className="info">
                Приезжай к нам в ЕГУ им. И.А Бунина. <br /> Мы ждем тебя!
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
