import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UseAuthService } from "../services/UseAuthService";
import { IAuth, IRecover, IRegister, IRegisterError } from "../types/auth";
import { onGetErrorMessage } from "../utils/error/auth";
import { onShowNotice } from "./notificationSlice";

interface IState {
  isAuth: boolean;
  status: string;
  message: string;
}

const initialState: IState = {
  isAuth: false,
  status: "pending",
  message: "",
};

export const onGetAuth = createAsyncThunk("auth/get", async (data: IAuth, { dispatch }) => {
  const { onGetAuthWithEmail } = UseAuthService();

  return onGetAuthWithEmail(data).then(() =>
    dispatch(
      onShowNotice({
        status: "show",
        type: "info",
        message: "Здравствуйте, Даниил Александрович",
        description: "Как ваше самочувствие?",
        duration: 3,
        placement: "topRight",
      })
    )
  );
});

export const onGetRegister = createAsyncThunk("register/get", async (data: IRegister, { dispatch }) => {
  const { onGetRegister } = UseAuthService();

  return onGetRegister(data).then(() =>
    dispatch(
      onShowNotice({
        status: "show",
        type: "info",
        message: "Здравствуйте, Даниил Александрович",
        description: "Спасибо что вы выбрали нас!",
        duration: 7,
        placement: "topRight",
      })
    )
  );
});

export const onGetRecover = createAsyncThunk("recover/get", async (data: IRecover) => {
  const { onGetRecovery } = UseAuthService();

  return onGetRecovery(data);
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
    onConfirmAuth: (state) => {
      state.isAuth = true;
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
      .addDefaultCase(() => {});
  },
});

export const { onResetErrors, onLogout, onConfirmAuth } = authSlice.actions;
export default authSlice.reducer;
