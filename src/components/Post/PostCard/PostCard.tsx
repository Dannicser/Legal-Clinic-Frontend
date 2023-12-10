import { NavLink } from "react-router-dom";

import { IPost } from "../../../types/post";

import favorive from "./assets/icons/favorite.svg";

import { EyeOutlined } from "@ant-design/icons";

import dayjs from "dayjs";

import "./PostCard.scss";

interface IProps {
  data: IPost;
}

export const PostCard: React.FC<IProps> = ({ data }) => {
  const title = data.title.length > 23 ? data.title.slice(0, 23) + "..." : data.title;
  const tags = data.tags.join(" ").length > 22 ? data.tags.join("#").slice(0, 17) + "..." : data.tags.join("#");
  const views = data.views.toString().length > 3 ? data.views.toString().slice(0, data.views.toString().length - 3) + "К" : data.views;
  const month = dayjs(data.createdAt).format("MMMM")[0].toUpperCase() + dayjs(data.createdAt).format("MMMM").slice(1);

  return (
    <NavLink to={`post/${data._id}`}>
      <div className="post__wrapper__card">
        <div className="post__img">
          <img src={data.img} alt="" />
        </div>
        <div className="post__date">
          <div className="month">{month}</div>
        </div>
        <div className="post__favorite">
          <img src={favorive} alt="" />
        </div>
        <div className="post__title">{title}</div>
        <div className="post__footer">
          <div className="views">
            <EyeOutlined />
            <div className="count">{views}</div>
          </div>
          <div className="tags">
            <div className="tag">#{tags}</div>
          </div>
        </div>
      </div>
    </NavLink>
  );
};
