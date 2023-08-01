import axios from "../config/axios";
import { IEditProfileState } from "../types/user";

export const UseUserService = () => {
  const onGetUser = async () => {
    const response = await axios.get("/user/get-user");

    return response.data;
  };

  const onUpdateUser = async (data: IEditProfileState) => {
    const response = await axios.patch("/user/update-user", data);

    return response.data;
  };

  return { onGetUser, onUpdateUser };
};
