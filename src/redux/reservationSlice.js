import { createSlice } from "@reduxjs/toolkit";

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
});

export const {
    updateFromApiReservation,
    updateRoomReservation,
    updateAllBooking,
} = reservationSlice.actions;

export default reservationSlice.reducer;
