import { Profile } from "../components/Profile/Profile/Profile";
import { Header } from "../components/UI/Header/Header";

export const ProfilePage: React.FC = () => {
  return (
    <>
      <Header title="Профиль" />
      <Profile />
    </>
  );
};
