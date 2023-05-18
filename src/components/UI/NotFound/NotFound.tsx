import { Button, Empty } from "antd";
import "./NotFound.scss";

interface IProps {
  img: string;
  title: string;
  descr: string;
}

export const NotFound: React.FC<IProps> = ({ img, title, descr }) => {
  return (
    <div className="not__found_container">
      <Empty image={img} description={<h2 className="not__found_title">{title}</h2>}>
        <h3 className="not__found_descr">{descr}</h3>
      </Empty>{" "}
    </div>
  );
};
