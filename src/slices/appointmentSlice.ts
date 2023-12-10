import { onShowAlert } from "./alertSlice";

import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { UseAppointmentService } from "../services/UseAppointmentService";

import "dayjs/locale/ru";

import {
  AppointmentStatus,
  IChangeAppointmentResponse,
  IChangeStatusAppointment,
  IEditAppointmentData,
  IGetApointmentInfoResponse,
  IRegisterApointmentData,
  IRegisterApointmentResponse,
  IRemoveAppointmentResponse,
  Status,
} from "../types/appointment";

import { onIsValidDate } from "../utils/helpers";

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

export const thunkEditAppointment = createAsyncThunk<IChangeAppointmentResponse, IEditAppointmentData>(
  "thunkEditAppointment/get",
  async (data, { rejectWithValue, dispatch }) => {
    const { onEditAppointment } = UseAppointmentService();

    const response = (await onEditAppointment(data)) as IChangeAppointmentResponse;

    if (response.status >= 400) {
      return rejectWithValue(response);
    }

    if (!response.data.isReserved) {
      dispatch(
        onShowAlert({
          status: "show",
          type: "info",
          message: "Заявление было успешно изменено",
          description: "",
          duration: 2,
          placement: "topRight",
        })
      );
    }

    return response as IChangeAppointmentResponse;
  }
);

const appointmentSlice = createSlice({
  initialState,
  name: "appointment",
  reducers: {
    onChangeStatusAppointment: (state, action: PayloadAction<IChangeStatusAppointment>) => {
      state.data.status = action.payload.status;
      state.message = action.payload.message;
    },
  },
  extraReducers(builder) {
    builder
      //get status
      .addCase(thunkGetStatusAppointment.pending, (state) => {
        state.isLoading = true;
        state.isReserved = false;
      })
      .addCase(thunkGetStatusAppointment.fulfilled, (state, action) => {
        state.data = action.payload.data;
        if (action.payload.data.status !== AppointmentStatus.NONE) {
          state.data.formatDate = `${onIsValidDate(action.payload.data.date)} в ${action.payload.data.time}`;
        }
        state.message = action.payload.message;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(thunkGetStatusAppointment.rejected, (state) => {
        state.data.status = "error";
        state.message = "";
        state.isLoading = false;
      })
      //register
      .addCase(thunkGetRegisterAppointment.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(thunkGetRegisterAppointment.fulfilled, (state, action) => {
        if (action.payload.data.isReserved) {
          state.isReserved = true;
        } else {
          state.isReserved = false;
          state.data.status = AppointmentStatus.ACCEPTED;
          state.data.formatDate = `${onIsValidDate(action.payload.data.doc.date)} в ${action.payload.data.doc.time}`;
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
        state.data.status = AppointmentStatus.ERROR;
        state.message = "";
        state.isLoading = false;
        state.isError = true;
      })
      //remove
      .addCase(thunkRemoveAppointment.pending, (state) => {})
      .addCase(thunkRemoveAppointment.fulfilled, (state, action) => {
        state.data.status = AppointmentStatus.NONE;
      })
      .addCase(thunkRemoveAppointment.rejected, (state, action) => {
        state.data.status = AppointmentStatus.ERROR;
      })
      //edit
      .addCase(thunkEditAppointment.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(thunkEditAppointment.fulfilled, (state, action) => {
        if (action.payload.data.isReserved) {
          state.isReserved = true;
        } else {
          state.isReserved = false;
          state.data.time = action.payload.data.doc.time;
          state.data.date = action.payload.data.doc.date;
          state.data.formatDate = `${onIsValidDate(action.payload.data.doc.date)} в ${action.payload.data.doc.time}`;
        }

        state.isLoading = false;
      })
      .addCase(thunkEditAppointment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default appointmentSlice.reducer;
export const { onChangeStatusAppointment } = appointmentSlice.actions;
