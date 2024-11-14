import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorage, setLocalStorage } from "../utils/localStorage";
import { info } from "autoprefixer";

const initialState = {
    infoUser: getLocalStorage("user") || {},
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        updateInfoUser: (state, action) => {
            // localStorage.removeItem("user");
            state.infoUser = { ...state.infoUser, ...action.payload };
            //console.log(infoUser);
            setLocalStorage("user", { ...state.infoUser, ...action.payload });
        },
        updateAvatarUser: (state, action) => {
            localStorage.removeItem("user");
            state.infoUser = { ...state.infoUser, ...action.payload };
            setLocalStorage("user", {
                ...state.infoUser,
                ...action.payload,
            });
        },
    },
});

export const { updateInfoUser, updateAvatarUser } = authSlice.actions;

export default authSlice.reducer;
