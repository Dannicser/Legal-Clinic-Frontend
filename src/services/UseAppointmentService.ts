import { AxiosError } from "axios";
import axios from "../config/axios";

import {
  IChangeAppointmentResponse,
  IEditAppointmentData,
  IGetApointmentInfoResponse,
  IRegisterApointmentData,
  IRegisterApointmentResponse,
  IRemoveAppointmentResponse,
} from "../types/appointment";

export const UseAppointmentService = () => {
  const onGetStatusAppointment = async () => {
    const response = await axios
      .get<IGetApointmentInfoResponse>("/appointment/get-info")
      .then(({ data }) => data)
      .catch((error: AxiosError<IGetApointmentInfoResponse>) => {
        console.log(error);
        return { message: error.response?.data.message || "", status: error.response?.data.status || 500 };
      });

    return response;
  };

  const onGetRegisterAppointment = async (data: IRegisterApointmentData) => {
    const response = await axios
      .post<IRegisterApointmentResponse>("/appointment/register", data)
      .then(({ data }) => {
        return data;
      })
      .catch((error: AxiosError<IRegisterApointmentResponse>) => {
        console.log(error);
        return { message: "", status: 500 };
      });

    return response;
  };

  const onRemoveAppointment = async () => {
    const response = await axios
      .delete<IRemoveAppointmentResponse>("/appointment/delete")
      .then(({ data }) => data)
      .catch((error: AxiosError<IRemoveAppointmentResponse>) => {
        console.log(error);
        return { message: error.response?.data.message || "", status: error.response?.data.status || 500 };
      });

    return response;
  };

  const onEditAppointment = async (data: IEditAppointmentData) => {
    const response = await axios
      .patch<IChangeAppointmentResponse>("/appointment/change", data)
      .then(({ data }) => data)
      .catch((error: AxiosError<IChangeAppointmentResponse>) => {
        console.log(error);
        return { message: error.response?.data.message || "", status: error.response?.data.status || 500 };
      });

    return response;
  };

  return { onGetStatusAppointment, onGetRegisterAppointment, onRemoveAppointment, onEditAppointment };
};
