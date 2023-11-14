import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { UseAppointmentService } from "../services/UseAppointmentService";

import dayjs from "dayjs";
import "dayjs/locale/ru";

import {
  IGetApointmentInfoResponse,
  IRegisterApointmentData,
  IRegisterApointmentResponse,
  IRemoveAppointmentResponse,
  Status,
} from "../types/appointment";

export interface IStateData {
  problem: string;
  type: string;
  status: Status;
  id: string;
  time: string;
  date: string;
  formatDate?: string;
  phone: string;
  createdAt: string;
}

interface IState {
  data: IStateData;
  message: string;
  isLoading: boolean;
  isError: boolean;
  isReserved: boolean;
}

const initialState: IState = {
  data: {
    problem: "",
    type: "",
    status: "none",
    phone: "",
    time: "",
    date: "",
    formatDate: "",
    id: "",
    createdAt: "",
  },
  message: "",
  isLoading: false,
  isError: false,
  isReserved: false,
};

export const thunkGetStatusAppointment = createAsyncThunk<IGetApointmentInfoResponse>(
  "thunkGetStatusAppointment/get",
  async (_, { rejectWithValue }) => {
    const { onGetStatusAppointment } = UseAppointmentService();

    const response = await onGetStatusAppointment();

    if (response.status >= 400) {
      return rejectWithValue(response);
    }

    return response as IGetApointmentInfoResponse;
  }
);

export const thunkGetRegisterAppointment = createAsyncThunk<IRegisterApointmentResponse, IRegisterApointmentData>(
  "thunkGetRegisterAppointment/post",
  async (data, { rejectWithValue }) => {
    const { onGetRegisterAppointment } = UseAppointmentService();

    const response = await onGetRegisterAppointment(data);

    if (response.status >= 400) {
      return rejectWithValue(response);
    }

    return response as IRegisterApointmentResponse;
  }
);

export const thunkRemoveAppointment = createAsyncThunk<IRemoveAppointmentResponse>("thunkRemoveAppointment/get", async (_, { rejectWithValue }) => {
  const { onRemoveAppointment } = UseAppointmentService();

  const response = await onRemoveAppointment();

  if (response.status >= 400) {
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
        if (action.payload.data.status !== "none") {
          state.data.formatDate = `${dayjs(action.payload.data.date).locale("ru").format("D MMMM")} в ${action.payload.data.time}`;
        }
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
        if (action.payload.data.isReserved) {
          state.isReserved = true;
        } else {
          state.isReserved = false;
          state.data.status = "accepted";
        }
        state.message = action.payload.message;
        state.data.problem = action.payload.data.doc.problem;
        state.data.phone = action.payload.data.doc.phone;
        state.data.type = action.payload.data.doc.type;
        //
        state.data.time = action.payload.data.doc.time;
        state.data.date = action.payload.data.doc.date;
        state.isLoading = false;
      })
      .addCase(thunkGetRegisterAppointment.rejected, (state) => {
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
        state.message = "Произошла непредвиденная ошибка при удалении записи";
        state.data.status = "error";
        state.isError = true;
      });
  },
});

export default appointmentSlice.reducer;
export const {} = appointmentSlice.actions;
