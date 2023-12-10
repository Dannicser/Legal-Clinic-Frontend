import { useState, useEffect } from "react";

import { Helmet } from "react-helmet";

import { NavLink } from "react-router-dom";
import { PrivetRoutesNames } from "../../../routers";

import axios from "../../../config/axios";

import { Layout } from "../../Layout/Layout";
import { Header } from "../../UI/Header/Header";

import { Avatar, Button, Divider, Empty, List, Rate, Result, Row, Skeleton, Tooltip } from "antd";
import { Typography } from "antd/es";

import { onCutText, onIsValidDate } from "../../../utils/helpers";

interface IAppointmentHistoryResponse {
  data: IAppointmentHistoryData[];
  message: string;
  error: null | string;
  status: number;
}

interface IAppointmentHistoryData {
  problem: string;
  type: string;
  date: string;
  createdAt: string;
  rate: string;
  review: string;
  rejected: boolean;
  reason: string;
}

export const AppointmentHistory: React.FC = () => {
  const [appointments, setAppointments] = useState<IAppointmentHistoryData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const onGetAppointmentHistory = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get<IAppointmentHistoryResponse>("/appointment/get-history");
      setAppointments(response.data.data);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    onGetAppointmentHistory();
  }, []);

  const loader = !isError && isLoading ? <Loader /> : null;

  const content = appointments.length ? (
    <Cards data={appointments} />
  ) : (
    <Empty description={"История обращений пуста"} image={Empty.PRESENTED_IMAGE_SIMPLE} />
  );

  if (isError) {
    return (
      <>
        <Result
          status="500"
          title="500"
          subTitle="Что-то пошло не так"
          extra={
            <NavLink to={PrivetRoutesNames.HOME}>
              <Button type="primary">Главная</Button>
            </NavLink>
          }
        />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>История обращений - Юридическая клиника при ЕГУ им И.А. Бунина</title>
        <meta name="description" content="Здесь вы можете посмотреть историю обращений в нашу клинику" />
        <meta name="keywords" content="история, обращение, запись, посещение, клиника" />
      </Helmet>
      <Header title={"История обращений"} />
      <Layout>{loader || content}</Layout>
    </>
  );
};

interface ICardProps {
  data: IAppointmentHistoryData[];
}

const Cards: React.FC<ICardProps> = ({ data }) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item, index) =>
        item.rejected ? (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar style={{ backgroundColor: "red" }} icon={index + 1} />}
              title={
                <Divider>
                  <Typography.Title level={5} style={{ color: "red" }}>
                    Запись от {onIsValidDate(item.date)}
                  </Typography.Title>
                </Divider>
              }
              description={
                <>
                  <Tooltip title={onCutText(item.problem, 0, 300, true)} color={"red"}>
                    {onCutText(item.problem, 0, 150, true)} <br />
                  </Tooltip>
                  <Typography.Text strong style={{ color: "red" }}>
                    Отказано
                  </Typography.Text>
                  <br />
                  <Row justify={"end"}>
                    <Tooltip title={item.reason} color={"red"}>
                      <Button danger type="primary">
                        Причина
                      </Button>
                    </Tooltip>
                  </Row>
                </>
              }
              style={{ textAlign: "start" }}
            />
          </List.Item>
        ) : (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar style={{ backgroundColor: "#4a43ec" }} icon={index + 1} />}
              title={
                <Divider>
                  <Typography.Title level={5}>Запись от {onIsValidDate(item.date)}</Typography.Title>
                </Divider>
              }
              description={
                <>
                  <Tooltip title={onCutText(item.problem, 0, 300, true)} color={"#4a43ec"}>
                    {onCutText(item.problem, 0, 150, true)}
                    <br />
                  </Tooltip>
                  <Tooltip title={`Ваша оценка -  ${item.rate}`} color={"#4a43ec"}>
                    <Rate className="mt-1" disabled value={Number(item.rate)} />
                  </Tooltip>
                  <Row justify={"end"}>
                    <Tooltip title={item.review} color={"#4a43ec"}>
                      <Button type="primary">Отзыв</Button>
                    </Tooltip>
                  </Row>
                </>
              }
              style={{ textAlign: "start" }}
            />
          </List.Item>
        )
      }
    />
  );
};

const Loader: React.FC = () => {
  return <Skeleton active avatar paragraph={{ rows: 4 }} />;
};
