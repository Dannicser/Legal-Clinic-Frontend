import "./Home.scss";
import { HeaderMenu } from "../../components/UI/HeaderMenu/HeaderMenu";
import { SliderList } from "../../components/UI/Slider/SliderList/SliderList";
import { Banner } from "../../components/UI/Banner/Banner";

export const Home: React.FC = () => {
  return (
    <>
      <HeaderMenu />
      <Banner />
      <SliderList />
    </>
  );
};
