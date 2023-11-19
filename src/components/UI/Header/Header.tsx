import { useNavigate } from "react-router-dom";

import back from "./img/back.png";

import { Typography } from "antd";

import "./Header.scss";

interface IIprops {
  title?: string;
}

export const Header: React.FC<IIprops> = ({ title }) => {
  const navigate = useNavigate();
  const stepBack = () => navigate(-1);

  return (
    <div className="back__ui">
      <img onClick={stepBack} src={back} alt="" />
      <div className="title__ui">{<Typography.Title level={5}>{title}</Typography.Title>}</div>
    </div>
  );
};
