import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const userInitialState = {
  isFetching: true,
  data: null,
};

const getUserDataFromServer = () =>
  new Promise((res, rej) => {
    setTimeout(() => {
      res({
        email: "myemail@email.com",
        name: "John",
        surname: "Doe",
      });
    }, 3000);
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

export const selectUserData = state => state.user.data;

export default userSlice.reducer;
