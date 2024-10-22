import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorage, setLocalStorage } from "../utils/localStorage";

const initialState = {
    infoUser: getLocalStorage("user") || {},
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        updateInfoUser: (state, action) => {
            state.infoUser = action.payload;
            localStorage.removeItem("user");
            setLocalStorage("user", action.payload);
        },
        updateAvatarUser: (state, action) => {
            state.infoUser = { ...state.infoUser, avatar: action.payload };
            localStorage.removeItem("user");
            setLocalStorage("user", state.infoUser);
        },
    },
});

export const { updateInfoUser, updateAvatarUser } = authSlice.actions;

export default authSlice.reducer;
