import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { UseUserService } from "../services/UseUserService";
import { IEditProfileState, IUserProfile } from "../types/user";
import { onShowNotice } from "./notificationSlice";
import { IUserResponseRegisterWithEmail } from "../types/auth";

interface IState {
  user: IUserProfile;
  loading: boolean;
  error: boolean;
  message: string;
}

const initialState: IState = {
  user: {
    first_name: "",
    last_name: "",
    email: "",
    about: "",
    photo: "",
    createdAt: "",
    is_admin: false,
    _id: "",
  },
  loading: false,
  error: false,
  message: "",
};

export const thunkGetUserInfo = createAsyncThunk("onGetUserInfo/get", async () => {
  const { onGetUser } = UseUserService();

  const response = onGetUser();

  return response;
});

export const thunkUpdateUserInfo = createAsyncThunk("onUpdateUserInfo/get", async (data: IEditProfileState, { dispatch }) => {
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
  reducers: {
    onFetchUser: (state, action: PayloadAction<IUserResponseRegisterWithEmail>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //get
      .addCase(thunkGetUserInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(thunkGetUserInfo.fulfilled, (state, action: PayloadAction<IUserProfile>) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(thunkGetUserInfo.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      //update
      .addCase(thunkUpdateUserInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(thunkUpdateUserInfo.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(thunkUpdateUserInfo.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { onFetchUser } = userSlice.actions;

export default userSlice.reducer;
