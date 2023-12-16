import { onFetchUser, onPreAuthWithYandex } from "./userSlice";
import { onShowAlert } from "./alertSlice";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UseAuthService } from "../services/UseAuthService";

import {
  IAuthValues,
  IRegisterValues,
  IResponseAuthWithEmail,
  IResponseAuthWithYandexGetData,
  IResponseLogoutAuth,
  IResponseRegisterWithEmail,
} from "../types/auth";

interface IState {
  isAuth: boolean;
  isCheckingAuth: boolean;
  isLoading: boolean;
  isError: boolean;
  isConfirming: boolean;
  psuid: string;
  message: string;
}

const initialState: IState = {
  isAuth: false,
  isCheckingAuth: false,
  isLoading: false,
  isError: false,
  isConfirming: false,
  psuid: "",
  message: "",
};

export const thunkAuthWithEmail = createAsyncThunk<IResponseAuthWithEmail, IAuthValues>(
  "onGetAuth/get",
  async (data, { dispatch, rejectWithValue }) => {
    const { onGetAuthWithEmail } = UseAuthService();

    const response = await onGetAuthWithEmail(data);

    if (response.status >= 400) {
      return rejectWithValue(response);
    }

    dispatch(
      onShowAlert({
        status: "show",
        type: "info",
        message: `Доброго времени суток!`,
        description: "",
        duration: 3,
        placement: "topRight",
      })
    );

    return response as IResponseAuthWithEmail;
  }
);

export const thunkRegisterWithEmail = createAsyncThunk<IResponseRegisterWithEmail, IRegisterValues>(
  "thunkRegisterWithEmail/register",
  async (userdata, { dispatch, rejectWithValue }) => {
    const { onGetRegisterWithEmail } = UseAuthService();

    const response = await onGetRegisterWithEmail(userdata);

    if (response.status >= 400) {
      return rejectWithValue(response);
    }

    dispatch(
      onShowAlert({
        status: "show",
        type: "info",
        message: `Доброго времени суток. Спасибо, что выбрали нас!`,
        description: "",
        duration: 3,
        placement: "topRight",
      })
    );

    return response as IResponseRegisterWithEmail;
  }
);

export const thunkLogoutWithEmail = createAsyncThunk<IResponseLogoutAuth>("thunkLogoutWithEmail/logout", async (_, { rejectWithValue }) => {
  const { onLogoutWithEmail } = UseAuthService();

  const response = await onLogoutWithEmail();

  if (response.status >= 400) {
    return rejectWithValue(response);
  }

  return response as IResponseLogoutAuth;
});

export const thunkCheckAuth = createAsyncThunk("onCheckAuth/get", async (_, { dispatch }) => {
  const { onCheckAuth } = UseAuthService();

  const response = onCheckAuth();

  return response.then((data) => {
    dispatch(onFetchUser(data.user));

    return data;
  });
});

export const thunkAuthWithYandex = createAsyncThunk<IResponseAuthWithYandexGetData, string>(
  "thunkAuthWithYandex/get",
  async (code, { rejectWithValue, dispatch }) => {
    const { onGetTokenWithYandex, onGetDataFromYandex, onGetUserRegisterStatus } = UseAuthService();

    const tokens = await onGetTokenWithYandex(code);

    if (tokens.error) {
      return rejectWithValue({ message: "Не удалось получить токен из Yandex" });
    }

    const { default_email, error, psuid, last_name, first_name } = (await onGetDataFromYandex(
      tokens.access_token || ""
    )) as IResponseAuthWithYandexGetData;

    if (error) {
      return rejectWithValue({ message: "Не удалось получить данные из Yandex" });
    }

    const status = await onGetUserRegisterStatus({ email: default_email });

    if (!status.data) {
      dispatch(onPreAuthWithYandex({ first_name, last_name, email: default_email }));

      return { first_name, last_name, status: status.data, psuid } as IResponseAuthWithYandexGetData;
    } else {
      dispatch(thunkAuthWithEmail({ email: default_email, password: psuid, remember: true }));

      return { first_name, last_name, status: status.data } as IResponseAuthWithYandexGetData;
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onResetErrors: (state) => {
      state.message = "";
      state.isError = false;
    },
    onCloseConfirmingModal: (state) => {
      state.isConfirming = false;
    },
  },
  extraReducers: (builder) => {
    builder
      //AUTH WITH EMAIL
      .addCase(thunkAuthWithEmail.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })
      .addCase(thunkAuthWithEmail.fulfilled, (state) => {
        state.isAuth = true;
        state.isLoading = false;
        state.message = "";
      })
      .addCase(thunkAuthWithEmail.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        console.log(action.payload.message);
        state.message = action.payload.message;
      })
      //REGISTER WITH EMAIL
      .addCase(thunkRegisterWithEmail.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })
      .addCase(thunkRegisterWithEmail.fulfilled, (state) => {
        state.isAuth = true;
        state.isLoading = false;
        state.message = "";
      })
      .addCase(thunkRegisterWithEmail.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
      })
      //REGISTER WITH YANDEX
      .addCase(thunkAuthWithYandex.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(thunkAuthWithYandex.fulfilled, (state, action) => {
        if (!action.payload.status) {
          state.isConfirming = true;
          state.psuid = action.payload.psuid;
        }
        state.isLoading = false;
      })
      .addCase(thunkAuthWithYandex.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message || "Непредвиденная ошибка";
      })
      //CHECKING
      .addCase(thunkCheckAuth.pending, (state) => {
        state.isCheckingAuth = true;
      })
      .addCase(thunkCheckAuth.fulfilled, (state) => {
        state.isAuth = true;
        state.isCheckingAuth = false;
      })
      .addCase(thunkCheckAuth.rejected, (state) => {
        state.isError = true;
        state.isCheckingAuth = false;
        state.message = "Доступ к профилю не был получен";
        state.isAuth = false;
      })
      //LOGOUT
      .addCase(thunkLogoutWithEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(thunkLogoutWithEmail.fulfilled, (state) => {
        state.isAuth = false;
        state.isConfirming = false;
        state.isLoading = false;
      })
      .addCase(thunkLogoutWithEmail.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.message = "Произошла непредвиденная ошибка при закрытии сессии. Попробуйте позже.";
      });
  },
});

export const { onResetErrors, onCloseConfirmingModal } = authSlice.actions;
export default authSlice.reducer;
