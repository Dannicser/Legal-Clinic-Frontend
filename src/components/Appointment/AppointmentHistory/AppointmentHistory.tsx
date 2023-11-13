import { useState, useEffect } from "react";

import axios from "../../../config/axios";

import { Layout } from "../../Layout/Layout";
import { Header } from "../../UI/Header/Header";
import { Avatar, Button, Col, Divider, Empty, List, Rate, Result, Row, Skeleton, Tooltip } from "antd";
import { onCutText } from "../../../utils/helpers";

import Typography from "antd/es/typography";
import { NavLink } from "react-router-dom";
import { PrivetRoutesNames } from "../../../routers";

interface IAppointmentHistoryResponse {
  data: IAppointmentHistoryData[];
  message: string;
}

interface IAppointmentHistoryData {
  problem: string;
  type: string;
  date: string;
  createdAt: string;
  rate: string;
  review: string;
  rejected: boolean;
  message: string;
}

export const AppointmentHistory = () => {
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
                    Запись от {item.date}
                  </Typography.Title>
                </Divider>
              }
              description={
                <>
                  {onCutText(item.problem, 0, 150, true)} <br />
                  <Typography.Text strong style={{ color: "red" }}>
                    Отказано
                  </Typography.Text>
                  <br />
                  <Row justify={"end"}>
                    <Tooltip title={item.message} color={"red"}>
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
                  <Typography.Title level={5}>Запись от {item.date}</Typography.Title>
                </Divider>
              }
              description={
                <>
                  <Tooltip title={item.problem} color={"#4a43ec"}>
                    {onCutText(item.problem, 0, 150, true)}
                    <br />
                    <Rate disabled value={Number(item.rate)} />
                  </Tooltip>
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

//{onCutText(item.createdAt, 0, 4, false)}
