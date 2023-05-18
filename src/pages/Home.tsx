import { HeaderMenu } from "../components/UI/HeaderMenu/HeaderMenu";
import { SliderList } from "../components/UI/Slider/SliderList/SliderList";
import { Banner } from "../components/UI/Banner/Banner";
import Layout from "antd/es/layout/layout";

export const Home: React.FC = () => {
  return (
    <Layout>
      <HeaderMenu />
      <Banner />
      <SliderList />
    </Layout>
  );
};
