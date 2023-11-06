import { AxiosError, AxiosResponse } from "axios";
import axios from "../config/axios";

import { IGetApointmentStatusResponse, IRegisterApointmentData } from "../types/appointment";

export const UseAppointmentService = () => {
  const onGetStatusAppointment = async () => {
    const response = await axios
      .get<IGetApointmentStatusResponse>("/appointment/get-info")
      .then(({ data }) => data)
      .catch((error: AxiosError<IGetApointmentStatusResponse>) => {
        console.log(error);
        return { message: error.response?.data.message, status: "error" };
      });

    return response;
  };

  const onGetRegisterAppointment = async (data: IRegisterApointmentData) => {
    const response = await axios
      .post<IGetApointmentStatusResponse>("/appointment/register", data)
      .then(({ data }) => data)
      .catch((error: AxiosError<IGetApointmentStatusResponse>) => {
        console.log(error);
        return { message: error.response?.data.message, status: "error" };
      });

    return response;
  };

  return { onGetStatusAppointment, onGetRegisterAppointment };
};
