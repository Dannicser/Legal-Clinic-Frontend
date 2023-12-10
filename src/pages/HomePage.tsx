import { useAppSelector } from "../hooks/useAppSelector";

import { Helmet } from "react-helmet";

import { Divider } from "antd";
import { HeaderMenu } from "../components/UI/HeaderMenu/HeaderMenu";

import { Banner } from "../components/UI/Banner/Banner";
import { PostsList } from "../components/Post/PostLists/PostsList";
import { Layout } from "../components/Layout/Layout";

export const HomePage: React.FC = () => {
  const civil = useAppSelector((state) => state.post.civil);
  const criminal = useAppSelector((state) => state.post.criminal);

  const defaultProps = { paddingTop: 0, paddingBottom: 40, paddingRight: 0, paddingLeft: 0 };

  return (
    <>
      <Helmet>
        <title>Домашняя страница - Юридическая клиника при ЕГУ.им И.А. Бунина</title>
        <meta
          name="description"
          content="Домашняя страница в приложении Юридической клиники при ЕГУ им И.А. Бунина. Свежие новости из разных отраслей права."
        />
        <meta name="keywords" content="юридическая клиника, новости, бесплатно" />
      </Helmet>
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
