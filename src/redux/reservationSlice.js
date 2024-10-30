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

export const fetchUpdateBooking = createAsyncThunk(
    "bookings/fetchUpdateBooking",
    async ({ id, data }, thunkApi) => {
        const response = await booking.update(id, data);
        console.log(response);
        return response.data.content;
    }
);

export const fetchDeleteBooking = createAsyncThunk(
    "bookings/fetchDeleteBooking",
    async (id, thunkApi) => {
        const response = await booking.delete(id);
        console.log(response);
        return response.data.content;
    }
);

const initialState = {
    bookingUpdate: {},
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
        builder.addCase(fetchUpdateBooking.fulfilled, (state, action) => {
            state.bookingUpdate = action.payload;
            // console.log(action);
        });
        builder.addCase(fetchDeleteBooking.fulfilled, (state, action) => {
            state.arrAllBooking = state.arrAllBooking.filter(
                (booking) => booking.id !== action.payload.id
            );
        });
        // console.log(action);
    },
});

export const {
    updateFromApiReservation,
    updateRoomReservation,
    updateAllBooking,
} = reservationSlice.actions;

export default reservationSlice.reducer;
