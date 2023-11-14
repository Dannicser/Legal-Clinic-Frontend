import { useState } from "react";
import { useAppSelector } from "../../../../hooks/useAppSelector";

import axios from "../../../../config/axios";

import { Layout } from "../../../Layout/Layout";
import { Header } from "../../../UI/Header/Header";
import { VisitForm } from "../VisitForm/VisitForm";

import { message } from "antd";

import { IEditAppointmentData, IRegisterApointmentResponse } from "../../../../types/appointment";

interface IChangeAppointmentResponse extends IRegisterApointmentResponse {}

interface IMessageParams {
  type: "success" | "error";
  content: string;
}

export const VisitEdit: React.FC = () => {
  const { problem, status, time, date, type, phone } = useAppSelector((state) => state.appointment.data);
  const [isLoadingEdit, setIsLoadingEdit] = useState<boolean>(false);
  const [isErrorEdit, setIsErrorEdit] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();

  const data = { problem, time, date, type, phone };

  const onGetState = (values: IEditAppointmentData) => {
    onChangeAppointment(values);
  };

  const onChangeAppointment = async (data: IEditAppointmentData) => {
    try {
      setIsLoadingEdit(true);
      const res = await axios.patch<IChangeAppointmentResponse>("/appointment/change", data);

      if (res.data.data?.isReserved) {
        return onShowMessage({ type: "error", content: "Это время недоступно" });
      }

      onShowMessage({ type: "success", content: "Заявление было изменено успешно" });
    } catch (error) {
      console.log(error);

      setIsErrorEdit(true);
    } finally {
      setIsLoadingEdit(false);
    }
  };

  const onShowMessage = (params: IMessageParams) => {
    messageApi.open({
      type: params.type,
      content: params.content,
      duration: 3,
    });
  };

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
