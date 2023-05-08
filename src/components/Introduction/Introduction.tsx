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

  const images = [calendar, map, phone];

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
              <div>Explore Upcoming and Nearby Events In publishing</div>
            </h2>
          </div>
          <div>
            <div className="aunt__intro"> Web Have Modern Events Calendar Feature</div>
          </div>
          <div>
            <div className="aunt__intro"> To Look Up More Events or Activities Nearby By Map</div>
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
