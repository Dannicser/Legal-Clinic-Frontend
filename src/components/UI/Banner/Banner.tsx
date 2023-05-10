import banner from "./imgs/banner.png";
import "./Banner.scss";
import { Button } from "antd";

export const Banner = () => {
  return (
    <div className="banner__wrapper">
      <div className="banner__container">
        <div className="banner__info">
          <div className="title">Бесплатная</div>
          <div className="descr">
            Юридическая консультация <br /> от специалистов
          </div>
          <div className="btn">
            <Button size="small" type="primary" block>
              ПОЛУЧИТЬ
            </Button>
          </div>
        </div>
        <img src={banner} alt="" />
      </div>
    </div>
  );
};
