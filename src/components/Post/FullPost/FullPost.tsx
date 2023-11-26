import { useParams } from "react-router-dom";
import { Header } from "../../UI/Header/Header";
import { Divider, Typography, Button, Result, Skeleton, Row, Col, Space, Alert } from "antd";
import { Layout } from "../../Layout/Layout";

import calendar from "./assets/icons/calendar.svg";
import geo from "./assets/icons/geo.svg";

import { useEffect, useState } from "react";

import { IPost } from "../../../types/post";

import axios from "../../../config/axios";

import ReactMarkdown from "react-markdown";

import dayjs from "dayjs";

import "./FullPost.scss";

interface IProps {
  data: IPost;
}

interface IState {
  post: IPost | null;
  isLoading: boolean;
  isError: boolean;
}

export const FullPost: React.FC = () => {
  const [state, setState] = useState<IState>({
    isLoading: false,
    isError: false,
    post: null,
  });

  const { id } = useParams();

  useEffect(() => {
    onGetPostById();
  }, []);

  const onGetPostById = async () => {
    try {
      setState({ ...state, isLoading: true });

      const { data } = await axios.get(`/post/${id}`);

      setState({ ...state, isLoading: false, post: data.data });
    } catch (error) {
      console.log(error);
      setState({ ...state, isLoading: false, isError: true });
    }
  };

  const eventContent = state.post && <Event data={state.post} />;

  return (
    <>
      <Header title={"Новостная сводка"} />
      <Layout>
        {state.isError && <Result status="404" title="404" subTitle="Что-то пошло не так..." />}
        {state.isLoading && <Loader />}
        {!state.isLoading && !state.isError && eventContent}
      </Layout>
    </>
  );
};

const Event = ({ data }: IProps) => {
  const tags = data.tags.map((el, i) => {
    return (
      <Button key={i} type="primary" shape="round" style={{ margin: 4 }} danger={i % 2 === 0}>
        #{el}
      </Button>
    );
  });

  console.log(data);
  console.log(data.text);
  return (
    <>
      <img src={data.img} alt="" />
      <Divider />
      <div className="full__post_container">
        <div className="full__post_event">
          <div className="full__post_icon">
            <div className="icon">
              <img src={calendar} alt="" />
            </div>
          </div>
          <div className="full__post_date">
            <div className="date">
              <span>{dayjs(data.createdAt).format("D MMMM YYYY")} года</span>
            </div>
          </div>
        </div>
        <div className="full__post_event">
          <div className="full__post_icon">
            <div className="icon">
              <img src={geo} alt="" />
            </div>
          </div>
          <div className="full__post_place">
            <div className="place">
              <span>{data.сity || "Москва"}</span> <br /> {data.initiator || "Государственная Дума"}
            </div>
          </div>
        </div>
      </div>{" "}
      <Divider />
      {tags}
      <Divider />
      <Typography.Title className="mt-1" level={3}>
        {data.title}
      </Typography.Title>
      <Typography.Title level={4}>О событии</Typography.Title>
      <MarkDown text={data.text} />
    </>
  );
};

interface IMarkDownProp {
  text: string;
}

const MarkDown: React.FC<IMarkDownProp> = ({ text }) => {
  return (
    <div className="mark_down_wrapper">
      <ReactMarkdown className="markdown">{text}</ReactMarkdown>
    </div>
  );
};

const Loader: React.FC = () => {
  return (
    <>
      <Row>
        <Col span={24}>
          <Skeleton.Image active />
        </Col>

        <Divider />

        <Col span={24}>
          <Row justify={"start"}>
            <Space>
              <Skeleton.Button active />
              <Skeleton.Input active />
            </Space>
          </Row>
        </Col>
        <Divider />

        <Col span={24}>
          <Row justify={"start"}>
            <Space>
              <Skeleton.Button active />
              <Skeleton.Input active />
            </Space>
          </Row>
        </Col>

        <Divider />

        <Col span={24}>
          <Row justify={"space-evenly"}>
            <Col>
              <Skeleton.Button active />
            </Col>
            <Col>
              <Skeleton.Button active />
            </Col>
            <Col>
              <Skeleton.Button active />
            </Col>
          </Row>
        </Col>

        <Divider />

        <Col span={24}>
          <Skeleton.Input active />
        </Col>

        <Divider />

        <Col span={24}>
          <Skeleton active />
        </Col>
      </Row>
    </>
  );
};
