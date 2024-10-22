import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { layViTri } from "../service/getLocationSearch";

export const getValueLocation = createAsyncThunk(
  "viTri/getValueLocation",
  async (_, thunkApi) => {
    const resolve = await layViTri.getListLocation();
    console.log(resolve.data.content);
    return resolve.data.content;
  }
);

const initialState = {
  dsViTri: [],
  valueSearch: "",
};

export const viTriSlice = createSlice({
  name: "viTri",
  initialState,
  reducers: {
    setdsViTri: (state, action) => {
      console.log(action);
      state.dsViTri = action.payload;
    },
    updateValueSearch: (state, action) => {
      console.log(action);
      state.valueSearch = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getValueLocation.fulfilled, (state, action) => {
        // Khi dữ liệu được load thành công từ API, cập nhật vào state
        state.dsViTri = action.payload;
      })
      .addCase(getValueLocation.rejected, (state, action) => {
        console.log("Lấy dữ liệu thất bại", action.error);
      });
  },
});

export const { setdsViTri, updateValueSearch } = viTriSlice.actions;

export default viTriSlice.reducer;
