import { Header } from "../UI/Header/Header";
import "./Map.scss";

export const Map = () => {
  return (
    <>
      <Header title="Карта" />
      <div className="map__wrapper">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11273.869289817105!2d38.4890135628731!3d52.624998563236616!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4130886eaaaaaaab%3A0x9a31c17939f5d93b!2z0JXQu9C10YbQutC40Lkg0LPQvtGB0YPQtNCw0YDRgdGC0LLQtdC90L3Ri9C5INGD0L3QuNCy0LXRgNGB0LjRgtC10YIg0LjQvC4g0JguINCQLiDQkdGD0L3QuNC90LA!5e0!3m2!1sru!2sru!4v1685433543608!5m2!1sru!2sru"
          width="100%"
          height="90%"
        ></iframe>
      </div>
    </>
  );
};
