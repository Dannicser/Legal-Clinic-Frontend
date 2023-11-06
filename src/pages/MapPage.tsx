import { Map } from "../components/Map/Map";
import { Header } from "../components/UI/Header/Header";

export const MapPage: React.FC = () => {
  return (
    <>
      <Header title={"Карта"} />
      <Map />
    </>
  );
};
