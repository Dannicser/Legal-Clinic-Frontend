import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IGetApointmentStatusResponse, IRegisterApointmentData, IRegisterApointmentDataResponse, Status } from "../types/appointment";
import { UseAppointmentService } from "../services/UseAppointmentService";

interface IState {
  status: Status;
  id?: string;
  message: string;
  isLoading: boolean;
  isError: boolean;
}

const initialState: IState = {
  status: "none",
  message: "",
  isLoading: false,
  isError: false,
};

export const thunkGetStatusAppointment = createAsyncThunk<IGetApointmentStatusResponse>("thunkGetStatusAppointment/get", async () => {
  const { onGetStatusAppointment } = UseAppointmentService();

  const response = await onGetStatusAppointment();

  return response as IGetApointmentStatusResponse;
});

export const thunkGetRegisterAppointment = createAsyncThunk<IRegisterApointmentDataResponse, IRegisterApointmentData>(
  "thunkGetRegisterAppointment/get",
  async (data) => {
    const { onGetRegisterAppointment } = UseAppointmentService();

    const response = await onGetRegisterAppointment(data);

    return response as IRegisterApointmentDataResponse;
  }
);

const notificationSlice = createSlice({
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
        state.status = action.payload.status;
        state.id = action.payload.id;
        state.message = action.payload.message;
        state.isLoading = false;
      })
      .addCase(thunkGetStatusAppointment.rejected, (state, action: any) => {
        state.status = "error";
        state.message = "";
        state.isLoading = false;
      })
      //register
      .addCase(thunkGetRegisterAppointment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(thunkGetRegisterAppointment.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(thunkGetRegisterAppointment.rejected, (state, action: any) => {
        state.status = "error";
        state.message = "";
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default notificationSlice.reducer;
export const {} = notificationSlice.actions;
