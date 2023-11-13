import { useState } from "react";
import { Header } from "../../UI/Header/Header";

import { Calendar, Col, Radio, Row, Select, Typography } from "antd";

import { Layout } from "../../Layout/Layout";

import axios from "../../../config/axios";
import { ICheckReservationResponse } from "../../../types/appointment";

//
import React from "react";
import "dayjs/locale/zh-cn";
import Dayjs from "dayjs";
import dayLocaleData from "dayjs/plugin/localeData";

import locale from "antd/es/calendar/locale/ru_RU";

import type { CalendarProps } from "antd";

interface IState {
  time: string[];
  date: string;
}

export const AppointmentCalendar = () => {
  const [date, setDate] = useState<IState>({
    time: [],
    date: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onChangeCalendar = (data: any, a: any) => {
    const date = data.format("DD-MM-YYYY");

    console.log(date, a);
  };

  const onPanelChange = () => {
    console.log("panal");
  };

  const onChechReservationTime = async (date: string) => {
    try {
      console.log(date);
      console.log("request");
      setIsLoading(true);
      const { data } = await axios.post<ICheckReservationResponse>("/appointment/check-reservation", { date });

      setDate({ date, time: data.data });
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  console.log(date);

  return (
    <>
      <Header title="Календарь записей" />
      <Layout>
        <Calendar
          disabledDate={(date) => {
            if (date.valueOf() < Date.now()) {
              return true;
            }
            if (date.format("dddd") !== "Tuesday" && date.valueOf() > Date.now()) {
              return true;
            } else {
              return false;
            }
          }}
          locale={locale}
          fullscreen={false}
          mode={"month"}
          //   onSelect={(date, info) => console.log(source)}
          //   headerRender={({ value, type, onChange, onTypeChange }) => {
          //     const start = 0;
          //     const end = 12;
          //     const monthOptions = [];

          //     let current = value.clone();
          //     const localeData = value.localeData();
          //     const months = [];
          //     for (let i = 0; i < 12; i++) {
          //       current = current.month(i);
          //       months.push(localeData.monthsShort(current));
          //     }

          //     for (let i = start; i < end; i++) {
          //       monthOptions.push(
          //         <Select.Option key={i} value={i} className="month-item">
          //           {months[i]}
          //         </Select.Option>
          //       );
          //     }

          //     const month = value.month();

          //     return (
          //       <div style={{ padding: 8 }}>
          //         <Row gutter={8}>
          //           <Col>
          //             <Radio.Group size="small" onChange={(e) => onTypeChange(e.target.value)} value={type}>
          //               <Radio.Button value="month">Месяц</Radio.Button>
          //             </Radio.Group>
          //           </Col>

          //           <Col>
          //             <Select
          //               size="small"
          //               dropdownMatchSelectWidth={false}
          //               value={month}
          //               onChange={(newMonth) => {
          //                 const now = value.clone().month(newMonth);
          //                 onChange(now);
          //               }}
          //             >
          //               {monthOptions}
          //             </Select>
          //           </Col>
          //         </Row>
          //         <Typography.Title level={4}>{months[month]}</Typography.Title>
          //       </div>
          //     );
          //   }}
        />
      </Layout>
    </>
  );
};
