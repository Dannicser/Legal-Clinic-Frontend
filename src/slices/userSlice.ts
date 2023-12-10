import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { onShowAlert } from "./alertSlice";
import { UseUserService } from "../services/UseUserService";

import { IEditProfileState, IResponseGetUser, IResponseUpdateUser, IUserProfile } from "../types/user";
import { IPreAuthWithYandex, IUserResponseRegisterWithEmail } from "../types/auth";

interface IState {
  user: IUserProfile;
  isLoading: boolean;
  isError: boolean;
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
  isLoading: false,
  isError: false,
  message: "",
};

export const thunkGetUserInfo = createAsyncThunk<IResponseGetUser>("onGetUserInfo/get", async (_, { rejectWithValue }) => {
  const { onGetUser } = UseUserService();

  const response = await onGetUser();

  if (response.status >= 400) {
    return rejectWithValue(response);
  }

  return response as IResponseGetUser;
});

export const thunkUpdateUserInfo = createAsyncThunk<IResponseUpdateUser, IEditProfileState>(
  "onUpdateUserInfo/get",
  async (data, { dispatch, rejectWithValue }) => {
    const { onUpdateUser } = UseUserService();

    const response = await onUpdateUser(data).then((data) => {
      if (data.status >= 400) {
        dispatch(
          onShowAlert({
            status: "show",
            type: "error",
            message: `Ошибка, данные пользователя не были обновлены. ${data.message}. Код ошибки: ${data.status}`,
            duration: 5,
            placement: "topRight",
          })
        );

        return rejectWithValue(data);
      }

      dispatch(
        onShowAlert({
          status: "show",
          type: "success",
          message: "Данные были успешно обновлены",
          duration: 3,
          placement: "topRight",
        })
      );

      return data as IResponseUpdateUser;
    });

    return response;
  }
);

const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    onFetchUser: (state, action: PayloadAction<IUserResponseRegisterWithEmail>) => {
      state.user = action.payload;
    },
    onPreAuthWithYandex: (state, action: PayloadAction<IPreAuthWithYandex>) => {
      state.user.email = action.payload.email || "";
      state.user.first_name = action.payload.first_name;
      state.user.last_name = action.payload.last_name;
    },
  },
  extraReducers: (builder) => {
    builder
      //get
      .addCase(thunkGetUserInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(thunkGetUserInfo.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.isLoading = false;
      })
      .addCase(thunkGetUserInfo.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      })
      //update
      .addCase(thunkUpdateUserInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(thunkUpdateUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user.first_name = action.payload.data.first_name;
        state.user.last_name = action.payload.data.last_name;
        state.user.about = action.payload.data.about;
      })
      .addCase(thunkUpdateUserInfo.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { onFetchUser, onPreAuthWithYandex } = userSlice.actions;

export default userSlice.reducer;
