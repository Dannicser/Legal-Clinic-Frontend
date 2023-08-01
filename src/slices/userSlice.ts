import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { UseUserService } from "../services/UseUserService";
import { IEditProfileState, IGetUserPayload, IUserProfile } from "../types/user";
import { onShowNotice } from "./notificationSlice";

interface IState {
  user: IUserProfile;
  loading: boolean;
  error: boolean;
  message: string;
}

const initialState: IState = {
  user: {
    name: "",
    email: "",
    photo: "",
    createdAt: "",
    about: "",
  },
  loading: false,
  error: false,
  message: "",
};

export const onGetUserInfo = createAsyncThunk("onGetUserInfo/get", async () => {
  const { onGetUser } = UseUserService();

  const response = onGetUser();

  return response;
});

export const onUpdateUserInfo = createAsyncThunk("onUpdateUserInfo/get", async (data: IEditProfileState, { dispatch }) => {
  const { onUpdateUser } = UseUserService();

  const response = onUpdateUser(data);

  return response
    .then(() => {
      dispatch(
        onShowNotice({
          status: "show",
          type: "success",
          message: "Данные были успешно обновлены",
          duration: 3,
          placement: "topRight",
        })
      );
    })
    .catch((error) => {
      console.log(error);
      dispatch(
        onShowNotice({
          status: "show",
          type: "error",
          message: "Ошибка, данные пользователя не были обновлены",
          duration: 3,
          placement: "topRight",
        })
      );
    });
});

const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(onGetUserInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(onGetUserInfo.fulfilled, (state, action: PayloadAction<IGetUserPayload>) => {
        state.user = action.payload.data;
        state.loading = false;
      })
      .addCase(onGetUserInfo.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export default userSlice.reducer;
