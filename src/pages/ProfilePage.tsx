import { Helmet } from "react-helmet";

import { Profile } from "../components/Profile/Profile/Profile";

import { Header } from "../components/UI/Header/Header";

export const ProfilePage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Ваш профиль - Юридическая клиника при ЕГУ им И.А. Бунина</title>
        <meta name="description" content="В своем профиле вы можете изменить ФИО и посмотреть другую полезную информацию" />
        <meta name="keywords" content="профиль, изменить, фио" />
      </Helmet>
      <Header title="Профиль" />
      <Profile />
    </>
  );
};
