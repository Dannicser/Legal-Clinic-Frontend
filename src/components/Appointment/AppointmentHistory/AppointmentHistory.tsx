import { useState, useEffect } from "react";

import axios from "../../../config/axios";

import { Layout } from "../../Layout/Layout";
import { Header } from "../../UI/Header/Header";
import { Avatar, Divider, Empty, List, Rate, Skeleton } from "antd";
import { onCutText } from "../../../utils/helpers";

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

  console.log(appointments);

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
      renderItem={(item, index) => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar style={{ backgroundColor: "#4a43ec" }} icon={index + 1} />}
            title={
              <Divider>
                <strong>
                  Запись от {item.date} {onCutText(item.createdAt, 0, 4, false)}
                </strong>
              </Divider>
            }
            description={
              <>
                {onCutText(item.problem, 0, 150, true)}
                <br />
                <Rate disabled value={Number(item.rate)} />
              </>
            }
            style={{ textAlign: "start" }}
          />
        </List.Item>
      )}
    />
  );
};

const Loader: React.FC = () => {
  return <Skeleton active avatar paragraph={{ rows: 4 }} />;
};
