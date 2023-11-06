import axios from "../config/axios";
import { IEditProfileState, IResponseUpdateUser, IUserProfile } from "../types/user";

export const UseUserService = () => {
  const onGetUser = async () => {
    const response = await axios.get<IUserProfile>("/user/get-user");

    return response.data;
  };

  const onUpdateUser = async (data: IEditProfileState) => {
    const response = await axios.patch<IResponseUpdateUser>("/user/update-user", data);

    return response.data;
  };

  return { onGetUser, onUpdateUser };
};
