import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getRoomByLocationId } from "../service/getRoomByLocationId";
import { roomPagination } from "../service/roomPagination.service";
// First, create the thunk

export const fetchAllRooms = createAsyncThunk(
    "rooms/fetchAllRooms",
    async (_, thunkApi) => {
        const response = await getRoomByLocationId.getAllRoomRealEstate();
        console.log(response);
        return response.data.content;
    }
);

export const fetchRoomById = createAsyncThunk(
    "rooms/fetchRoomById",
    async (roomId, thunkApi) => {
        const response = await getRoomByLocationId.getRoomById(roomId);
        console.log(response);
        return response.data.content;
    }
);

export const fetchCreateRoom = createAsyncThunk(
    "rooms/fetchCreateRoom",
    async (data, thunkApi) => {
        const response = await getRoomByLocationId.createRoom(data);

        console.log(response);
        return response.data.content;
    }
);
export const fetchUploadImageRoom = createAsyncThunk(
    "rooms/fetchUploadImageRoom",
    async ({ id, data }, thunkApi) => {
        const response = await getRoomByLocationId.upLoadRoomImage(id, data);

        console.log(response);
        return response.data.content;
    }
);
export const fetchDeleteRoom = createAsyncThunk(
    "rooms/fetchDeleteRoom",
    async (roomId, thunkApi) => {
        const response = await getRoomByLocationId.deleteRoom(roomId);
        console.log(response);
        return roomId; // Trả về roomId để có thể sử dụng trong reducer
    }
);

export const fetchRoomPagination = createAsyncThunk(
    "rooms/fetchRoomPagination",
    async ({ pageIndex, pageSize }, thunkApi) => {
        const response = await roomPagination.getRoomPagination(
            pageIndex,
            pageSize
        );
        console.log(response);
        return response.data.content; // Trả về roomId để có thể sử dụng trong reducer
    }
);
export const fetchUpdateRoom = createAsyncThunk(
    "rooms/fetchUpdateRoom",
    async ({ id, data }, thunkApi) => {
        const response = await getRoomByLocationId.uploadRoom(id, data);

        console.log(response);
        return response.data;
    }
);

const initialState = {
    room: {},
    roomImage: {},
    roomCreate: {},
    arrRooms: [], // Giả sử bạn có một danh sách các phòng
    roomUpdate: {},
};

const roomReducer = createSlice({
    name: "rooms",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchRoomById.fulfilled, (state, action) => {
            state.room = action.payload;
            console.log(action);
        });

        builder.addCase(fetchCreateRoom.fulfilled, (state, action) => {
            state.roomCreate = action.payload;
            console.log(action);
        });
        builder.addCase(fetchUploadImageRoom.fulfilled, (state, action) => {
            state.roomImage = action.payload;
            console.log(action);
        });
        builder.addCase(fetchAllRooms.fulfilled, (state, action) => {
            state.arrRooms = action.payload;
            console.log(action);
        });
        builder.addCase(fetchRoomPagination.fulfilled, (state, action) => {
            state.arrRooms = action.payload;
            console.log(action);
        });
        // builder.addCase(fetchDeleteRoom.fulfilled, (state, action) => {
        //     state.arrRooms = state.arrRooms.filter(
        //         (room) => room.id !== action.payload
        //     );
        //     console.log(action);
        // });
        builder.addCase(fetchUpdateRoom.fulfilled, (state, action) => {
            state.roomUpdate = action.payload;
            console.log(action);
        });
    },
});

export const {} = roomReducer.actions;

export default roomReducer.reducer;
