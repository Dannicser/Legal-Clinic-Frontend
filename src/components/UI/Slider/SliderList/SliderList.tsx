import { SliderCard } from "../SliderCard/SliderCard";
import "./SliderList.scss";

export const SliderList = () => {
  return (
    <div className="slider__list__wrapper">
      <div className="slider__title">НОВОСТИ ГРАЖДАНСКОГО ПРАВА</div>
      <div className="slider__list__container">
        <SliderCard />
        <SliderCard />
        <SliderCard />
      </div>
    </div>
  );
};
