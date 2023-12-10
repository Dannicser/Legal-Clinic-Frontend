import { Row, Typography, Result, Skeleton } from "antd";

import { PostCard } from "../PostCard/PostCard";

import { IPost } from "../../../types/post";

import "./PostsList.scss";

interface IProps {
  title: string;
  posts: IPost[];
  error: boolean;
  loading: boolean;
}

export const PostsList: React.FC<IProps> = ({ posts, title, error, loading }) => {
  if (error) {
    return (
      <>
        <Result status="500" title="500" subTitle="Что-то пошло не так..." />
      </>
    );
  }

  if (loading) {
    return <Skeleton style={{ padding: 20 }} active />;
  }

  return (
    <>
      <Row justify={"start"}>
        <Typography.Title style={{ marginLeft: 20 }} level={5}>
          <>{title}</>
        </Typography.Title>
      </Row>
      <div className="post__list__container">
        {posts.map((data) => {
          return <PostCard key={data._id} data={data} />;
        })}
      </div>
    </>
  );
};
