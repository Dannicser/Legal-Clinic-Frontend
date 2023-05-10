import "./SliderCard.scss";
import card from "../img/card.png";
import favorive from "../img/favorite.svg";
import geo from "../img/geo.svg";

export const SliderCard = () => {
  return (
    <div className="wrapper__slider__card">
      <div className="slider__img">
        <img src={card} alt="" />
      </div>
      <div className="slider__date">
        <div className="number">10</div>
        <div className="month">Июня</div>
      </div>
      <div className="slider__favorite">
        <img src={favorive} alt="" />
      </div>
      <div className="slider__title">Введение нового уголовного...</div>
      <div className="slider_geo">
        <img src={geo} alt="" />
        <div className="geo__place">Москва, РФ</div>
      </div>
    </div>
  );
};
