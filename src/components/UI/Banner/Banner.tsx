import "./Banner.scss";
import banner from "./imgs/banner.png";
import { Button } from "antd";
import { PrivetRoutesNames } from "../../../routers";
import { NavLink } from "react-router-dom";

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
            <NavLink to={PrivetRoutesNames.CONVERSATION}>
              <Button size="small" type="primary" block>
                ПОЛУЧИТЬ
              </Button>
            </NavLink>
          </div>
        </div>
        <img src={banner} alt="" />
      </div>
    </div>
  );
};
