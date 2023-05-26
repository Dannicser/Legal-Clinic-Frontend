import { createSlice } from "@reduxjs/toolkit";
import { IFetchedUserAction } from "../types/user";

interface IState {
  name: string;
  email: string;
  created: string;
}

const initialState: IState = {
  name: "",
  email: "",
  created: "",
};

const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    fetchedUser: (state, action: IFetchedUserAction) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.created = action.payload.created;
    },
  },
});

export default userSlice.reducer;
export const { fetchedUser } = userSlice.actions;
