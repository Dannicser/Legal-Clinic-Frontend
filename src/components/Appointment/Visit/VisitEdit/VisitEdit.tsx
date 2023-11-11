import { useState, useEffect } from "react";
import { useAppSelector } from "../../../../hooks/useAppSelector";
import { IEditAppointmentData } from "../../../../types/appointment";

import { Layout } from "../../../Layout/Layout";
import { Header } from "../../../UI/Header/Header";
import { VisitForm } from "../VisitForm/VisitForm";

import axios from "../../../../config/axios";
import { redirect, Navigate } from "react-router-dom";
import { PrivetRoutesNames } from "../../../../routers";
import { message } from "antd";

interface IChangeAppointmentResponse {
  message: string;
  data: null;
}

export const VisitEdit: React.FC = () => {
  const { problem, status, time, date, type, phone } = useAppSelector((state) => state.appointment.data);
  const [isLoadingEdit, setIsLoadingEdit] = useState<boolean>(false);
  const [isErrorEdit, setIsErrorEdit] = useState<boolean>(false);
  const [isRedirect, isSetRedirect] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();

  const data = { problem, time, date, type, phone };

  const onGetState = (values: IEditAppointmentData) => {
    onChangeAppointment(values);
  };

  const onChangeAppointment = async (data: IEditAppointmentData) => {
    try {
      setIsLoadingEdit(true);
      const response = await axios.patch<IChangeAppointmentResponse>("/appointment/change", data);
      onShowMessage();
      onStartTimer();
    } catch (error) {
      setIsErrorEdit(true);
    } finally {
      setIsLoadingEdit(false);
    }
  };

  const onShowMessage = () => {
    messageApi.open({
      type: "success",
      content: "Заявление было изменено успешно",
    });
  };

  const onStartTimer = () => {
    setTimeout(() => {
      console.log("timer");
      isSetRedirect(true);
    }, 3000);
  };

  if (isRedirect) {
    return (
      <>
        <Navigate to={PrivetRoutesNames.APPOINTMENT} />
      </>
    );
  }

  return (
    <>
      {contextHolder}
      <Header title="Редактирование" />
      <Layout internal={{ paddingTop: 50 }}>
        <VisitForm isLoadingEdit={isLoadingEdit} isErrorEdit={isErrorEdit} onGetState={onGetState} state={data} status={status} edit={true} />
      </Layout>
    </>
  );
};
