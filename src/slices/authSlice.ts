import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UseAuthService } from "../services/UseAuthService";
import { IAuthValues, IRegisterValues, IUserResponseRegisterWithEmail } from "../types/auth";
import { onShowNotice } from "./notificationSlice";
import { UseLocalStorage } from "../hooks/useLocalStorage";
import { onFetchUser } from "./userSlice";

interface IState {
  isAuth: boolean;
  isCheckingAuth: boolean;
  isLoading: boolean;
  isError: boolean;
  message: string;
}

const initialState: IState = {
  isAuth: false,
  isCheckingAuth: false,
  isLoading: false,
  isError: false,
  message: "",
};

export const thunkAuthWithEmail = createAsyncThunk("onGetAuth/get", async (data: IAuthValues, { dispatch }) => {
  const { onGetAuthWithEmail } = UseAuthService();

  return onGetAuthWithEmail(data).then((data) => {
    dispatch(
      onShowNotice({
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
    })
    .catch(() => {
      dispatch(
        onShowNotice({
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

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onResetErrors: (state) => {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      //AUTH
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
        state.message = "Неверный логин или пароль";
      })
      //REGISTER
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
      });
  },
});

export const { onResetErrors } = authSlice.actions;
export default authSlice.reducer;
