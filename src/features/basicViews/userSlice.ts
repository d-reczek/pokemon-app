import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
export interface UserObjectTypes {
  email: string;
  name: string;
  surname: string;
}
interface userInitialStateTypes {
  isFetching: boolean;
  data: null | UserObjectTypes;
}

const userInitialState: userInitialStateTypes = {
  isFetching: true,
  data: null,
};
const getUserDataFromServer = (): any =>
  new Promise((res, rej) => {
    setTimeout(() => {
      res({
        email: "myemail@email.com",
        name: "John",
        surname: "Doe",
      });
    }, 1000);
  });

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async () => {
    const response = await getUserDataFromServer();

    // console.log(response);

    return response;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(fetchUserData.pending, state => {
        state.isFetching = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.isFetching = false;
        state.data = action.payload;
      })
      .addCase(fetchUserData.rejected, state => {
        state.isFetching = false;
      });
  },
});

export const actions = userSlice.actions;

export const selectUserData = (state: RootState) => state.user.data;
export const selectIsFetching = (state: RootState) => state.user.isFetching;

export default userSlice.reducer;
