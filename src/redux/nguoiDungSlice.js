import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { nguoiDungService } from "../service/nguoiDung.service";

export const getValueUserApi = createAsyncThunk(
  "nguoiDung/getValueUserApi",
  async (_, thunkApi) => {
    const resolve = await nguoiDungService.getListUser();
    console.log(resolve);
    return resolve.data.content;
  }
);

const initialState = {
  listNguoiDung: [],
};

export const nguoiDungSlice = createSlice({
  name: "nguoiDung",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getValueUserApi.fulfilled, (state, action) => {
      console.log(action);
      state.listNguoiDung = action.payload;
    });
    builder.addCase(getValueUserApi.rejected, (state, action) => {
      console.log(action);
    });
  },
});

export const {} = nguoiDungSlice.actions;

export default nguoiDungSlice.reducer;
