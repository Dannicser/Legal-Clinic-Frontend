import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UseNotificationService } from "../services/UseNotificationService";
import { INotificationGetAllResponse, INotificationItem, INotificationReadResponse } from "../types/notification";
import { UseLocalStorage } from "../hooks/useLocalStorage";

interface IState {
  user: INotificationItem[];
  common: INotificationItem[];
  unread: number;
  isLoading: boolean;
  isError: boolean;
  message: string;
}

const initialState: IState = {
  user: [],
  common: [],
  unread: 0,
  isLoading: false,
  isError: false,
  message: "",
};

export const thunkGetAllNotifications = createAsyncThunk<INotificationGetAllResponse>(
  "thunkGetAllNotifications/get",
  async (_, { rejectWithValue, dispatch }) => {
    const { onGetAllNotification } = UseNotificationService();

    const response = await onGetAllNotification();

    if (response.status > 400) {
      return rejectWithValue(response);
    }

    return response as INotificationGetAllResponse;
  }
);

export const thunkReadNotifications = createAsyncThunk<INotificationReadResponse>("thunkReadNotifications/get", async (_, { rejectWithValue }) => {
  const { onReadNotifications } = UseNotificationService();

  const response = await onReadNotifications();

  if (response.status > 400) {
    return rejectWithValue(response);
  }

  return response as INotificationReadResponse;
});

const notificationSlice = createSlice({
  initialState,
  name: "notification",
  reducers: {
    onReadNotifications: (state) => {
      state.user = state.user.map((el) => {
        return {
          ...el,
          is_read: true,
        };
      });

      state.unread = 0;
    },
    onAddNotification: (state, action: PayloadAction<INotificationItem>) => {
      if (action.payload.is_everyone) {
        state.common = [...state.common, action.payload];
        state.unread = state.unread + 1;
      } else {
        state.user = [...state.user, action.payload];
        state.unread = state.unread + 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      //get
      .addCase(thunkGetAllNotifications.pending, (state) => {})
      .addCase(thunkGetAllNotifications.fulfilled, (state, action) => {
        state.user = action.payload.data.filter((el) => !el.is_everyone);
        state.common = action.payload.data.filter((el) => el.is_everyone);
        state.unread = state.user.filter((el) => !el.is_read).length;
      })
      .addCase(thunkGetAllNotifications.rejected, (state) => {
        state.isError = true;
      })
      //read
      .addCase(thunkReadNotifications.pending, (state) => {})
      .addCase(thunkReadNotifications.fulfilled, (state, action) => {})
      .addCase(thunkReadNotifications.rejected, (state) => {
        state.isError = true;
      });
  },
});

export default notificationSlice.reducer;
export const { onReadNotifications, onAddNotification } = notificationSlice.actions;
