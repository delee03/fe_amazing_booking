import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { layViTri } from "../service/getLocationSearch";

export const getValueLocation = createAsyncThunk(
    "viTri/getValueLocation",
    async (_, thunkApi) => {
        const resolve = await layViTri.getListLocation();
        console.log(resolve.data);
        return resolve.data;
    }
);

export const fetchGetLocationById = createAsyncThunk(
    "viTri/fetchGetLocationById",
    async (id, thunkApi) => {
        const resolve = await layViTri.getLocationById(id);
        console.log(resolve.data);
        return resolve.data;
    }
);

const initialState = {
    viTriId: "",
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
            })
            .addCase(fetchGetLocationById.fulfilled, (state, action) => {
                // Khi dữ liệu được load thành công từ API, cập nhật vào state
                state.viTriId = action.payload;
            });
    },
});

export const { setdsViTri, updateValueSearch } = viTriSlice.actions;

export default viTriSlice.reducer;
