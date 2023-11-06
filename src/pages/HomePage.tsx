import { HeaderMenu } from "../components/UI/HeaderMenu/HeaderMenu";
import { Divider } from "antd";

import { Banner } from "../components/UI/Banner/Banner";
import { PostsList } from "../components/Post/PostLists/PostsList";
import { Layout } from "../components/Layout/Layout";

import { useEffect } from "react";

import { useAppDispatch } from "../hooks/useAppDispatch";
import { onGetAllPostsByType } from "../slices/postSlice";
import { useAppSelector } from "../hooks/useAppSelector";

import { Categories } from "../types/post";

//

export const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();

  const { civil, criminal } = useAppSelector((state) => state.post);

  useEffect(() => {
    dispatch(onGetAllPostsByType(Categories.CIVIL));
    dispatch(onGetAllPostsByType(Categories.CRIMINAL));
  }, []);

  const defaultProps = { paddingTop: 0, paddingBottom: 40, paddingRight: 0, paddingLeft: 0 };

  return (
    <>
      <Layout external={defaultProps} internal={defaultProps}>
        <HeaderMenu />
        <Banner />
        <PostsList posts={criminal.posts} loading={criminal.loading} error={criminal.error} title={criminal.posts.length ? "Уголовное право" : ""} />
        <Divider />
        <PostsList posts={civil.posts} loading={civil.loading} error={civil.error} title={civil.posts.length ? "Гражданское право" : ""} />
      </Layout>
    </>
  );
};
