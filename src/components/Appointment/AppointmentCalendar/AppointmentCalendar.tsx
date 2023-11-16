import { useState } from "react";

import axios from "../../../config/axios";

import { Header } from "../../UI/Header/Header";
import { Layout } from "../../Layout/Layout";
import { Alert, Calendar, Divider, Spin, Typography, Row, Col, Tooltip } from "antd";
import { SelectInfo } from "antd/es/calendar/generateCalendar";

import dayjs from "dayjs";
import locale from "antd/es/calendar/locale/ru_RU";

import { ICheckReservationResponse, ITimeResponse } from "../../../types/appointment";
import { useAppSelector } from "../../../hooks/useAppSelector";

interface IState {
  time: ITimeResponse[];
  date: string;
}

export const AppointmentCalendar = () => {
  const [state, setstate] = useState<IState>({
    time: [],
    date: "",
  });

  const myTime = useAppSelector((state) => state.appointment.data.time);
  const myDate = useAppSelector((state) => state.appointment.data.date);

  const schema = ["16:00", "16:15", "16:30", "16:45", "17:00", "17:15", "17:30", "17:45"];

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onChangeCalendar = (data: dayjs.Dayjs, info: SelectInfo) => {
    if (info.source === "date") {
      onChechReservationTime(data.format("MM-DD-YYYY"));
    }
  };

  const onChechReservationTime = async (date: string) => {
    try {
      if (date !== state.date) {
        console.log("request");
        setIsLoading(true);
        const { data } = await axios.post<ICheckReservationResponse>("/appointment/check-reservation", { date });
        setstate({ date, time: data.data });
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const content = (
    <Row className="appointment_calendar_wrapper" gutter={[16, 16]}>
      {schema.map((time) => {
        if (state.time.find((el) => el.time === time)) {
          return (
            <Col className="gutter-row" span={8}>
              <Tooltip title="Зарезервировано" color="#f50">
                <Alert banner showIcon={true} className="alert" type="error" message={time} />
              </Tooltip>
            </Col>
          );
        } else {
          return (
            <Col className="gutter-row" span={8}>
              <Tooltip
                title={time === myTime && state.date === myDate ? "Мое посещение" : "Cвободно"}
                color={time === myTime && state.date === myDate ? "#2db7f5" : "#52c41a"}
              >
                <Alert banner className="alert" message={time} type={time === myTime && state.date === myDate ? "info" : "success"} />
              </Tooltip>
            </Col>
          );
        }
      })}
    </Row>
  );

  return (
    <>
      <Header title="Календарь записей" />
      <Layout>
        <Calendar
          disabledDate={(date) => {
            if (date.valueOf() <= Date.now() - 86400000 && date.format("dddd") === "Tuesday") {
              return true;
            }

            if (date.format("dddd") !== "Tuesday") {
              return true;
            } else {
              return false;
            }
          }}
          locale={locale}
          fullscreen={false}
          mode={"month"}
          onSelect={onChangeCalendar}
        />

        <Alert
          type="info"
          banner
          showIcon={false}
          message={
            <Typography.Text className="alert" strong>
              Информация о резерве {state.date && `на ${dayjs(state.date).locale("ru").format("D MMMM")}`}
            </Typography.Text>
          }
        />
        <Divider />

        {state.date && !isLoading && content}

        {isLoading && <Spin />}

        {!state.date && !isLoading && (
          <Alert
            banner
            type="warning"
            message={
              <Typography.Text className="alert" strong>
                Выберите день, а затем кликните на время для получения полной информации о свободных местах.
              </Typography.Text>
            }
          />
        )}
        <Divider />
      </Layout>
    </>
  );
};
