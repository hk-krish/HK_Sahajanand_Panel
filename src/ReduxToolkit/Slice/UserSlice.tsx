import { Get } from "@/Api";
import { Url_Keys } from "@/Constant";
import { FetchApiParams } from "@/Types/Product";
import { UserApiResponse } from "@/Types/UserType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  singleUser: null,
};

export const fetchSingleUserApiData = createAsyncThunk<UserApiResponse, FetchApiParams>("admin/user", async ({ search }) => {
  let url = Url_Keys.Users.User;
  if (search) url += `/${search}`;
  const response = await Get<UserApiResponse>(url);
  return response?.data;
});

const UsersSlice = createSlice({
  name: "Users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleUserApiData.fulfilled, (state, action) => {
      state.singleUser = action.payload;
    });
  },
});

export const {} = UsersSlice.actions;
export default UsersSlice.reducer;
