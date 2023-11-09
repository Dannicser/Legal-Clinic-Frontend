import { AxiosError, AxiosResponse } from "axios";
import axios from "../config/axios";

import {
  IGetApointmentInfoResponse,
  IGetApointmentInfoResponseError,
  IRegisterApointmentData,
  IRegisterApointmentDataResponse,
  IRemoveAppointmentResponse,
} from "../types/appointment";

export const UseAppointmentService = () => {
  const onGetStatusAppointment = async () => {
    const response = await axios
      .get<IGetApointmentInfoResponse>("/appointment/get-info")
      .then(({ data }) => data)
      .catch((error: AxiosError<IGetApointmentInfoResponseError>) => {
        console.log(error);
        return { message: error.response?.data.message, status: "error" };
      });

    return response;
  };

  const onGetRegisterAppointment = async (data: IRegisterApointmentData) => {
    const response = await axios
      .post<IRegisterApointmentDataResponse>("/appointment/register", data)
      .then(({ data }) => data)
      .catch((error: AxiosError<IRegisterApointmentDataResponse>) => {
        console.log(error);
        return { message: error.response?.data.message, status: "error" };
      });

    return response;
  };

  const onRemoveAppointment = async () => {
    const response = await axios
      .delete<IRemoveAppointmentResponse>("/appointment/delete")
      .then(({ data }) => data)
      .catch((error: AxiosError<IRemoveAppointmentResponse>) => {
        console.log(error);
        return { message: error.response?.data.message, status: "error" };
      });

    return response;
  };

  return { onGetStatusAppointment, onGetRegisterAppointment, onRemoveAppointment };
};
