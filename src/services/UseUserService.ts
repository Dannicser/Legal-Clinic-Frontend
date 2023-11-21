import { AxiosError } from "axios";
import axios from "../config/axios";
import { IEditProfileState, IResponseGetUser, IResponseUpdateUser, IUserProfile } from "../types/user";

export const UseUserService = () => {
  const onGetUser = async () => {
    const response = await axios
      .get<IResponseGetUser>("/user/get-user")
      .then(({ data }) => data)
      .catch((error: AxiosError<IResponseGetUser>) => {
        return {
          data: null,
          status: error.response?.data.status || 500,
          error: error.response?.data.error || null,
          message: error.response?.data.message || "",
        };
      });

    return response;
  };

  const onUpdateUser = async (data: IEditProfileState) => {
    const response = await axios
      .patch<IResponseUpdateUser>("/user/update-user", data)
      .then(({ data }) => data)
      .catch((error: AxiosError<IResponseUpdateUser>) => {
        return {
          data: null,
          status: error.response?.data.status || 500,
          error: error.response?.data.error || null,
          message: error.response?.data.message || "",
        };
      });

    return response;
  };

  return { onGetUser, onUpdateUser };
};
