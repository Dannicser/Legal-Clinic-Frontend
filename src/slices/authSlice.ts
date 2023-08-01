import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UseAuthService } from "../services/UseAuthService";
import { IAuth, IRecover, IRegister, IRegisterError, IResponseWithEmail } from "../types/auth";
import { onGetErrorMessage } from "../utils/error/auth";
import { onShowNotice } from "./notificationSlice";
import { IUserAuthParams } from "../types/auth";

interface IState {
  isAuth: boolean;
  isCheckingAuth: boolean;
  status: string;
  message: string;
}

const initialState: IState = {
  isAuth: false,
  isCheckingAuth: false,
  status: "pending",
  message: "",
};

export const onGetAuth = createAsyncThunk("onGetAuth/get", async (data: IAuth, { dispatch }) => {
  const { onGetAuthWithEmail } = UseAuthService();

  return onGetAuthWithEmail(data).then(() =>
    dispatch(
      onShowNotice({
        status: "show",
        type: "info",
        message: `Доброго времени суток!`,
        description: "",
        duration: 3,
        placement: "topRight",
      })
    )
  );
});

export const onGetRegister = createAsyncThunk("onGetRegister/register", async (userdata: IRegister, { dispatch }) => {
  const { onGetRegisterWithEmail, onAddUserToDataBase } = UseAuthService();

  const response = onGetRegisterWithEmail(userdata);

  return response
    .then((data: IResponseWithEmail) => {
      const user: IUserAuthParams = {
        name: userdata.name,
        email: data.email,
        userId: data.localId,
        photo: "",
        about: "",
        appointment: {},
      };

      return user;
    })
    .then((user: IUserAuthParams) => {
      const response = onAddUserToDataBase(user);

      return user;
    })
    .then((user: IUserAuthParams) =>
      dispatch(
        onShowNotice({
          status: "show",
          type: "info",
          message: `Здравствуйте, ${user.name}`,
          description: "Спасибо, что вы выбрали нас!",
          duration: 7,
          placement: "topRight",
        })
      )
    );
});

export const onGetRegisterWithGoogle = createAsyncThunk("onGetRegisterWithGoogle/get", async (_, { dispatch }) => {
  const { onGetAuthWithGoogle, onAddUserToDataBase } = UseAuthService();

  const response = onGetAuthWithGoogle();

  return response
    .then((user: any) => {
      const response = onAddUserToDataBase(user);
      return user;
    })
    .then((user) => {
      dispatch(
        onShowNotice({
          status: "show",
          type: "warning",
          message: "Вы вошли в аккаунт с помощью Google",
          description: "При необходимости вы можете изменить ваши данные в профиле",
          duration: 6,
          placement: "topRight",
        })
      );
      return user;
    })
    .then((user) => {
      dispatch(
        onShowNotice({
          status: "show",
          type: "info",
          message: `Здравствуйте, ${user?.name}`,
          description: "Как ваше настроение?",
          duration: 5,
          placement: "topRight",
        })
      );
      return user;
    });
});

export const onGetRecover = createAsyncThunk("onGetRecover/get", async (data: IRecover) => {
  const { onGetRecoveryWithEmail } = UseAuthService();

  return onGetRecoveryWithEmail(data);
});

export const onGetCheckAuth = createAsyncThunk("onGetCheckAuth/get", async () => {
  const { onCheckAuth } = UseAuthService();

  return onCheckAuth();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onResetErrors: (state) => {
      state.status = "pending";
      state.message = "";
    },
    onLogout: (state) => {
      state.isAuth = false;
    },
  },
  extraReducers: (builder) => {
    builder
      //AUTH
      .addCase(onGetAuth.pending, (state) => {
        state.status = "loading";
        state.message = "";
      })
      .addCase(onGetAuth.fulfilled, (state) => {
        state.isAuth = true;
        state.status = "successful";
        state.message = "";
      })
      .addCase(onGetAuth.rejected, (state, data: any) => {
        const info: IRegisterError = JSON.parse(data.error.message);

        state.status = "error";
        state.message = onGetErrorMessage(info.message);
      })
      //REGISTER
      .addCase(onGetRegister.pending, (state) => {
        state.status = "loading";
        state.message = "";
      })
      .addCase(onGetRegister.fulfilled, (state) => {
        state.isAuth = true;
        state.status = "successful";
        state.message = "";
      })
      .addCase(onGetRegister.rejected, (state, data: any) => {
        const info: IRegisterError = JSON.parse(data.error.message);

        state.status = "error";
        state.message = onGetErrorMessage(info.message);
      })
      //RECOVERY
      .addCase(onGetRecover.pending, (state) => {
        state.status = "loading";
        state.message = "";
      })
      .addCase(onGetRecover.fulfilled, (state) => {
        state.status = "successful";
        state.message = "";
      })
      .addCase(onGetRecover.rejected, (state, data: any) => {
        const info: IRegisterError = JSON.parse(data.error.message);

        state.status = "error";
        state.message = onGetErrorMessage(info.message);
      })
      //REGISTER WITH GOOGLE
      .addCase(onGetRegisterWithGoogle.pending, (state) => {
        state.message = "";
        state.status = "loading";
      })
      .addCase(onGetRegisterWithGoogle.fulfilled, (state) => {
        state.status = "successful";
        state.isAuth = true;
      })
      .addCase(onGetRegisterWithGoogle.rejected, (state) => {
        state.status = "error";
        state.message = "Произошла непредвиденная ошибка. Используйте другой оператор регистрации";
      })
      //CHECK AUTH
      .addCase(onGetCheckAuth.pending, (state) => {
        state.isCheckingAuth = true;
      })
      .addCase(onGetCheckAuth.fulfilled, (state) => {
        state.isCheckingAuth = false;
        state.isAuth = true;
      })
      .addCase(onGetCheckAuth.rejected, (state) => {
        state.isCheckingAuth = false;
        state.isAuth = false;
      })
      .addDefaultCase(() => {});
  },
});

export const { onResetErrors, onLogout } = authSlice.actions;
export default authSlice.reducer;
