import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { booking } from "../service/booking.service";

export const fetchAllBookings = createAsyncThunk(
    "bookings/fetchAllBookings",
    async (_, thunkApi) => {
        const response = await booking.getAllBooking();
        console.log(response);
        return response.data.content;
    }
);

const initialState = {
    arrReservation: [],
    arrRoomById: [],
    arrAllBooking: [],
};

const reservationSlice = createSlice({
    name: "reservation",
    initialState,
    reducers: {
        updateAllBooking: (state, action) => {
            state.arrAllBooking = action.payload;
            // console.log(action);
        },
        updateFromApiReservation: (state, action) => {
            state.arrReservation = action.payload;
            // console.log(action);
        },
        updateRoomReservation: (state, action) => {
            state.arrRoomById = [...state.arrRoomById, action.payload];
            //  console.log(action);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllBookings.fulfilled, (state, action) => {
            state.arrAllBooking = action.payload;
            // console.log(action);
        });
    },
});

export const {
    updateFromApiReservation,
    updateRoomReservation,
    updateAllBooking,
} = reservationSlice.actions;

export default reservationSlice.reducer;
