import back from "./img/back.svg";
import "./Header.scss";
import { useLocation, useNavigate } from "react-router-dom";

interface IIprops {
  title?: string;
}

export const Header: React.FC<IIprops> = ({ title }) => {
  const navigate = useNavigate();
  const stepBack = () => navigate(-1);

  return (
    <div className="back__ui">
      <img onClick={stepBack} src={back} alt="" />
      {title && <div className="title__ui">{title}</div>}
    </div>
  );
};
