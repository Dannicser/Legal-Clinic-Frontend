import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UseAuthService } from "../services/UseAuthService";
import { IAuth } from "../types/auth";
import { onGetErrorMessage } from "../utils/error/auth";

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

export const onGetAuth = createAsyncThunk("auth/get", async (data: IAuth) => {
  const { onGetAuthWithEmail } = UseAuthService();

  return onGetAuthWithEmail(data);
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(onGetAuth.pending, (state) => {
        state.status = "loading";
        state.message = "";
      })
      .addCase(onGetAuth.fulfilled, (state) => {
        state.isAuth = true;
        state.status = "successful";
        state.message = "";
      })
      .addCase(onGetAuth.rejected, (state) => {
        state.status = "error";
        state.message = "Неверный логин или пароль";
      })
      .addDefaultCase(() => {});
  },
});

export const {} = authSlice.actions;
export default authSlice.reducer;
