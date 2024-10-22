import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    roomFavorite: [],
};

const roomFavoriteSlice = createSlice({
    name: "roomFavorite",
    initialState,
    reducers: {
        handleRoomFavorite: (state, action) => {
            const index = state.roomFavorite.findIndex(
                (room) => room.id === action.payload.id
            );
            if (index !== -1) {
                state.roomFavorite.splice(index, 1);
            } else {
                state.roomFavorite.push(action.payload);
            }
        },
        // removeRoomFavorite: (state, action) => {
        //     state.roomFavorite = state.roomFavorite.filter(
        //         (room) => room.id !== action.payload
        //     );
        // },
    },
});

export const { handleRoomFavorite } = roomFavoriteSlice.actions;

export default roomFavoriteSlice.reducer;
