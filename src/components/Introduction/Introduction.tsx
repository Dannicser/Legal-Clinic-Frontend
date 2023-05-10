import "./Introduction.scss";
import { Carousel, Spin } from "antd";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import calendar from "./assets/img/picture_calendar.png";
import map from "./assets/img/picture_map.png";
import phone from "./assets/img/picture_phone.png";

export const Introduction: React.FC = () => {
  const [position, setPosition] = useState(0);

  const onChange = (currentSlide: number) => {
    setPosition(currentSlide);
  };

  useEffect(() => localStorage.setItem("intro", "true"), []);

  const images = [phone, calendar, map];

  if (position > 2) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="intro__wrapper">
      <div className="intro__container">
        <img src={images[position]} alt="" />
        <Carousel afterChange={onChange}>
          <div>
            <h2 className="aunt__intro">
              <div>Бесплатная юридическая консультация</div>
            </h2>
          </div>
          <div>
            <div className="aunt__intro">Запишишь на очный прием</div>
          </div>
          <div>
            <div className="aunt__intro">Мы ждем тебя, приезжай в ЕГУ им.Бунина</div>
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
