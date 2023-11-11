import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  IGetApointmentInfoResponse,
  IRegisterApointmentData,
  IRegisterApointmentDataResponse,
  IRemoveAppointmentResponse,
  Status,
} from "../types/appointment";

import { UseAppointmentService } from "../services/UseAppointmentService";

import dayjs from "dayjs";
import "dayjs/locale/ru";

export interface IStateData {
  problem: string;
  type: string;
  status: Status;
  id: string;
  time: string;
  date: string;
  phone: string;
  createdAt: string;
}

interface IState {
  data: IStateData;
  message: string;
  isLoading: boolean;
  isError: boolean;
}

const initialState: IState = {
  data: {
    problem: "",
    type: "",
    status: "none",
    phone: "",
    time: "",
    date: "",
    id: "",
    createdAt: "",
  },
  message: "",
  isLoading: false,
  isError: false,
};

export const thunkGetStatusAppointment = createAsyncThunk<IGetApointmentInfoResponse>(
  "thunkGetStatusAppointment/get",
  async (_, { rejectWithValue }) => {
    const { onGetStatusAppointment } = UseAppointmentService();

    const response = await onGetStatusAppointment();

    if (response.status === "error") {
      return rejectWithValue(response);
    }

    return response as IGetApointmentInfoResponse;
  }
);

export const thunkGetRegisterAppointment = createAsyncThunk<IRegisterApointmentDataResponse, IRegisterApointmentData>(
  "thunkGetRegisterAppointment/post",
  async (data, { rejectWithValue }) => {
    const { onGetRegisterAppointment } = UseAppointmentService();

    const response = await onGetRegisterAppointment(data);

    if (response.status === "error") {
      return rejectWithValue(response);
    }

    return response as IRegisterApointmentDataResponse;
  }
);

export const thunkRemoveAppointment = createAsyncThunk<IRemoveAppointmentResponse>("thunkRemoveAppointment/get", async (_, { rejectWithValue }) => {
  const { onRemoveAppointment } = UseAppointmentService();

  const response = await onRemoveAppointment();

  if (response.status === "error") {
    return rejectWithValue(response);
  }

  return response as IRemoveAppointmentResponse;
});

const appointmentSlice = createSlice({
  initialState,
  name: "appointment",
  reducers: {},
  extraReducers(builder) {
    builder
      //get status
      .addCase(thunkGetStatusAppointment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(thunkGetStatusAppointment.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.message = action.payload.message;
        state.isLoading = false;
      })
      .addCase(thunkGetStatusAppointment.rejected, (state, action: any) => {
        state.data.status = "error";
        state.message = "";
        state.isLoading = false;
      })
      //register
      .addCase(thunkGetRegisterAppointment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(thunkGetRegisterAppointment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data.status = "accepted";
      })
      .addCase(thunkGetRegisterAppointment.rejected, (state, action: any) => {
        state.data.status = "error";
        state.message = "";
        state.isLoading = false;
        state.isError = true;
      })
      //remove
      .addCase(thunkRemoveAppointment.pending, (state) => {})
      .addCase(thunkRemoveAppointment.fulfilled, (state, action) => {
        state.data.status = "none";
      })
      .addCase(thunkRemoveAppointment.rejected, (state, action) => {
        state.message = "Произошла непредвиденная ошибка";
        state.data.status = "error";
      });
  },
});

export default appointmentSlice.reducer;
export const {} = appointmentSlice.actions;
