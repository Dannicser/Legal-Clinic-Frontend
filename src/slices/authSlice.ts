import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UseAuthService } from "../services/UseAuthService";
import {
  IAuthValues,
  IRegisterValues,
  IResponseAuthWithYandexGetData,
  IResponseAuthWithYandexGetToken,
  IUserResponseRegisterWithEmail,
} from "../types/auth";
import { onShowAlert } from "./alertSlice";
import { UseLocalStorage } from "../hooks/useLocalStorage";
import { onFetchUser, onPreAuthWithYandex } from "./userSlice";

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

export const thunkAuthWithEmail = createAsyncThunk("onGetAuth/get", async (data: IAuthValues, { dispatch }) => {
  const { onGetAuthWithEmail } = UseAuthService();

  return onGetAuthWithEmail(data).then((data) => {
    dispatch(
      onShowAlert({
        status: "show",
        type: "info",
        message: `Доброго времени суток, ${data.user.first_name}!`,
        description: "",
        duration: 3,
        placement: "topRight",
      })
    );

    return data;
  });
});

export const thunkRegisterWithEmail = createAsyncThunk("thunkRegisterWithEmail/register", async (userdata: IRegisterValues, { dispatch }) => {
  const { onGetRegisterWithEmail } = UseAuthService();

  const response = await onGetRegisterWithEmail(userdata);

  return response;
});

export const thunkLogoutWithEmail = createAsyncThunk("thunkLogoutWithEmail/logout", async (_, { dispatch }) => {
  const { onLogoutWithEmail } = UseAuthService();

  return onLogoutWithEmail()
    .then(() => {
      UseLocalStorage({ key: "accessToken", action: "remove" });
      sessionStorage.removeItem("accessToken");

      dispatch({ type: "REVERT_ALL" });
    })
    .catch(() => {
      dispatch(
        onShowAlert({
          status: "show",
          type: "error",
          message: `Произошла ошибка при закрытии сессии`,
          description: "Попробуйте позже",
          duration: 5,
          placement: "topRight",
        })
      );
    });
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

    const response = await onGetTokenWithYandex(code);

    if (response.error) {
      return rejectWithValue({ message: "Не удалось получить токен из Yandex" });
    }

    const { default_email, error, psuid, last_name, first_name } = (await onGetDataFromYandex(
      response.access_token || ""
    )) as IResponseAuthWithYandexGetData;

    if (error) {
      return rejectWithValue({ message: "Не удалось получить данные из Yandex" });
    }

    const status = await onGetUserRegisterStatus({ email: default_email });

    if (!status.data) {
      dispatch(onPreAuthWithYandex({ first_name, last_name, email: default_email }));

      return { first_name, last_name, status: status.data, psuid } as IResponseAuthWithYandexGetData;
    } else {
      dispatch(thunkAuthWithEmail({ email: default_email, password: psuid }));

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
        state.message = "";
      })
      .addCase(thunkAuthWithEmail.fulfilled, (state) => {
        state.isAuth = true;
        state.isLoading = false;
        state.message = "";
      })
      .addCase(thunkAuthWithEmail.rejected, (state, payload) => {
        state.isLoading = false;
        state.isError = true;
        state.message = "Непредвиденная ошибка";
      })
      //REGISTER WITH EMAIL
      .addCase(thunkRegisterWithEmail.pending, (state) => {
        state.isLoading = true;
        state.message = "";
      })
      .addCase(thunkRegisterWithEmail.fulfilled, (state) => {
        state.isAuth = true;
        state.isLoading = false;
        state.message = "";
      })
      .addCase(thunkRegisterWithEmail.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
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
      .addCase(thunkLogoutWithEmail.fulfilled, (state) => {
        state.isAuth = false;
        state.isConfirming = false;
      });
  },
});

export const { onResetErrors, onCloseConfirmingModal } = authSlice.actions;
export default authSlice.reducer;
