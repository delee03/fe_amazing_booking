import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { comment } from "../service/comment";

export const getComments = createAsyncThunk(
    "danhGia/getComments",
    async (_, thunkApi) => {
        const resolve = await comment.getAllComment();
        console.log(resolve);
        return resolve.data.content;
    }
);

const initialState = {
    dsDanhGia: [],
};

export const commentSlice = createSlice({
    name: "danhGia",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getComments.fulfilled, (state, action) => {
            console.log(action);
            state.dsDanhGia = action.payload;
        });
    },
});

export const {} = commentSlice.actions;

export default commentSlice.reducer;
