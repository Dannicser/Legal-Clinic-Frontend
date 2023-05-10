import "./Navigation.scss";
import { map, main, events, profile } from "./icons/index";

export const Navigation = () => {
  return (
    <nav>
      <div className="nav__menu">
        <div className="nav__item">
          <img src={main} alt="" />
          <div className="title">Главная</div>
        </div>
        <div className="nav__item">
          <img src={events} alt="" />
          <div className="title">Запись</div>
        </div>
        <div className="nav__item">
          <img src={map} alt="" />
          <div className="title">Карта</div>
        </div>
        <div className="nav__item">
          <img src={profile} alt="" />
          <div className="title">Профиль</div>
        </div>
      </div>
    </nav>
  );
};
