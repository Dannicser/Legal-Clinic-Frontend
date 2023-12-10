import { Helmet } from "react-helmet";

import { Map } from "../components/Map/Map";

import { Header } from "../components/UI/Header/Header";

export const MapPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title> Наше местоположение - Юридическая клиника при ЕГУ.им И.А. Бунина</title>
        <meta
          name="description"
          content="Вы можете посмотреть, где мы находимся с помощью карты. При обращении в клинику, мы поможем построить вам маршрут до нашего офиса"
        />
        <meta name="keywords" content="карта, клиника, найти" />
      </Helmet>
      <Header title={"Карта"} />
      <Map />
    </>
  );
};
