import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UsePostService } from "../services/UsePostService";

import { IPost, typePostCategory } from "../types/post";

interface IActionGetAllPostsByType {
  data: IPost[];
  message: string;
  success: boolean;
}

interface IState {
  civil: {
    posts: IPost[];
    error: boolean;
    loading: boolean;
  };
  criminal: {
    posts: IPost[];
    error: boolean;
    loading: boolean;
  };
  administrative: {
    posts: IPost[];
    error: boolean;
    loading: boolean;
  };
  other: {
    posts: IPost[];
    error: boolean;
    loading: boolean;
  };
}

const initialState: IState = {
  civil: {
    posts: [],
    loading: false,
    error: false,
  },
  administrative: {
    posts: [],
    loading: false,
    error: false,
  },
  criminal: {
    posts: [],
    loading: false,
    error: false,
  },
  other: {
    posts: [],
    loading: false,
    error: false,
  },
};

export const thunkGetAllPostsByType = createAsyncThunk("onGetAllPostsByType/get", async (type: typePostCategory) => {
  const { getAllPostsByType } = UsePostService();

  return getAllPostsByType(type);
});

const postSlice = createSlice({
  initialState,
  name: "postSlice",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(thunkGetAllPostsByType.pending, (state, action) => {
        state[action.meta.arg as typePostCategory].loading = true;
      })
      .addCase(thunkGetAllPostsByType.fulfilled, (state, action: PayloadAction<IActionGetAllPostsByType, string, { arg: string }>) => {
        state[action.meta.arg as typePostCategory].loading = false;
        state[action.meta.arg as typePostCategory].posts = action.payload.data;
      })
      .addCase(thunkGetAllPostsByType.rejected, (state, action) => {
        state[action.meta.arg as typePostCategory].loading = false;
        state[action.meta.arg as typePostCategory].error = true;
      });
  },
});

export default postSlice.reducer;
export const {} = postSlice.actions;
